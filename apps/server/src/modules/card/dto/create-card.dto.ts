import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsDateString,
  Length,
  Min,
  Max,
} from 'class-validator';

export class CreateCardDto {
  @ApiProperty({
    description: '카드번호',
    example: '1234567890123456',
    minLength: 16,
    maxLength: 16,
  })
  @IsString()
  @Length(16, 16)
  cardNumber: string;

  @ApiProperty({
    description: '비밀번호 앞 2자리',
    example: '12',
    minLength: 2,
    maxLength: 2,
  })
  @IsString()
  @Length(2, 2)
  password: string;

  @ApiProperty({
    description: '유효기간 년도',
    example: 2025,
    minimum: 2024,
    maximum: 2030,
  })
  @IsNumber()
  @Min(2024)
  @Max(2030)
  expiryYear: number;

  @ApiProperty({
    description: '유효기간 월',
    example: 12,
    minimum: 1,
    maximum: 12,
  })
  @IsNumber()
  @Min(1)
  @Max(12)
  expiryMonth: number;

  @ApiProperty({
    description: 'CVC',
    example: '123',
    minLength: 3,
    maxLength: 3,
  })
  @IsString()
  @Length(3, 3)
  cvc: string;

  @ApiProperty({
    description: '생년월일',
    example: '1990-01-01',
    type: 'string',
    format: 'date',
  })
  @IsDateString()
  birthDate: string;
}
