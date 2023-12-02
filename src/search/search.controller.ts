import { Controller, Post, Body } from '@nestjs/common';
import { SearchService } from './search.service';
import { IndexDto, IndexIdDto } from './dtos/search.dto';


@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post('create-index')
  async createIndex(@Body() indexDto: IndexDto ) {
    return this.searchService.createIndex(indexDto);
  }

  @Post('index-document')
  async indexDocument(@Body() data: { indexDto: IndexDto; body: any, indexIdDto: IndexIdDto }) {
    return this.searchService.insertDocument(data.indexDto, data.body, data.indexIdDto);
  }

}




