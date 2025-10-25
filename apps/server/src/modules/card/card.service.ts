import { Injectable } from '@nestjs/common';
import { CardRepository } from './repositories/card.repository';
import { CreateCardDto, UpdateCardDto } from './dto';
import { Card } from '../../entities/card.entity';
import * as dayjs from 'dayjs';

@Injectable()
export class CardService {
  constructor(private readonly repository: CardRepository) {}

  async create(userId: string, createCardDto: CreateCardDto): Promise<Card> {
    const { cardNumber, password, expiryYear, expiryMonth, cvc, birthDate } =
      createCardDto;

    const cardData: Partial<Card> = {
      userId,
      cardNumber,
      password,
      expiryYear,
      expiryMonth,
      cvc,
      birthDate: dayjs(birthDate).toDate(),
    };

    return this.repository.create(cardData);
  }

  async findById(id: number): Promise<Card | null> {
    return this.repository.findById(id);
  }

  async findByUserId(userId: string): Promise<Card[]> {
    return this.repository.findByUserId(userId);
  }

  async update(id: number, updateCardDto: UpdateCardDto): Promise<Card | null> {
    const { birthDate, ...rest } = updateCardDto;

    const updateData: Partial<Card> = {
      ...rest,
      ...(birthDate && { birthDate: dayjs(birthDate).toDate() }),
    };

    return this.repository.update(id, updateData);
  }

  async delete(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}
