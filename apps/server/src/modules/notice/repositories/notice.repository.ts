import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';
import { Notice } from '../../../entities/notice.entity';

@Injectable()
export class NoticeRepository {
  constructor(
    @InjectRepository(Notice)
    private repository: Repository<Notice>,
  ) {}

  async create(noticeData: Partial<Notice>): Promise<Notice> {
    const notice = this.repository.create(noticeData);
    return this.repository.save(notice);
  }

  async findAll(options?: FindManyOptions<Notice>): Promise<Notice[]> {
    return this.repository.find({
      ...options,
    });
  }

  async findOne(options: FindOneOptions<Notice>): Promise<Notice | null> {
    return this.repository.findOne(options);
  }

  async update(id: number, noticeData: Partial<Notice>): Promise<void> {
    await this.repository.update(id, noticeData);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
