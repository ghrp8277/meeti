import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as entities from '../entities';

export default registerAs('database', (): TypeOrmModuleOptions => {
  return {
    type: 'sqlite',
    database: 'dev.sqlite',
    entities: Object.values(entities),
    synchronize: true,
    logging: true,
    migrations: ['src/migrations/*.ts'],
  };
});
