import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Category } from '../../../entities/category.entity';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private repository: Repository<Category>,
  ) {}

  async findAll(options?: FindManyOptions<Category>): Promise<Category[]> {
    return this.repository.find({
      ...options,
    });
  }

  async findOne(options: FindOneOptions<Category>): Promise<Category | null> {
    return this.repository.findOne(options);
  }
}
