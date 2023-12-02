import { Controller, Get, Param, Post, Body, ParseIntPipe , UseInterceptors} from '@nestjs/common';
import { BlogService } from './blog.service';
import { ElasticsearchInterceptor } from 'src/search/search.interceptor';


@Controller('/blog')
export class BlogController {
  private indexName = 'blog';

  constructor(
    private blogService: BlogService,
  ) {}

  @Post('search')
  @UseInterceptors(ElasticsearchInterceptor)
  async searchBlog(@Body() data: { query: any }) {
    let result;

    try {
        result = await this.blogService.searchBlog({index: this.indexName}, data.query);
        return result;
    } catch (e) {
        return result;
    }

  }

}

