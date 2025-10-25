import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ModuleRef } from '@nestjs/core';
import { RedisService } from '../../modules/redis/redis.service';
import {
  CACHE_KEY_METADATA,
  CACHE_TTL_METADATA,
} from '../decorators/cache.decorator';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly reflector: Reflector,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const cacheKey = this.reflector.get<string>(
      CACHE_KEY_METADATA,
      context.getHandler(),
    );

    if (!cacheKey) {
      return next.handle();
    }

    const cacheTTL =
      this.reflector.get<number>(CACHE_TTL_METADATA, context.getHandler()) ||
      300; // 기본 5분

    try {
      const redisService = this.moduleRef.get(RedisService, { strict: false });

      const cachedData = await redisService.get(cacheKey);
      if (cachedData) {
        return of(JSON.parse(cachedData));
      }

      return next.handle().pipe(
        tap(async (data) => {
          try {
            await redisService.setWithExpiry(
              cacheKey,
              JSON.stringify(data),
              cacheTTL,
            );
          } catch (error) {
            console.warn('Redis cache set error:', error);
          }
        }),
      );
    } catch (error) {
      console.warn('Redis cache get error:', error);
      return next.handle();
    }
  }
}
