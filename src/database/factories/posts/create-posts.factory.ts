import { setSeederFactory } from 'typeorm-extension';
import * as bcrypt from 'bcrypt';
import { BCRYPT_SALT } from '../../../environments';
import { PostEntity } from '../../../posts/entities/post.entity';

export default setSeederFactory(PostEntity, async (faker) => {
  const post = new PostEntity();
  1;

  post.title = faker.internet.emoji() + faker.name.jobType();
  post.content = faker.internet.emoji() + faker.lorem.sentence();
  post.password = await bcrypt.hash(faker.internet.password(), BCRYPT_SALT);

  return post;
});
