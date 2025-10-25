import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exposure } from '../../../entities/exposure.entity';
import { ExposureType } from '../../../enums/exposure-type.enum';

@Injectable()
export class ExposureRepository {
  constructor(
    @InjectRepository(Exposure)
    private repository: Repository<Exposure>,
  ) {}

  async create(exposureData: Partial<Exposure>): Promise<Exposure> {
    const exposure = this.repository.create(exposureData);
    return this.repository.save(exposure);
  }

  async findByUserId(userId: string): Promise<Exposure[]> {
    return this.repository.find({ where: { userId } });
  }

  async findByType(
    userId: string,
    type: ExposureType,
  ): Promise<Exposure | null> {
    return this.repository.findOne({
      where: { userId, type },
    });
  }

  async findById(id: number): Promise<Exposure | null> {
    return this.repository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateData: Partial<Exposure>,
  ): Promise<Exposure | null> {
    await this.repository.update(id, updateData);
    return this.findById(id);
  }

  async addQuantity(
    userId: string,
    type: ExposureType,
    quantity: number,
  ): Promise<Exposure> {
    let exposure = await this.findByType(userId, type);

    if (!exposure) {
      exposure = await this.create({ userId, type, quantity });
    } else {
      exposure.quantity += quantity;
      exposure = await this.repository.save(exposure);
    }

    return exposure;
  }

  async useExposure(
    userId: string,
    type: ExposureType,
    amount: number = 1,
  ): Promise<boolean> {
    const exposure = await this.findByType(userId, type);

    if (!exposure || exposure.quantity < amount) {
      return false;
    }

    exposure.quantity -= amount;
    await this.repository.save(exposure);

    return true;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
