import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';
import { AnswerCategory } from '../../../entities/answer-category.entity';

@Injectable()
export class AnswerCategoryRepository {
  constructor(
    @InjectRepository(AnswerCategory)
    private repository: Repository<AnswerCategory>,
  ) {}

  async create(categoryData: Partial<AnswerCategory>): Promise<AnswerCategory> {
    const category = this.repository.create(categoryData);
    return this.repository.save(category);
  }

  async findAll(
    options?: FindManyOptions<AnswerCategory>,
  ): Promise<AnswerCategory[]> {
    return this.repository.find({
      ...options,
    });
  }

  async findOne(
    options: FindOneOptions<AnswerCategory>,
  ): Promise<AnswerCategory | null> {
    return this.repository.findOne(options);
  }

  async update(
    id: number,
    categoryData: Partial<AnswerCategory>,
  ): Promise<void> {
    await this.repository.update(id, categoryData);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
