import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exposure } from '../../entities/exposure.entity';
import { ExposureService } from './exposure.service';
import { ExposureRepository } from './repositories/exposure.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Exposure])],
  providers: [ExposureService, ExposureRepository],
  exports: [ExposureService, ExposureRepository],
})
export class ExposureModule {}
