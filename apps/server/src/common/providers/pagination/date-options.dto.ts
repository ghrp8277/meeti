import { IsDateString, IsOptional } from 'class-validator';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import { PageOptionsDto } from './page-options.dto';
import { ApiProperty } from '@nestjs/swagger';

dayjs.extend(utc);

export class DateOptionsDto extends PageOptionsDto {
  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: '조회 시작일',
    example: '2025-01-01T00:00:00.000Z',
  })
  readonly from?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: '조회 종료일',
    example: '2025-01-01T23:59:59.999Z',
  })
  readonly to?: string;

  get dateRange(): { from: string; to: string } {
    return {
      from: this.from ? dayjs(this.from).format() : '',
      to: this.to ? dayjs(this.to).format() : '',
    };
  }

  // 검색용 - UTC 변환 없이 날짜만 사용
  get dateRangeWithFormat(): (format?: string) => { from: string; to: string } {
    return (format: string = 'YYYY-MM-DD') => ({
      from: this.from ? dayjs(this.from).format(format) : '',
      to: this.to ? dayjs(this.to).format(format) : dayjs().format(format),
    });
  }

  // 예약/결제 등 정확한 시간대가 필요한 경우 사용
  get dateRangeWithUTC(): (format?: string) => { from: string; to: string } {
    return (format: string = 'YYYY-MM-DD') => ({
      from: this.from ? dayjs(this.from).utc().format(format) : '',
      to: this.to
        ? dayjs(this.to).utc().format(format)
        : dayjs().utc().format(format),
    });
  }

  get dateRangeToDate(): (options?: { withTime?: boolean }) => {
    from: Date | null;
    to: Date;
  } {
    const dayjsWithUTC = dayjs;
    dayjsWithUTC.extend(utc);

    return (options = { withTime: false }) => ({
      from: this.from
        ? options.withTime
          ? dayjsWithUTC(this.from).utc().toDate()
          : dayjsWithUTC(this.from).utc().startOf('day').toDate()
        : null,
      to: this.to
        ? options.withTime
          ? dayjsWithUTC(this.to).utc().toDate()
          : dayjsWithUTC(this.to).utc().endOf('day').toDate()
        : options.withTime
          ? dayjsWithUTC().utc().toDate()
          : dayjsWithUTC().utc().endOf('day').toDate(),
    });
  }

  constructor(params: { from?: string; to?: string } = {}) {
    const { from, to } = params;
    super();
    if (from) this.from = from;
    if (to) this.to = to;
  }
}
