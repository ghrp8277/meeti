import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TosGroupMapper } from '../../entities/tos-group-mapper.entity';
import { TosService } from './tos.service';
import { TosController } from './tos.controller';
import { TosGroupMapperRepository } from './repositories/tos-group-mapper.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TosGroupMapper])],
  controllers: [TosController],
  providers: [TosService, TosGroupMapperRepository],
  exports: [TosService, TosGroupMapperRepository],
})
export class TosModule {}
