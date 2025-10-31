export { PageMetaDto } from './page-meta.dto';
export { PageDto } from './page.dto';
export { PageOptionsDto } from './page-options.dto';
export { DateOptionsDto } from './date-options.dto';
export { PageMetaDtoParameters } from './page-meta.interface';

import { PageMetaDto } from './page-meta.dto';

export interface PaginationResult<T> {
  data: T[];
  meta: PageMetaDto;
}

export function buildPaginationResponse<T>(
  data: T[],
  totalItemCount: number,
  page: number,
  take: number,
): PaginationResult<T> {
  const pageOptionsDto = {
    page,
    take,
    skip: (page - 1) * take,
  };

  const meta = new PageMetaDto({
    pageOptionsDto,
    totalItemCount,
  });

  return {
    data,
    meta,
  };
}
