import { Injectable } from '@nestjs/common';
import { TosGroupMapperRepository } from './repositories/tos-group-mapper.repository';
import { TosGroupPurpose } from '../../enums/tos-group-purpose.enum';

@Injectable()
export class TosService {
  constructor(
    private readonly tosGroupMapperRepository: TosGroupMapperRepository,
  ) {}

  async getSignupTos() {
    return this.tosGroupMapperRepository.findByPurpose(TosGroupPurpose.SIGNUP);
  }
}
