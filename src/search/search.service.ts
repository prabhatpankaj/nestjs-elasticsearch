import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import * as esb from 'elastic-builder';

export interface QueryFields {
  match?: Record<string, any>;
  term?: Record<string, any>;
  range?: Record<string, any>;
  search?: string[];
  exist?: Record<string, any>;
}

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  // Create new elastic index
  async createIndexIfNotExists(indexName: string, body: any) {
    const exist = await this.elasticsearchService.indices.exists({
      index: indexName,
    });
    if (!exist.body) {
      return this.elasticsearchService.indices.create({
        index: indexName,
        body: body,
      });
    }
    return exist;
  }

  // Insert mapping to elastic index
  async insertMapping(indexName: string, body: any) {
    await this.elasticsearchService.indices.putMapping({
      index: indexName,
      body: body,
    });
  }

  // Search documents from elasticsearch
  async searchAll(
    indexName: string,
    body = esb.requestBodySearch(),
    page = 1,
    limit = 10,
    __debug = false,
  ) {
    const resp = await this.elasticsearchService.search({
      index: indexName,
      body: body,
      size: limit,
      from: (page - 1) * limit,
    });
    // Remove sort as count query does not support sort
    delete (body as any)._body.sort;
    const count =
      resp.body.hits.total.value === 10000
        ? (
            await this.elasticsearchService.count({
              index: indexName,
              body: body,
            })
          ).body.count
        : resp.body.hits.total.value;
    return {
      ...(__debug ? body : {}),
      page_size: limit,
      page: page,
      count,
      results: resp.body.hits.hits.map((hit) => ({
        _score: hit._score,
        ...hit._source,
        highlight: hit.highlight,
      })),
    };
  }

  async stats(indexName: string, body = esb.requestBodySearch()) {
    const resp = await this.elasticsearchService.search({
      index: indexName,
      body: body,
      size: 0,
    });
    // return resp;
    return resp.body.aggregations;
  }

  // Get a single document from elastic index by id
  async getDocument(indexName: string, id: string) {
    try {
      const getResponse = await this.elasticsearchService.get({
        index: indexName,
        id: id,
      });
      // return source of document
      return getResponse.body._source;
    } catch (e) {
      return null;
    }
  }

  // Put document to elastic index
  async putDocument(indexName: string, body: any) {
    const { _id, ...doc } = body;
    return this.elasticsearchService.index({
      index: indexName,
      body: doc,
      id: _id,
    });
  }

  // bulk index documents to elastic index
  async putDocuments(indexName: string, docs: any[]) {
    // Prepare bulk body
    const body = docs.flatMap((doc) => {
      const { _id, ...docWithoutId } = doc;
      return [{ index: { _index: indexName, _id } }, docWithoutId];
    });
    const resp = await this.elasticsearchService.bulk({
      index: indexName,
      body: body,
    });
    return resp.body;
  }

  // Generate elastic query
  query(
    filters: Record<string, any>,
    fields: QueryFields,
    existingQuery?: esb.BoolQuery,
  ) {
    const {
      match = {},
      term = {},
      range = {},
      search = [],
      exist = {},
    } = fields;
    const boolQuery = existingQuery || esb.boolQuery();

    Object.keys(term)?.forEach((key) => {
      if (key in filters) {
        // if value is array, then should be in any of the values
        if (Array.isArray(term[key])) {
          boolQuery.filter(this.sholdBeInAnyFields(filters[key], term[key]));
        } else {
          // Check if value is string and can be split by comma
          if (typeof filters[key] === 'string' && filters[key].includes(',')) {
            boolQuery.filter(
              esb.termsQuery(term[key], filters[key].split(',')),
            );
          } else {
            boolQuery.filter(esb.termQuery(term[key], filters[key]));
          }
        }
      }
    });

    Object.keys(match)?.forEach((key) => {
      if (key in filters) {
        // if value is array, then should match any of the values
        if (Array.isArray(match[key])) {
          boolQuery.must(this.sholdBeInAnyFields(filters[key], match[key]));
        } else {
          // Check if value is string and can be split by comma
          if (typeof filters[key] === 'string' && filters[key].includes(',')) {
            boolQuery.must(
              this.fieldShouldMatch(filters[key].split(','), term[key]),
            );
          } else {
            boolQuery.must(esb.matchQuery(match[key], filters[key]));
          }
        }
      }
    });

    Object.keys(range)?.forEach((key) => {
      if (filters[`${key}_min`] || filters[`${key}_max`]) {
        const rangeFieldQuery = esb.rangeQuery(range[key]);
        if (filters[`${key}_min`]) {
          rangeFieldQuery.gte(filters[`${key}_min`]);
        }
        if (filters[`${key}_max`]) {
          rangeFieldQuery.lte(filters[`${key}_max`]);
        }
        boolQuery.filter(rangeFieldQuery);
      }
    });

    Object.keys(exist)?.forEach((key) => {
      // Check if key is set
      if (key in filters) {
        if (filters[key]) {
          boolQuery.filter(esb.existsQuery(exist[key]));
        } else {
          boolQuery.mustNot(esb.existsQuery(exist[key]));
        }
      }
    });

    if (filters.search && search && search.length > 0) {
      // boolQuery.must(
      //   esb.multiMatchQuery(search, filters.search),
      // );
      const searchQuery = esb.boolQuery();
      search?.forEach((field) => {
        searchQuery.should(esb.matchPhrasePrefixQuery(field, filters.search));
      });
      searchQuery.minimumShouldMatch(1);
      boolQuery.must(searchQuery);
    }

    return boolQuery;
  }

  // generate should match at least one
  shouldMatchAnyFields(value: any, fields: string[]) {
    // Split by comma and generate should be in any of the given value
    const values = typeof value === 'string' ? value.split(',') : [];
    const boolQuery = esb.boolQuery();
    fields.forEach((field) => {
      if (values.length > 1) {
        boolQuery.should(this.fieldShouldMatch(values, field));
      } else {
        boolQuery.should(esb.matchQuery(field, value));
      }
    });
    boolQuery.minimumShouldMatch(1);
    return boolQuery;
  }

  // Generate should be at least one
  sholdBeInAnyFields(value: any, fields: string[]) {
    // Split by comma and generate should be in any of the given value
    const values = typeof value === 'string' ? value.split(',') : [];
    const boolQuery = esb.boolQuery();
    fields.forEach((field) => {
      if (values.length > 1) {
        boolQuery.should(esb.termsQuery(field, values));
      } else {
        boolQuery.should(esb.termQuery(field, value));
      }
    });
    boolQuery.minimumShouldMatch(1);
    return boolQuery;
  }

  // Generate field should have any of the given value
  fieldShouldHave(value: any[], field: string) {
    const boolQuery = esb.boolQuery();
    value.forEach((val: any) => {
      boolQuery.should(esb.termQuery(field, val));
    });
    boolQuery.minimumShouldMatch(1);
    return boolQuery;
  }

  // Generate field should have any of the given value
  fieldShouldMatch(value: any[], field: string) {
    const boolQuery = esb.boolQuery();
    value.forEach((val: any) => {
      boolQuery.should(esb.matchQuery(field, val));
    });
    boolQuery.minimumShouldMatch(1);
    return boolQuery;
  }

  or(...queries: esb.Query[]) {
    const boolQuery = esb.boolQuery();
    queries.forEach((query) => {
      boolQuery.should(query);
    });
    boolQuery.minimumShouldMatch(1);
    return boolQuery;
  }

  and(...queries: esb.Query[]) {
    const boolQuery = esb.boolQuery();
    queries.forEach((query) => {
      boolQuery.must(query);
    });
    return boolQuery;
  }
}