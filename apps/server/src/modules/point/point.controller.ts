import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { PointService } from './point.service';
import { ApiDocs, User, UserPayload } from '../../common/decorators';
import { ApiResponseSchema, ErrorResponseSchema } from '../../common/schemas';

@ApiTags('points')
@Controller('points')
export class PointController {
  constructor(private readonly service: PointService) {}

  @Get('me')
  @ApiResponse({
    status: 200,
    description: '포인트 조회 성공',
    type: ApiResponseSchema,
  })
  @ApiResponse({
    status: 404,
    description: '포인트를 찾을 수 없음',
    type: ErrorResponseSchema,
  })
  @ApiDocs({
    summary: '내 포인트 조회',
    description: '현재 로그인한 사용자의 총 포인트를 조회합니다.',
  })
  async getMyPoints(@User() user: UserPayload) {
    return this.service.getTotalPointsByUserId(user.id);
  }

  @Get('me/history')
  @ApiResponse({
    status: 200,
    description: '포인트 내역 조회 성공',
    type: ApiResponseSchema,
  })
  @ApiResponse({
    status: 404,
    description: '포인트 내역을 찾을 수 없음',
    type: ErrorResponseSchema,
  })
  @ApiDocs({
    summary: '내 포인트 내역 조회',
    description: '현재 로그인한 사용자의 포인트 내역을 조회합니다.',
  })
  async getMyPointsHistory(@User() user: UserPayload) {
    return this.service.getPointsHistoryByUserId(user.id);
  }
}
