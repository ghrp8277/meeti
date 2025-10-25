import { registerAs } from '@nestjs/config';
import { DocumentBuilder } from '@nestjs/swagger';

export default registerAs('swagger', () => {
  return new DocumentBuilder()
    .setTitle('Meeti API')
    .setDescription('티켓 판매/양도 플랫폼 API')
    .setVersion('1.0')
    .addTag('health', '헬스 체크')
    .addTag('categories', '카테고리 관리')
    .addTag('tos', '약관 관리')
    .addTag('auth', '인증 관리')
    .build();
});
