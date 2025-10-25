import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Point } from '../../entities/point.entity';
import { PointService } from './point.service';
import { PointRepository } from './repositories/point.repository';
import { PointController } from './point.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Point])],
  controllers: [PointController],
  providers: [PointService, PointRepository],
  exports: [PointService, PointRepository],
})
export class PointModule {}
