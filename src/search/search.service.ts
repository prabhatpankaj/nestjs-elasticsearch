import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { IndexDto } from './dtos/search.dto';


@Injectable()
export class SearchService {
    constructor(private readonly elasticsearchService: ElasticsearchService) {}
    
    async createIndex(indexDto: IndexDto) {
        const exist = await this.elasticsearchService.indices.exists({
          index: indexDto.index,
        });
        if (!exist) {
          return this.elasticsearchService.indices.create({
            index: indexDto.index
          });
        }
        return exist;
      }
    
    async indexDocument(index: string, body: any) {
        return await this.elasticsearchService.index({
            index,
            body,
        });
    }
    
    async search(index: string, query: any) {
        return await this.elasticsearchService.search({
            index,
            body: {
            query,
            },
        });
    }
}
