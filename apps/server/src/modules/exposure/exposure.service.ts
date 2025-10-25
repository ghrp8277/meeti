import { Injectable } from '@nestjs/common';
import { Exposure } from '../../entities/exposure.entity';
import { ExposureType } from '../../enums/exposure-type.enum';
import { ExposureRepository } from './repositories/exposure.repository';

@Injectable()
export class ExposureService {
  constructor(private readonly repository: ExposureRepository) {}

  async create(
    userId: string,
    type: ExposureType,
    quantity: number,
  ): Promise<Exposure> {
    return this.repository.create({
      userId,
      type,
      quantity,
    });
  }

  async findByUserId(userId: string): Promise<Exposure[]> {
    return this.repository.findByUserId(userId);
  }

  async findByType(
    userId: string,
    type: ExposureType,
  ): Promise<Exposure | null> {
    return this.repository.findByType(userId, type);
  }

  async findById(id: number): Promise<Exposure | null> {
    return this.repository.findById(id);
  }

  async addQuantity(
    userId: string,
    type: ExposureType,
    quantity: number,
  ): Promise<Exposure> {
    return this.repository.addQuantity(userId, type, quantity);
  }

  async useExposure(
    userId: string,
    type: ExposureType,
    amount: number = 1,
  ): Promise<boolean> {
    return this.repository.useExposure(userId, type, amount);
  }

  async update(
    id: number,
    updateData: Partial<Exposure>,
  ): Promise<Exposure | null> {
    return this.repository.update(id, updateData);
  }

  async delete(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}
