import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { ApiDocs } from './common/decorators/api-docs.decorator';
import { ApiResponseSchema } from './common/schemas';

@ApiTags('health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @ApiResponse({
    status: 200,
    description: '서버 상태 정보',
    type: ApiResponseSchema,
  })
  @ApiDocs({
    summary: '서버 상태 확인',
    description: '서버의 현재 상태와 기본 정보를 반환합니다',
  })
  getHealth() {
    return this.appService.getHealth();
  }
}
