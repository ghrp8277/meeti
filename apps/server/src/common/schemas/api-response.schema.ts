import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseSchema<T> {
  @ApiProperty({
    description: '요청 성공 여부',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '응답 메시지',
    example: '요청이 성공적으로 처리되었습니다.',
  })
  message: string;

  @ApiProperty({
    description: '응답 데이터',
  })
  data: T;

  @ApiProperty({
    description: '응답 시간',
    example: '2024-01-15T10:30:45.123Z',
  })
  timestamp: string;
}
