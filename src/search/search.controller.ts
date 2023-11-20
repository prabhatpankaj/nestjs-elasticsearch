import { Controller, Post, Body } from '@nestjs/common';
import { SearchService } from './search.service';
import { IndexDto } from './dtos/search.dto';


@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post('create-index')
  async createIndex(@Body() indexDto: IndexDto ) {
    return this.searchService.createIndex(indexDto);
  }

  @Post('index-document')
  async indexDocument(@Body() data: { index: string; body: any }) {
    return this.searchService.indexDocument(data.index, data.body);
  }

  @Post('search')
  async search(@Body() data: { index: string; query: any }) {
    return this.searchService.search(data.index, data.query);
  }
}




