import { Injectable } from '@nestjs/common';
import { Like } from 'typeorm';
import { Answer } from '../../entities/answer.entity';
import { AnswerCategory } from '../../entities/answer-category.entity';
import { AnswerRepository } from './repositories/answer.repository';
import { AnswerCategoryRepository } from './repositories/answer-category.repository';

@Injectable()
export class AnswerService {
  constructor(
    private readonly repository: AnswerRepository,
    private readonly categoryRepository: AnswerCategoryRepository,
  ) {}

  async findAll(): Promise<Answer[]> {
    return this.repository.findAll({
      where: {
        isActive: true,
        isDeleted: false,
      },
      relations: ['category'],
      order: { createdAt: 'DESC' },
    });
  }

  async findAllCategories(): Promise<AnswerCategory[]> {
    return this.categoryRepository.findAll({
      where: {
        isActive: true,
        isDeleted: false,
      },
      order: { sortOrder: 'ASC' },
    });
  }

  async findByCategoryId(categoryId: number): Promise<Answer[]> {
    return this.repository.findAll({
      where: {
        categoryId,
        isActive: true,
        isDeleted: false,
      },
      relations: ['category'],
      order: { createdAt: 'DESC' },
    });
  }

  async searchByKeyword(keyword: string): Promise<Answer[]> {
    return this.repository.findAll({
      where: [
        {
          question: Like(`%${keyword}%`),
          isActive: true,
          isDeleted: false,
        },
        {
          answer: Like(`%${keyword}%`),
          isActive: true,
          isDeleted: false,
        },
      ],
      relations: ['category'],
      order: { createdAt: 'DESC' },
    });
  }
}
