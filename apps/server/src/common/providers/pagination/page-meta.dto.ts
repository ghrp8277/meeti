import { PageMetaDtoParameters } from './page-meta.interface';
import { DEFAULT_PAGE, DEFAULT_TAKE } from './constant';

export class PageMetaDto {
  readonly currentPage: number;

  readonly limit: number;

  readonly count: number;

  readonly totalPage: number;

  readonly hasPreviousPage: boolean;

  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, totalItemCount }: PageMetaDtoParameters) {
    this.currentPage = pageOptionsDto.page ?? DEFAULT_PAGE;
    this.limit = pageOptionsDto.take ?? DEFAULT_TAKE;
    this.count = totalItemCount;
    this.totalPage = Math.ceil(this.count / this.limit);
    this.hasPreviousPage = this.currentPage > 1;
    this.hasNextPage = this.currentPage < this.totalPage;
  }
}
