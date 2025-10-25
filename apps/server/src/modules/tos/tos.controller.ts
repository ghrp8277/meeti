import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TosService } from './tos.service';
import { ApiDocs, CacheKey, CacheTTL } from '../../common/decorators';
import { CacheInterceptor } from '../../common/interceptors';

@ApiTags('tos')
@Controller('tos')
export class TosController {
  constructor(private readonly tosService: TosService) {}

  @Get('signup')
  @UseInterceptors(CacheInterceptor)
  @CacheKey('tos:signup')
  @CacheTTL(3600)
  @ApiDocs({
    summary: '회원가입 약관 조회',
    description: '회원가입 시 필요한 약관 목록을 조회합니다',
    responses: [
      {
        status: 200,
        description: '회원가입 약관 목록',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              code: { type: 'string', example: 'TERMS_OF_SERVICE' },
              title: { type: 'string', example: '밋티 이용약관(요지)' },
              template: { type: 'string', example: '약관 내용...' },
              version: { type: 'number', example: 1 },
              isRequired: { type: 'boolean', example: true },
              seq: { type: 'number', example: 1 },
            },
          },
        },
      },
    ],
  })
  getSignupTos() {
    return this.tosService.getSignupTos();
  }
}
