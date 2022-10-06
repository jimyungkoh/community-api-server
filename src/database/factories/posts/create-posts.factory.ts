import { setSeederFactory } from 'typeorm-extension';
import * as bcrypt from 'bcrypt';
import { BCRYPT_SALT, WEATHER_URL } from '../../../environments';
import { PostEntity } from '../../../posts/entities/post.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export default setSeederFactory(PostEntity, async (faker) => {
  const post = new PostEntity();
  const httpService = new HttpService();
  const { data } = await firstValueFrom(httpService.get(WEATHER_URL));

  post.title = faker.internet.emoji() + faker.name.jobType();
  post.content = faker.internet.emoji() + faker.lorem.sentence();
  post.password = await bcrypt.hash(faker.internet.password(), BCRYPT_SALT);
  post.weather = data.current.condition.text;

  return post;
});
