import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from '../../entities/answer.entity';
import { AnswerCategory } from '../../entities/answer-category.entity';
import { AnswerService } from './answer.service';
import { AnswerRepository } from './repositories/answer.repository';
import { AnswerCategoryRepository } from './repositories/answer-category.repository';
import { AnswerController } from './answer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Answer, AnswerCategory])],
  controllers: [AnswerController],
  providers: [AnswerService, AnswerRepository, AnswerCategoryRepository],
  exports: [AnswerService, AnswerRepository, AnswerCategoryRepository],
})
export class AnswerModule {}
