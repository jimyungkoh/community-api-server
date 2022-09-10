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

    await Promise.all([
      this.validatePost(id, post),
      this.validatePassword(enteredPassword, post.password),
    ]);

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

  private validatePost(id: number, post: PostEntity) {
    if (!post) {
      throw new NotFoundException();
    }

    return true;
  }
}
