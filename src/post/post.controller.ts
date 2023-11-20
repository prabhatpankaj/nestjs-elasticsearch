
import { Body, Controller, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './dtos/post.dto';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post("/create-post")
    createPost(
        @Body() postDto: PostDto
    ) {
        try {
            return this.postService.createPost(postDto)
        } catch (error){
            throw error
        }
    }
}

