import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  Body,
} from '@nestjs/common';
import { TrainingService } from './training.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard, UserId } from 'src/auth';
import { StartTrainingDto } from './dto/start-training.dto';

@ApiTags('trainings')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('trainings')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Post('start')
  create(@UserId() userId: string, @Body() startTrainingDto: StartTrainingDto) {
    return this.trainingService.start(userId, startTrainingDto);
  }

  @Post('end')
  end(@UserId() userId: string) {
    return this.trainingService.end(userId);
  }

  @Get('active')
  async active(@UserId() userId: string) {
    const activeTraining =
      await this.trainingService.findActiveTraining(userId);
    return activeTraining ?? JSON.stringify(activeTraining);
  }

  @Get()
  findAllByUserId(@UserId() userId: string) {
    return this.trainingService.findAllByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainingService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainingService.remove(id);
  }

  @Post(':id/generate-recommendations')
  async generateRecommendations(@Param('id') id: string) {
    return this.trainingService.generateRecommendations(id);
  }
}
