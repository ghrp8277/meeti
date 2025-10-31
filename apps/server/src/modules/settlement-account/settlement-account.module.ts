import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettlementAccount } from '../../entities/settlement-account.entity';
import { SettlementAccountController } from './settlement-account.controller';
import { SettlementAccountService } from './settlement-account.service';
import { SettlementAccountRepository } from './repositories/settlement-account.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SettlementAccount])],
  controllers: [SettlementAccountController],
  providers: [SettlementAccountService, SettlementAccountRepository],
  exports: [SettlementAccountService, SettlementAccountRepository],
})
export class SettlementAccountModule {}
