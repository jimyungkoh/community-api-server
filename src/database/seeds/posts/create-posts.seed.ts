import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { PostEntity } from '../../../posts/entities/post.entity';

export default class PostSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const postFactory = await factoryManager.get(PostEntity);

    const posts: PostEntity[] = [];

    posts.push(...(await postFactory.saveMany(100)));

    return posts;
  }
}
