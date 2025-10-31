import { Injectable } from '@nestjs/common';
import { SettlementAccountRepository } from './repositories/settlement-account.repository';
import { CreateSettlementAccountDto, UpdateSettlementAccountDto } from './dto';
import { SettlementAccount } from '../../entities/settlement-account.entity';

@Injectable()
export class SettlementAccountService {
  constructor(private readonly repository: SettlementAccountRepository) {}

  async create(
    userId: string,
    createAccountDto: CreateSettlementAccountDto,
  ): Promise<SettlementAccount> {
    const { accountHolder, bankId, accountNumber, mobile } = createAccountDto;

    const accountData: Partial<SettlementAccount> = {
      userId,
      accountHolder,
      bankId,
      accountNumber,
      mobile,
    };

    return this.repository.create(accountData);
  }

  async findById(id: number): Promise<SettlementAccount | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByUserId(userId: string): Promise<SettlementAccount[]> {
    return this.repository.findAll({ where: { userId } });
  }

  async update(
    id: number,
    updateAccountDto: UpdateSettlementAccountDto,
  ): Promise<SettlementAccount | null> {
    return this.repository.update(id, updateAccountDto);
  }

  async delete(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}
