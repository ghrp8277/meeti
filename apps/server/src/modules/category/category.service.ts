import { Injectable } from '@nestjs/common';
import { Category } from '../../entities/category.entity';
import { CategoryRepository } from './repositories';
import { IsNull } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.findAll({
      select: ['id', 'name', 'parentId'],
      where: {
        parentId: IsNull(),
        isActive: true,
        isDeleted: false,
      },
      order: {
        seq: 'ASC',
      },
    });
  }

  async getCategoryWithSubCategories(id: number): Promise<Category | null> {
    const category = await this.categoryRepository.findOne({
      where: {
        id,
        isActive: true,
        isDeleted: false,
      },
      select: ['id', 'name'],
    });

    if (!category) {
      return null;
    }

    const subCategories = await this.categoryRepository.findAll({
      where: {
        parentId: id,
        isActive: true,
        isDeleted: false,
      },
      select: ['id', 'name'],
      order: {
        seq: 'ASC',
      },
    });

    return {
      ...category,
      subCategories,
    } as Category & { subCategories: Category[] };
  }
}
