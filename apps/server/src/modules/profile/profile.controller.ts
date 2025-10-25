import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { ApiDocs, User, UserPayload } from '../../common/decorators';
import { ApiResponseSchema, ErrorResponseSchema } from '../../common/schemas';

@ApiTags('profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @Get('me')
  @ApiResponse({
    status: 200,
    description: '프로필 조회 성공',
    type: ApiResponseSchema,
  })
  @ApiResponse({
    status: 404,
    description: '프로필을 찾을 수 없음',
    type: ErrorResponseSchema,
  })
  @ApiDocs({
    summary: '내 프로필 조회',
    description: '현재 로그인한 사용자의 프로필 정보를 조회합니다.',
  })
  async getMyProfile(@User() user: UserPayload) {
    return this.service.findByUserId(user.id);
  }
}
