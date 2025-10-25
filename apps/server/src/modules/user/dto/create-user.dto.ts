import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsOptional,
  IsDateString,
  Matches,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Gender } from '../../../enums/gender.enum';

export class CreateUserDto {
  @ApiProperty({
    description: '이메일',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: '올바른 이메일 형식이 아닙니다.' })
  email: string;

  @ApiProperty({
    description: '비밀번호 (영문, 숫자 또는 특수문자 2가지 이상 조합, 8-20자)',
    example: 'password123!',
  })
  @IsString()
  @MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
  @MaxLength(20, { message: '비밀번호는 최대 20자까지 가능합니다.' })
  @Matches(
    /^(?=.*[a-zA-Z])(?=.*[0-9])|(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])|(?=.*[0-9])(?=.*[^a-zA-Z0-9])/,
    {
      message:
        '비밀번호는 영문, 숫자 또는 특수문자 중 2가지 이상 조합이어야 합니다.',
    },
  )
  password: string;

  @ApiProperty({
    description: '이름',
    example: '홍길동',
  })
  @IsString()
  @MinLength(2, { message: '이름은 최소 2자 이상이어야 합니다.' })
  @MaxLength(20, { message: '이름은 최대 20자까지 가능합니다.' })
  name: string;

  @ApiProperty({
    description: '생년월일 (YYYY-MM-DD)',
    example: '1990-01-01',
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: '올바른 날짜 형식이 아닙니다. (YYYY-MM-DD)' })
  birthDate?: string;

  @ApiProperty({
    description: '휴대폰 번호',
    example: '01012345678',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Matches(/^01[0-9]{8,9}$/, {
    message: '올바른 휴대폰 번호 형식이 아닙니다.',
  })
  phoneNumber?: string;

  @ApiProperty({
    description: '성별',
    enum: Gender,
    example: Gender.MALE,
    required: false,
  })
  @IsOptional()
  gender?: Gender;
}
