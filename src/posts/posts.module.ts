import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  PagerMiddleware,
  WeatherInsertMiddleware,
} from '../common/middlewares/posts.middleware';
import { HttpModule } from '@nestjs/axios';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostEntity } from './entities/post.entity';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [TypeOrmModule.forFeature([PostEntity]), HttpModule],
})
export class PostsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(PagerMiddleware)
      .forRoutes({ path: 'posts', method: RequestMethod.GET });
    consumer
      .apply(WeatherInsertMiddleware)
      .forRoutes({ path: 'posts', method: RequestMethod.POST });
  }
}
