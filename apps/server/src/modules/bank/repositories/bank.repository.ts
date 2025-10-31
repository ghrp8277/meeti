import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Bank } from '../../../entities/bank.entity';

@Injectable()
export class BankRepository {
  constructor(
    @InjectRepository(Bank)
    private readonly repository: Repository<Bank>,
  ) {}

  async findAll(options?: FindManyOptions<Bank>): Promise<Bank[]> {
    return this.repository.find({
      ...options,
    });
  }

  async findOne(options: FindOneOptions<Bank>): Promise<Bank | null> {
    return this.repository.findOne(options);
  }
}
