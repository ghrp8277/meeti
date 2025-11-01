import { Transform, Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import {
  DEFAULT_PAGE,
  DEFAULT_TAKE,
  DEFAULT_MAX_TAKE,
  DEFAULT_MIN_PAGE,
  DEFAULT_MIN_TAKE,
} from './constant';
import { ApiProperty } from '@nestjs/swagger';

export class PageOptionsDto {
  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  @ApiProperty({
    description: '정렬 방향',
    example: 'ASC',
  })
  readonly order?: 'ASC' | 'DESC' = 'ASC';

  @Type(() => Number)
  @IsInt()
  @Min(DEFAULT_MIN_PAGE)
  @IsOptional()
  @ApiProperty({
    description: '페이지 번호',
    example: DEFAULT_MIN_PAGE,
  })
  @Transform(({ value }) => Number(value))
  readonly page?: number = DEFAULT_PAGE;

  @Type(() => Number)
  @IsInt()
  @Min(DEFAULT_MIN_TAKE)
  @Max(DEFAULT_MAX_TAKE)
  @IsOptional()
  @ApiProperty({
    description: '페이지 당 아이템 수',
    example: DEFAULT_TAKE,
  })
  @Transform(({ value }) => Number(value))
  readonly take?: number = DEFAULT_TAKE;

  get skip(): number {
    return (this.page ?? DEFAULT_PAGE - 1) * (this.take ?? DEFAULT_TAKE);
  }

  constructor(
    params: { page?: number; take?: number; order?: 'ASC' | 'DESC' } = {},
  ) {
    const { page, take, order } = params;
    if (page) this.page = page;
    if (take) this.take = take;
    if (order) this.order = order;
  }
}
