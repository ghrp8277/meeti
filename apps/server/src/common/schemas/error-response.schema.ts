import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseSchema {
  @ApiProperty({
    description: '요청 성공 여부',
    example: false,
  })
  success: boolean;

  @ApiProperty({
    description: '에러 코드',
    example: 'AU01',
  })
  errorCode: string;

  @ApiProperty({
    description: '에러 메시지',
    example: '이미 인증번호가 발송되었습니다. 잠시 후 다시 시도해주세요.',
  })
  message: string;

  @ApiProperty({
    description: '응답 시간',
    example: '2024-01-15T10:30:45.123Z',
  })
  timestamp: string;

  @ApiProperty({
    description: 'HTTP 상태 코드',
    example: 400,
  })
  statusCode: number;
}
