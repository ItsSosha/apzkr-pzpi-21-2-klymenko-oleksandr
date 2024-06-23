import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard, UserId } from 'src/auth';

@ApiTags('trainings')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('trainings')
export class MeasurementController {
  constructor(private readonly measurementService: MeasurementService) {}

  @Post('measure')
  create(
    @UserId() userId: string,
    @Body() createMeasurementDto: CreateMeasurementDto,
  ) {
    return this.measurementService.create(userId, createMeasurementDto);
  }

  @Get(':trainingId/measurements')
  findAll(@Param('trainingId') trainingId: string) {
    return this.measurementService.findAll(trainingId);
  }

  @Get(':trainingId/averages')
  async getAverages(@Param('trainingId') trainingId: string) {
    const averages =
      await this.measurementService.getAverageMeasurementsForTraining(
        trainingId,
      );
    return averages;
  }
}
