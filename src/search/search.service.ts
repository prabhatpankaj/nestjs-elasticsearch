import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { IndexDto, IndexIdDto } from './dtos/search.dto';


@Injectable()
export class SearchService {
    constructor(private readonly elasticsearchService: ElasticsearchService) {}
    
    async indexExists(indexDto: IndexDto) {
      return await this.elasticsearchService.indices.exists({
        index: indexDto.index,
      });
    }
  
    async createIndex(indexDto: IndexDto) {

      if (await this.indexExists(indexDto)) {
        return;
      }

      return this.elasticsearchService.indices.create({
      index: indexDto.index,
    });
    }
  
    async getDocument(indexDto: IndexDto, indexIdDto: IndexIdDto): Promise<any> {
      if (!(await this.indexExists(indexDto))) {
        throw new Error('Index does not exists');
      }
  
      try {
        const result = await this.elasticsearchService.get({
          index: indexDto.index,
          id: indexIdDto.id,
        });
        return result;
      } catch (error) {
          console.error(`Error retrieving document with ID ${indexIdDto.id}`, error);
        throw error;
      }
    }
  
    async insertDocument(indexDto: IndexDto, body: Record<string, any>, indexIdDto: IndexIdDto) {
      if (!(await this.indexExists(indexDto))) {
        throw new Error('Index does not exists');
      }
  
      const request = {
        index: indexDto.index,
        body: body,
      };
      
      request['id'] = indexIdDto.id;

      return this.elasticsearchService.index(request);
    }
  
    async replaceDocument(indexDto: IndexDto, indexIdDto: IndexIdDto, body: Record<string, any>) {
      return await this.insertDocument(indexDto, body, indexIdDto);
    }
    
    async searchDocument(indexDto: IndexDto, query: Record<string, any>) {
      return await this.elasticsearchService.search({
        index: indexDto.index,
        query: query,
      });
    }
  
    deleteDocument(indexDto: IndexDto, indexIdDto: IndexIdDto) {
      return this.elasticsearchService.delete({
        index: indexDto.index,
        id: indexIdDto.id,
      });
    }
}
