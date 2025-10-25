import { Injectable } from '@nestjs/common';
import { Point } from '../../entities/point.entity';
import { PointRepository } from './repositories/point.repository';

@Injectable()
export class PointService {
  constructor(private readonly repository: PointRepository) {}

  async getTotalPointsByUserId(userId: string): Promise<number> {
    return this.repository.getTotalPointsByUserId(userId);
  }

  async getPointsHistoryByUserId(userId: string): Promise<Point[]> {
    return this.repository.findAll({
      where: { userId },
      select: ['id', 'point', 'description', 'createdAt'],
      order: { createdAt: 'DESC' },
    });
  }

  async create(
    userId: string,
    point: number,
    description?: string,
  ): Promise<Point> {
    return this.repository.create({
      userId,
      point,
      description,
    });
  }

  async update(id: number, pointData: Partial<Point>): Promise<void> {
    await this.repository.update(id, pointData);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
