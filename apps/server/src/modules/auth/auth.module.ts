import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PhoneVerificationService } from './services/phone-verification.service';
import { JwtAuthService } from './services/jwt.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { RedisModule } from '../redis/redis.module';
import { jwtConfig } from '../../configs';
import { JwtModuleOptions } from '@nestjs/jwt';

@Module({
  imports: [
    RedisModule,
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (): JwtModuleOptions => {
        const jwt = jwtConfig();
        return {
          secret: jwt.secret,
          signOptions: {
            expiresIn: Number(jwt.expiresIn),
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [PhoneVerificationService, JwtAuthService, JwtStrategy],
  exports: [PhoneVerificationService, JwtAuthService],
})
export class AuthModule {}
