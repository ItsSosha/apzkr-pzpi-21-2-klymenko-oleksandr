import { Module } from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { MeasurementController } from './measurement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measurement } from './entities';
import { Training } from 'src/training/entities';
import { TrainingModule } from 'src/training/training.module';

@Module({
  imports: [TypeOrmModule.forFeature([Measurement]), TrainingModule],
  controllers: [MeasurementController],
  providers: [MeasurementService],
})
export class MeasurementModule {}
