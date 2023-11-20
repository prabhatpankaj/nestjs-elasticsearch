import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto } from './dtos/post.dto';
import { SearchService } from 'src/search/search.service';



@Injectable()
export class PostService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly searchService: SearchService) {
    }

    async createPost(postDto: PostDto) {
        const createPostData = await this.prismaService.post.create({
            data: {
                title: postDto.title,
                content: postDto.content,
                authorId: +postDto.authorId

            }
        })

        // Update Elasticsearch index
        await this.searchService.indexDocument('posts', {
            id: createPostData.id,
            title: createPostData.title,
            content: createPostData.content,
            createdAt: createPostData.createdAt,
          });

        return createPostData;
    }
}