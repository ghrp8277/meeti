import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { UserTosAgreement } from '../../../entities/user-tos-agreement.entity';

@Injectable()
export class UserTosAgreementRepository {
  constructor(
    @InjectRepository(UserTosAgreement)
    private repository: Repository<UserTosAgreement>,
  ) {}

  async create(
    agreementData: Partial<UserTosAgreement>,
  ): Promise<UserTosAgreement> {
    const agreement = this.repository.create(agreementData);
    return this.repository.save(agreement);
  }

  async createMany(
    agreementsData: Partial<UserTosAgreement>[],
  ): Promise<UserTosAgreement[]> {
    const agreements = this.repository.create(agreementsData);
    return this.repository.save(agreements);
  }

  async findOne(
    options: FindOneOptions<UserTosAgreement>,
  ): Promise<UserTosAgreement | null> {
    return this.repository.findOne(options);
  }

  async findByUserId(userId: string): Promise<UserTosAgreement[]> {
    return this.repository.find({
      where: { userId },
      relations: ['tos'],
    });
  }

  async findByTosId(tosId: number): Promise<UserTosAgreement[]> {
    return this.repository.find({
      where: { tosId },
      relations: ['user'],
    });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.repository.delete({ userId });
  }
}
