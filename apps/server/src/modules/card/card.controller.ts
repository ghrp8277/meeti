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
import { CardService } from './card.service';
import { CreateCardDto, UpdateCardDto } from './dto';
import { ApiDocs, User, UserPayload } from '../../common/decorators';
import { ApiResponseSchema, ErrorResponseSchema } from '../../common/schemas';

@ApiTags('cards')
@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: '카드 등록 성공',
    type: ApiResponseSchema,
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 요청',
    type: ErrorResponseSchema,
  })
  @ApiDocs({
    summary: '카드 등록',
    description: '새로운 카드를 등록합니다.',
  })
  async create(
    @Body() createCardDto: CreateCardDto,
    @User() user: UserPayload,
  ) {
    return this.cardService.create(user.id, createCardDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: '카드 조회 성공',
    type: ApiResponseSchema,
  })
  @ApiResponse({
    status: 404,
    description: '카드를 찾을 수 없음',
    type: ErrorResponseSchema,
  })
  @ApiDocs({
    summary: '카드 조회',
    description: '카드 ID로 카드 정보를 조회합니다.',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cardService.findById(id);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: '카드 수정 성공',
    type: ApiResponseSchema,
  })
  @ApiResponse({
    status: 404,
    description: '카드를 찾을 수 없음',
    type: ErrorResponseSchema,
  })
  @ApiDocs({
    summary: '카드 수정',
    description: '카드 정보를 수정합니다.',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    return this.cardService.update(id, updateCardDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: '카드 삭제 성공',
    type: ApiResponseSchema,
  })
  @ApiResponse({
    status: 404,
    description: '카드를 찾을 수 없음',
    type: ErrorResponseSchema,
  })
  @ApiDocs({
    summary: '카드 삭제',
    description: '카드를 삭제합니다.',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.cardService.delete(id);
    return { message: '카드가 삭제되었습니다.' };
  }
}
