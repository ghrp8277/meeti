import { Injectable } from '@nestjs/common';
import { UserTosAgreementRepository } from '../repositories/user-tos-agreement.repository';
import { UserTosAgreement } from '../../../entities/user-tos-agreement.entity';

@Injectable()
export class UserTosAgreementService {
  constructor(
    private readonly userTosAgreementRepository: UserTosAgreementRepository,
  ) {}

  async createUserAgreements(
    userId: string,
    tosIds: number[],
  ): Promise<UserTosAgreement[]> {
    if (!tosIds || tosIds.length === 0) {
      return [];
    }

    const agreements = tosIds.map((tosId) => ({
      userId,
      tosId,
    }));

    return this.userTosAgreementRepository.createMany(agreements);
  }

  async getUserAgreements(userId: string): Promise<UserTosAgreement[]> {
    return this.userTosAgreementRepository.findByUserId(userId);
  }

  async getTosAgreements(tosId: number): Promise<UserTosAgreement[]> {
    return this.userTosAgreementRepository.findByTosId(tosId);
  }

  async deleteUserAgreements(userId: string): Promise<void> {
    await this.userTosAgreementRepository.deleteByUserId(userId);
  }

  async deleteAgreement(id: string): Promise<void> {
    await this.userTosAgreementRepository.delete(id);
  }
}
