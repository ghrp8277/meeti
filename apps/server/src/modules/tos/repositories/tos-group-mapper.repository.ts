import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TosGroupMapper } from '../../../entities/tos-group-mapper.entity';
import { TosGroupPurpose } from '../../../enums/tos-group-purpose.enum';

@Injectable()
export class TosGroupMapperRepository {
  constructor(
    @InjectRepository(TosGroupMapper)
    private repository: Repository<TosGroupMapper>,
  ) {}

  async findByPurpose(purpose: TosGroupPurpose) {
    return this.repository
      .createQueryBuilder('mapper')
      .leftJoin('mapper.tos', 'tos')
      .leftJoin('mapper.tosGroup', 'tosGroup')
      .select('tos.id', 'id')
      .addSelect('tos.title', 'title')
      .addSelect('tos.template', 'template')
      .addSelect('mapper.isRequired', 'isRequired')
      .where('tosGroup.purpose = :purpose', { purpose })
      .orderBy('mapper.seq', 'ASC')
      .getRawMany();
  }
}
