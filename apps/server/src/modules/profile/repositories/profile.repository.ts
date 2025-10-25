import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Profile } from '../../../entities/profile.entity';

@Injectable()
export class ProfileRepository {
  constructor(
    @InjectRepository(Profile)
    private repository: Repository<Profile>,
  ) {}

  async create(profileData: Partial<Profile>): Promise<Profile> {
    const profile = this.repository.create(profileData);
    return this.repository.save(profile);
  }

  async findOne(options: FindOneOptions<Profile>): Promise<Profile | null> {
    return this.repository.findOne(options);
  }

  async update(
    id: number,
    updateData: Partial<Profile>,
  ): Promise<Profile | null> {
    await this.repository.update(id, updateData);
    return this.findOne({ where: { id } });
  }

  async updateScore(userId: string, score: number): Promise<Profile> {
    const profile = await this.findOne({ where: { userId } });
    if (!profile) {
      throw new Error('Profile not found');
    }

    profile.score = score;
    return this.repository.save(profile);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
