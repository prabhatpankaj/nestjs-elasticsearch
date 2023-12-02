import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { SearchModule } from 'src/search/search.module';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [SearchModule, CoreModule],
  providers: [BlogService],
  controllers: [BlogController],
  exports: [BlogService],
})
export class BlogModule {}