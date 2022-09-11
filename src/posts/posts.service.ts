import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BCRYPT_SALT, WEATHER_URL } from '../environments';
import { PostEntity } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import {
  EntityNotFoundException,
  IncorrectPasswordException,
} from '../common/exceptions/exception';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
    private readonly httpService: HttpService,
  ) {}

  async create(
    createPostDto: CreatePostDto,
  ): Promise<CreatePostDto | undefined> {
    await Promise.all([
      this.encryptPassword(createPostDto),
      this.insertWeatherStatus(createPostDto),
    ]);
    return await this.postsRepository.save(createPostDto);
  }

  async findAll(page = 1) {
    const take = 20;

    return await this.postsRepository
      .createQueryBuilder('posts')
      .select('posts.id')
      .addSelect('posts.title')
      .addSelect('posts.weather')
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
      .addSelect('posts.weather')
      .addSelect('posts.created_at')
      .addSelect('posts.updated_at')
      .where('posts.id = :id', { id: id })
      .getOne();

    if (!post) {
      throw new EntityNotFoundException();
    }

    return post;
  }

  /**
   * @param {number} id
   * @param {UpdatePostDto} updatePostDto
   * @throws {EntityNotFoundException}
   * @throws {IncorrectPasswordException}
   * @returns {Promise<PostEntity>}
   */
  async update(id: number, updatePostDto: UpdatePostDto) {
    let post = await this.postsRepository.findOneBy({ id: id });

    if (!post) {
      throw new EntityNotFoundException();
    }

    const enteredPassword = updatePostDto.password;

    if (
      !enteredPassword ||
      !(await this.isCorrectPassword(enteredPassword, post.password))
    ) {
      throw new IncorrectPasswordException();
    }

    delete updatePostDto.password;

    post = Object.assign(post, updatePostDto);

    await this.postsRepository.save(post);

    return post;
  }

  /**
   * @param {number} id
   * @param {string} enteredPassword
   * @throws {EntityNotFoundException}
   * @throws {IncorrectPasswordException}
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

    if (!(await this.isCorrectPassword(enteredPassword, post.password))) {
      throw new IncorrectPasswordException();
    }

    return (await this.postsRepository.delete({ id: id })) && true;
  }

  /**
   *
   * @param {CreatePostDto} post
   * @returns {Promise<void>}
   * @private
   */
  private async encryptPassword(post: CreatePostDto): Promise<void> {
    post.password = await bcrypt.hash(post.password, BCRYPT_SALT);
    return Promise.resolve();
  }

  /**
   * @param {CreatePostDto} post
   * @returns {Promise<void>}
   * @private
   */
  private async insertWeatherStatus(post: CreatePostDto): Promise<void> {
    const { data } = await firstValueFrom(this.httpService.get(WEATHER_URL));
    post.weather = data.current.condition.text;
    return Promise.resolve();
  }

  /**
   * @param {string} enteredPassword
   * @param {string} postsPassword
   * @returns {Promise<boolean>}
   * @private
   */
  private async isCorrectPassword(
    enteredPassword: string,
    postsPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, postsPassword);
  }
}
