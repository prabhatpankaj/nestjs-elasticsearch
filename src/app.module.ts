import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostModule } from './post/post.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        ELASTICSEARCH_HOST: Joi.string(),
        ELASTICSEARCH_USERNAME: Joi.string(),
        ELASTICSEARCH_PASSWORD: Joi.string(),
      }),
    }),
    UserModule,
    PrismaModule,
    PostModule,
    SearchModule
  ],
  controllers: [AppController],
  providers: [ AppService],
})
export class AppModule {}
