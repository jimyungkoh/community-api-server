import { DataSource, DataSourceOptions } from 'typeorm';
import { PostEntity } from '../posts/entities/post.entity';
import {
  TYPEORM,
  TYPEORM_SEEDING_FACTORIES,
  TYPEORM_SEEDING_SEEDS,
} from '../environments';
import { SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
  ...TYPEORM,
  entities: [PostEntity],
  seeds: [TYPEORM_SEEDING_SEEDS],
  factories: [TYPEORM_SEEDING_FACTORIES],
};

export const dataSource = new DataSource(options);
