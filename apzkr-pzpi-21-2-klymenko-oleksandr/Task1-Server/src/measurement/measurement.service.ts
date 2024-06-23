import { ConflictException, Injectable } from '@nestjs/common';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { UpdateMeasurementDto } from './dto/update-measurement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Measurement } from './entities';
import { TrainingService } from 'src/training/training.service';
import { Repository } from 'typeorm';

@Injectable()
export class MeasurementService {
  constructor(
    @InjectRepository(Measurement)
    private readonly measurementRepository: Repository<Measurement>,
    private readonly trainingService: TrainingService,
  ) {}

  async create(userId: string, createMeasurementDto: CreateMeasurementDto) {
    const training = await this.trainingService.findActiveTraining(userId);
    if (!training) {
      throw new ConflictException('User has no active training at the moment.');
    }
    const measurement = this.measurementRepository.create(createMeasurementDto);
    measurement.training = training;
    return this.measurementRepository.save(measurement);
  }

  async findAll(trainingId: string) {
    return this.measurementRepository.find({
      where: {
        training: {
          id: trainingId,
        },
      },
    });
  }

  async getAverageMeasurementsForTraining(trainingId: string) {
    const averages = await this.measurementRepository
      .createQueryBuilder('measurement')
      .select('AVG(measurement.heartRate)', 'averageHeartRate')
      .addSelect('AVG(measurement.temperature)', 'averageTemperature')
      .where('measurement.trainingId = :trainingId', { trainingId })
      .getRawOne();

    return {
      averageHeartRate: parseFloat(averages.averageHeartRate),
      averageTemperature: parseFloat(averages.averageTemperature),
    } as {
      averageHeartRate: number;
      averageTemperature: number;
    };
  }
}
