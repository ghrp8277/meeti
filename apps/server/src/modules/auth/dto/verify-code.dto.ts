import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, Matches } from 'class-validator';

export class VerifyCodeDto {
  @ApiProperty({
    description: '인증번호를 확인할 휴대폰 번호',
    example: '010-1234-5678',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^01[0-9]-?[0-9]{4}-?[0-9]{4}$/, {
    message: '올바른 휴대폰 번호 형식이 아닙니다',
  })
  phoneNumber: string;

  @ApiProperty({
    description: '수신된 인증번호',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 6, { message: '인증번호는 6자리여야 합니다' })
  code: string;
}
