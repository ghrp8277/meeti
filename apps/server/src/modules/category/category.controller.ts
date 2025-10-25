import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { ApiDocs, CacheKey, CacheTTL, Public } from '../../common/decorators';
import { CacheInterceptor } from '../../common/interceptors';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @Public()
  @UseInterceptors(CacheInterceptor)
  @CacheKey('categories:all')
  @CacheTTL(1800)
  @ApiDocs({
    summary: '카테고리 목록 조회',
    description: '모든 카테고리 목록을 조회합니다',
  })
  getCategories() {
    return this.categoryService.getCategories();
  }

  @Get(':id')
  @Public()
  @ApiDocs({
    summary: '카테고리 상세 조회',
    description: '특정 카테고리의 상세 정보와 하위 카테고리 목록을 조회합니다',
  })
  getCategoryWithSubCategories(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.getCategoryWithSubCategories(id);
  }
}
