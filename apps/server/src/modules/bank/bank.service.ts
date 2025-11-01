import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from '../../entities/bank.entity';
import { PageOptionsDto } from '../../common/providers/pagination';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank)
    private readonly repository: Repository<Bank>,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto) {
    const { take, skip, order } = pageOptionsDto;

    const [banks, itemCount] = await this.repository.findAndCount({
      select: {
        id: true,
        code: true,
        name: true,
      },
      take,
      skip,
      order: {
        id: order,
      },
    });

    return { banks, itemCount };
  }
}
