import { Controller, Post, Body } from '@nestjs/common';
import { SearchService } from './search.service';
import { IndexDto, IndexIdDto } from './dtos/search.dto';


@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  // need to be authenticated 
  @Post('create-index')
  async createIndex(@Body() indexDto: IndexDto ) {
    return this.searchService.createIndex(indexDto);
  }

  // need to be authenticated
  @Post('index-document')
  async indexDocument(@Body() data: { indexDto: IndexDto; body: any, indexIdDto: IndexIdDto }) {
    return this.searchService.insertDocument(data.indexDto, data.body, data.indexIdDto);
  }

  @Post('search')
  async search(@Body() data: { indexDto: IndexDto, query: any }) {
    return this.searchService.searchDocument(data.indexDto, data.query);
  }
}




