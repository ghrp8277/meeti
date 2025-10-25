import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { NoticeService } from './notice.service';
import { ApiDocs, Public } from '../../common/decorators';
import { ApiResponseSchema, ErrorResponseSchema } from '../../common/schemas';

@ApiTags('notices')
@Controller('notices')
export class NoticeController {
  constructor(private readonly service: NoticeService) {}

  @Get()
  @Public()
  @ApiResponse({
    status: 200,
    description: '공지사항 목록 조회 성공',
    type: ApiResponseSchema,
  })
  @ApiDocs({
    summary: '공지사항 목록 조회',
    description: '모든 공지사항 목록을 조회합니다.',
  })
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Public()
  @ApiResponse({
    status: 200,
    description: '공지사항 상세 조회 성공',
    type: ApiResponseSchema,
  })
  @ApiResponse({
    status: 404,
    description: '공지사항을 찾을 수 없음',
    type: ErrorResponseSchema,
  })
  @ApiDocs({
    summary: '공지사항 상세 조회',
    description: '특정 공지사항의 상세 정보를 조회합니다.',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }
}
