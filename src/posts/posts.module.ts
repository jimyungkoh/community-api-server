import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { PagerMiddleware } from '../common/middlewares/PagerMiddleware';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [TypeOrmModule.forFeature([PostEntity])],
})
export class PostsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(PagerMiddleware)
      .forRoutes({ path: 'posts', method: RequestMethod.GET });
  }
}
