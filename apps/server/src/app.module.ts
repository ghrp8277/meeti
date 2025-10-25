import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig, appConfig, jwtConfig } from './configs';
import { CategoryModule } from './modules/category/category.module';
import { TosModule } from './modules/tos/tos.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ExposureModule } from './modules/exposure/exposure.module';
import { CardModule } from './modules/card/card.module';
import { PointModule } from './modules/point/point.module';
import { NoticeModule } from './modules/notice/notice.module';
import { AnswerModule } from './modules/answer/answer.module';
import { RedisModule } from './modules/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig, jwtConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => databaseConfig(),
    }),
    CategoryModule,
    TosModule,
    AuthModule,
    UserModule,
    ProfileModule,
    ExposureModule,
    CardModule,
    PointModule,
    NoticeModule,
    AnswerModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
