import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import { BCRYPT_SALT } from '../environments';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
  ) {}

  async create(
    createPostDto: CreatePostDto,
  ): Promise<CreatePostDto | undefined> {
    await this.transformPassword(createPostDto);

    return await this.postsRepository.save(createPostDto);
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }

  async transformPassword(post: CreatePostDto): Promise<void> {
    post.password = await bcrypt.hash(post.password, BCRYPT_SALT);
    return Promise.resolve();
  }
}
