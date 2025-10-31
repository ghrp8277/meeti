import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { BankService } from './bank.service';
import { ApiDocs, Public } from '../../common/decorators';
import { ApiResponseSchema } from '../../common/schemas';
import {
  PageOptionsDto,
  buildPaginationResponse,
} from '../../common/providers/pagination';
import {
  DEFAULT_PAGE,
  DEFAULT_TAKE,
} from '../../common/providers/pagination/constant';

@ApiTags('banks')
@Controller('banks')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Get()
  @Public()
  @ApiResponse({
    status: 200,
    description: '은행 목록 조회 성공',
    type: ApiResponseSchema,
  })
  @ApiDocs({
    summary: '은행 목록 조회',
    description: '모든 은행 목록을 조회합니다.',
  })
  async findAll(@Query() pageOptionsDto: PageOptionsDto) {
    const { banks, itemCount } = await this.bankService.findAll(pageOptionsDto);

    return buildPaginationResponse(
      banks,
      itemCount,
      pageOptionsDto.page ?? DEFAULT_PAGE,
      pageOptionsDto.take ?? DEFAULT_TAKE,
    );
  }
}
