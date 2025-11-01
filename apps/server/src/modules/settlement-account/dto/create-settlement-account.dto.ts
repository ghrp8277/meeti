import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsInt, Matches } from 'class-validator';

export class CreateSettlementAccountDto {
  @ApiProperty({
    description: '예금주',
    example: '홍길동',
    maxLength: 50,
  })
  @IsString()
  @Length(1, 50)
  accountHolder: string;

  @ApiProperty({
    description: '은행ID',
    example: 4,
  })
  @IsInt()
  bankId: number;

  @ApiProperty({
    description: '계좌번호',
    example: '123456-12-123456',
    maxLength: 50,
  })
  @IsString()
  @Length(1, 50)
  accountNumber: string;

  @ApiProperty({
    description: '휴대폰번호',
    example: '010-1234-5678',
    minLength: 11,
    maxLength: 13,
  })
  @IsString()
  @Matches(/^01[0-9]-\d{3,4}-\d{4}$/, {
    message: '올바른 휴대폰 번호 형식이 아닙니다.',
  })
  @Length(11, 13)
  mobile: string;
}
