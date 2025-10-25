import { registerAs } from '@nestjs/config';
import { RedisModuleOptions } from '@nestjs-modules/ioredis';

export default registerAs(
  'redis',
  (): RedisModuleOptions => ({
    url: process.env.REDIS_URL,
    type: 'single',
    options: {
      password: process.env.REDIS_PASSWORD,
      db: parseInt(process.env.REDIS_DB || '0', 10),
    },
  }),
);
