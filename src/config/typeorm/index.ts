import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { TYPEORM } from '../../environments';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      ...TYPEORM,
      entities: [__dirname + '/../../**/**/*.entity{.ts,.js}'],
      // synchronize: true,
      logging: true,
    };
  }
}
