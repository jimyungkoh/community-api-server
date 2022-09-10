import * as bcrypt from 'bcrypt';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import { BCRYPT_SALT } from '../environments';
import { EntityNotFoundException } from '../common/exceptions/exception';

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

  async findAll(page = 1) {
    const take = 20;

    return await this.postsRepository
      .createQueryBuilder('posts')
      .select('posts.id')
      .addSelect('posts.title')
      .take(take)
      .skip(take * (page - 1))
      .getMany();
  }

  async findOne(id: number) {
    const post = await this.postsRepository
      .createQueryBuilder('posts')
      .select('posts.id')
      .addSelect('posts.title')
      .addSelect('posts.content')
      .addSelect('posts.created_at')
      .addSelect('posts.updated_at')
      .where('posts.id = :id', { id: id })
      .getOne();

    if (!post) {
      throw new EntityNotFoundException();
    }

    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  /**
   * @param {number} id 게시물의 id
   * @param {string} enteredPassword 게시물 삭제 권한 확인을 위한 패스워드
   * @returns {Promise<boolean | undefined>}
   */
  async delete(
    id: number,
    enteredPassword: string,
  ): Promise<boolean | undefined> {
    const post = await this.postsRepository.findOneBy({ id: id });

    if (!post) {
      throw new EntityNotFoundException();
    }

    await Promise.all([this.validatePassword(enteredPassword, post.password)]);

    return (await this.postsRepository.delete({ id: id })) && true;
  }

  private async transformPassword(post: CreatePostDto): Promise<void> {
    post.password = await bcrypt.hash(post.password, BCRYPT_SALT);
    return Promise.resolve();
  }

  private async validatePassword(
    enteredPassword: string,
    postsPassword: string,
  ) {
    if (!(await bcrypt.compare(enteredPassword, postsPassword))) {
      throw new ForbiddenException(
        "you don't have permission to access this resource",
      );
    }
  }
}
