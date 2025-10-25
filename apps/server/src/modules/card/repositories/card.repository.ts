import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from '../../../entities/card.entity';

@Injectable()
export class CardRepository {
  constructor(
    @InjectRepository(Card)
    private readonly repository: Repository<Card>,
  ) {}

  async create(cardData: Partial<Card>): Promise<Card> {
    const card = this.repository.create(cardData);
    return this.repository.save(card);
  }

  async findById(id: number): Promise<Card | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByUserId(userId: string): Promise<Card[]> {
    return this.repository.find({ where: { userId } });
  }

  async update(id: number, updateData: Partial<Card>): Promise<Card | null> {
    await this.repository.update(id, updateData);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
