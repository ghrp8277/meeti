import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { UserTosAgreement } from '../../entities/user-tos-agreement.entity';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserTosAgreementRepository } from './repositories/user-tos-agreement.repository';
import { UserTosAgreementService } from './services/user-tos-agreement.service';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserTosAgreement]), ProfileModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UserTosAgreementRepository,
    UserTosAgreementService,
  ],
  exports: [
    UserService,
    UserRepository,
    UserTosAgreementRepository,
    UserTosAgreementService,
  ],
})
export class UserModule {}
