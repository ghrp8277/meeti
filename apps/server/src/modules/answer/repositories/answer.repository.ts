import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';
import { Answer } from '../../../entities/answer.entity';

@Injectable()
export class AnswerRepository {
  constructor(
    @InjectRepository(Answer)
    private repository: Repository<Answer>,
  ) {}

  async create(answerData: Partial<Answer>): Promise<Answer> {
    const answer = this.repository.create(answerData);
    return this.repository.save(answer);
  }

  async findAll(options?: FindManyOptions<Answer>): Promise<Answer[]> {
    return this.repository.find({
      ...options,
    });
  }

  async findOne(options: FindOneOptions<Answer>): Promise<Answer | null> {
    return this.repository.findOne(options);
  }

  async update(id: number, answerData: Partial<Answer>): Promise<void> {
    await this.repository.update(id, answerData);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
