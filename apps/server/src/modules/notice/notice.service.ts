import { Injectable } from '@nestjs/common';
import { Notice } from '../../entities/notice.entity';
import { NoticeRepository } from './repositories/notice.repository';

@Injectable()
export class NoticeService {
  constructor(private readonly repository: NoticeRepository) {}

  async findAll(): Promise<Notice[]> {
    return this.repository.findAll({
      where: {
        isActive: true,
        isDeleted: false,
      },
      select: ['id', 'title', 'createdAt'],
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: number): Promise<Notice | null> {
    return this.repository.findOne({
      where: {
        id,
        isActive: true,
        isDeleted: false,
      },
      select: ['id', 'title', 'content', 'createdAt'],
    });
  }
}
