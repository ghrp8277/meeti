import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { SettlementAccount } from '../../../entities/settlement-account.entity';

@Injectable()
export class SettlementAccountRepository {
  constructor(
    @InjectRepository(SettlementAccount)
    private readonly repository: Repository<SettlementAccount>,
  ) {}

  async create(
    accountData: Partial<SettlementAccount>,
  ): Promise<SettlementAccount> {
    const account = this.repository.create(accountData);
    return this.repository.save(account);
  }

  async findOne(
    options: FindOneOptions<SettlementAccount>,
  ): Promise<SettlementAccount | null> {
    return this.repository.findOne(options);
  }

  async findAll(
    options: FindManyOptions<SettlementAccount>,
  ): Promise<SettlementAccount[]> {
    return this.repository.find(options);
  }

  async update(
    id: number,
    updateData: Partial<SettlementAccount>,
  ): Promise<SettlementAccount | null> {
    await this.repository.update(id, updateData);
    return this.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
