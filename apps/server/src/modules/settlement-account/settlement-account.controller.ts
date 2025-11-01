import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { SettlementAccountService } from './settlement-account.service';
import { CreateSettlementAccountDto, UpdateSettlementAccountDto } from './dto';
import { ApiDocs, User, UserPayload } from '../../common/decorators';
import { ApiResponseSchema, ErrorResponseSchema } from '../../common/schemas';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('settlement-accounts')
@Controller('settlement-accounts')
export class SettlementAccountController {
  constructor(
    private readonly settlementAccountService: SettlementAccountService,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: '정산 계좌 등록 성공',
    type: ApiResponseSchema,
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 요청',
    type: ErrorResponseSchema,
  })
  @ApiDocs({
    summary: '정산 계좌 등록',
    description: '새로운 정산 계좌를 등록합니다.',
  })
  async create(
    @Body() createAccountDto: CreateSettlementAccountDto,
    @User() user: UserPayload,
  ) {
    console.log('createAccountDto', createAccountDto);
    console.log('user', user);
    return this.settlementAccountService.create(user.id, createAccountDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: '정산 계좌 목록 조회 성공',
    type: ApiResponseSchema,
  })
  @ApiDocs({
    summary: '정산 계좌 목록 조회',
    description: '사용자의 모든 정산 계좌 정보를 조회합니다.',
  })
  async findAll(@User() user: UserPayload) {
    return this.settlementAccountService.findByUserId(user.id);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: '정산 계좌 조회 성공',
    type: ApiResponseSchema,
  })
  @ApiResponse({
    status: 404,
    description: '정산 계좌를 찾을 수 없음',
    type: ErrorResponseSchema,
  })
  @ApiDocs({
    summary: '정산 계좌 조회',
    description: '정산 계좌 ID로 계좌 정보를 조회합니다.',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.settlementAccountService.findById(id);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: '정산 계좌 수정 성공',
    type: ApiResponseSchema,
  })
  @ApiResponse({
    status: 404,
    description: '정산 계좌를 찾을 수 없음',
    type: ErrorResponseSchema,
  })
  @ApiDocs({
    summary: '정산 계좌 수정',
    description: '정산 계좌 정보를 수정합니다.',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAccountDto: UpdateSettlementAccountDto,
  ) {
    return this.settlementAccountService.update(id, updateAccountDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: '정산 계좌 삭제 성공',
    type: ApiResponseSchema,
  })
  @ApiResponse({
    status: 404,
    description: '정산 계좌를 찾을 수 없음',
    type: ErrorResponseSchema,
  })
  @ApiDocs({
    summary: '정산 계좌 삭제',
    description: '정산 계좌를 삭제합니다.',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.settlementAccountService.delete(id);
    return { message: '정산 계좌가 삭제되었습니다.' };
  }
}
