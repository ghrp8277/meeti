import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AnswerService } from './answer.service';
import { ApiDocs, Public } from '../../common/decorators';
import { ApiResponseSchema, ErrorResponseSchema } from '../../common/schemas';

@ApiTags('answers')
@Controller('answers')
export class AnswerController {
  constructor(private readonly service: AnswerService) {}

  @Get()
  @Public()
  @ApiResponse({
    status: 200,
    description: '자주 묻는 질문 목록 조회 성공',
    type: ApiResponseSchema,
  })
  @ApiDocs({
    summary: '자주 묻는 질문 목록 조회',
    description: '모든 자주 묻는 질문 목록을 조회합니다.',
  })
  async findAll() {
    return this.service.findAll();
  }

  @Get('categories')
  @Public()
  @ApiResponse({
    status: 200,
    description: '자주 묻는 질문 카테고리 목록 조회 성공',
    type: ApiResponseSchema,
  })
  @ApiDocs({
    summary: '자주 묻는 질문 카테고리 목록 조회',
    description: '모든 자주 묻는 질문 카테고리 목록을 조회합니다.',
  })
  async findAllCategories() {
    return this.service.findAllCategories();
  }

  @Get('categories/:id')
  @Public()
  @ApiResponse({
    status: 200,
    description: '카테고리별 자주 묻는 질문 목록 조회 성공',
    type: ApiResponseSchema,
  })
  @ApiResponse({
    status: 404,
    description: '카테고리를 찾을 수 없음',
    type: ErrorResponseSchema,
  })
  @ApiDocs({
    summary: '카테고리별 자주 묻는 질문 목록 조회',
    description: '특정 카테고리의 자주 묻는 질문 목록을 조회합니다.',
  })
  async findByCategoryId(@Param('id', ParseIntPipe) categoryId: number) {
    return this.service.findByCategoryId(categoryId);
  }

  @Get('search')
  @Public()
  @ApiResponse({
    status: 200,
    description: '자주 묻는 질문 검색 성공',
    type: ApiResponseSchema,
  })
  @ApiDocs({
    summary: '자주 묻는 질문 검색',
    description: '키워드로 자주 묻는 질문을 검색합니다.',
  })
  async search(@Query('q') keyword: string) {
    return this.service.searchByKeyword(keyword);
  }
}
