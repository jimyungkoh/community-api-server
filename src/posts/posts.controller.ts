import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  ForbiddenInterceptor,
  NotFoundInterceptor,
} from '../common/interceptors/http.interceptor';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll(@Query() { page }) {
    return this.postsService.findAll(page);
  }

  @Get(':id')
  @UseInterceptors(new NotFoundInterceptor())
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(new NotFoundInterceptor(), new ForbiddenInterceptor())
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @UseInterceptors(new NotFoundInterceptor(), new ForbiddenInterceptor())
  delete(@Param('id') id: string, @Body('password') password: string) {
    return this.postsService.delete(+id, password);
  }
}
