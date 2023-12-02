
import { Injectable } from '@nestjs/common';
import { SearchService } from 'src/search/search.service';


@Injectable()
export class BlogService {
    constructor(
        private readonly searchService: SearchService
    ) { }

    async searchBlog(indexDto, query: Record<string, any>) {
        return await this.searchService.searchDocument(indexDto, query);
    }
  
}

