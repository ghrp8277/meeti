import { PartialType } from '@nestjs/swagger';
import { CreateSettlementAccountDto } from './create-settlement-account.dto';

export class UpdateSettlementAccountDto extends PartialType(
  CreateSettlementAccountDto,
) {}
