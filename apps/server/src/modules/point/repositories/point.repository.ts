import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';
import { Point } from '../../../entities/point.entity';

@Injectable()
export class PointRepository {
  constructor(
    @InjectRepository(Point)
    private repository: Repository<Point>,
  ) {}

  async create(pointData: Partial<Point>): Promise<Point> {
    const point = this.repository.create(pointData);
    return this.repository.save(point);
  }

  async findAll(options?: FindManyOptions<Point>): Promise<Point[]> {
    return this.repository.find({
      ...options,
    });
  }

  async findOne(options: FindOneOptions<Point>): Promise<Point | null> {
    return this.repository.findOne(options);
  }

  async update(id: number, pointData: Partial<Point>): Promise<void> {
    await this.repository.update(id, pointData);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async getTotalPointsByUserId(userId: string): Promise<number> {
    const result = await this.repository
      .createQueryBuilder('point')
      .select('SUM(point.point)', 'total')
      .where('point.userId = :userId', { userId })
      .getRawOne();

    return parseInt(result?.total) || 0;
  }
}
