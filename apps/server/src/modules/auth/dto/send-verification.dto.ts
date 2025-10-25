import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class SendVerificationDto {
  @ApiProperty({
    description: '인증번호를 받을 휴대폰 번호',
    example: '010-1234-5678',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^01[0-9]-?[0-9]{4}-?[0-9]{4}$/, {
    message: '올바른 휴대폰 번호 형식이 아닙니다',
  })
  phoneNumber: string;
}
