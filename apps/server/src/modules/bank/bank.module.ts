import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from '../../entities/bank.entity';
import { BankController } from './bank.controller';
import { BankService } from './bank.service';
import { BankRepository } from './repositories/bank.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Bank])],
  controllers: [BankController],
  providers: [BankService, BankRepository],
  exports: [BankService, BankRepository],
})
export class BankModule {}
