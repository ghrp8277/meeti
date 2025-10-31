import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsInt } from 'class-validator';

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
    example: '01012345678',
    minLength: 11,
    maxLength: 11,
  })
  @IsString()
  @Length(11, 11)
  mobile: string;
}
