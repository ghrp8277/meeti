import { Injectable } from '@nestjs/common';
import { Profile } from '../../entities/profile.entity';
import { ProfileRepository } from './repositories/profile.repository';
import { generate } from 'random-words';

@Injectable()
export class ProfileService {
  constructor(private readonly repository: ProfileRepository) {}

  async create(userId: string, nickname?: string): Promise<Profile> {
    const finalNickname = nickname || this.generateRandomNickname();
    return this.repository.create({
      nickname: finalNickname,
      userId,
    });
  }

  private generateRandomNickname(): string {
    return generate({ exactly: 2, join: '' });
  }

  async findByUserId(userId: string): Promise<Profile | null> {
    return this.repository.findOne({ where: { userId } });
  }

  async findById(id: number): Promise<Profile | null> {
    return this.repository.findOne({ where: { id } });
  }

  async updateScore(userId: string, score: number): Promise<Profile> {
    return this.repository.updateScore(userId, score);
  }

  async update(
    id: number,
    updateData: Partial<Profile>,
  ): Promise<Profile | null> {
    return this.repository.update(id, updateData);
  }

  async delete(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}
