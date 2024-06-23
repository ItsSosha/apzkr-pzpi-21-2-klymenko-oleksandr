import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { StartTrainingDto } from './dto/start-training.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Training } from './entities/training.entity';
import { Equal, IsNull, Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { AiService } from 'src/ai/ai.service';
import { GymService } from 'src/gym/gym.service';

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(Training)
    private readonly trainingRepository: Repository<Training>,
    private readonly userService: UserService,
    private readonly aiService: AiService,
    private readonly gymService: GymService,
  ) {}

  async start(userId: string, startTrainingDto: StartTrainingDto) {
    const user = await this.userService.findOne(userId);
    const gym = await this.gymService.findOne(startTrainingDto.gymId);
    const trainingInProgress = await this.findActiveTraining(userId);
    if (trainingInProgress) {
      throw new ConflictException('User already has a training in progress');
    }
    const training = this.trainingRepository.create({
      startDate: new Date(),
    });
    training.gym = gym;
    training.user = user;
    return this.trainingRepository.save(training);
  }

  async end(userId: string) {
    const training = await this.findActiveTraining(userId);
    if (!training) {
      throw new ConflictException('User has no active training at the moment.');
    }
    const mergedTraining = this.trainingRepository.merge(training as Training, {
      endDate: new Date(),
    });
    return this.trainingRepository.save(mergedTraining);
  }

  async findActiveTraining(userId: string) {
    return this.trainingRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        endDate: IsNull(),
      },
      relations: ['gym', 'measurements'],
    });
  }

  async findAllByUserId(userId: string) {
    return this.trainingRepository.find({
      where: {
        user: {
          id: Equal(userId),
        },
      },
      relations: ['gym', 'measurements'],
      order: {
        startDate: {
          direction: 'DESC',
          nulls: 'FIRST',
        },
        measurements: {
          date: 'ASC',
        },
      },
    });
  }

  async findOne(id: string) {
    const training = await this.trainingRepository.findOne({
      where: { id },
      relations: ['gym', 'measurements'],
      order: {
        measurements: {
          date: 'ASC',
        },
      },
    });

    if (!training) {
      throw new NotFoundException(`No training with ID ${id}`);
    }

    return training;
  }

  async remove(id: string) {
    const training = await this.findOne(id);
    await this.trainingRepository.remove(training);
  }

  async generateRecommendations(id: string) {
    const training = await this.findOne(id);
    if (training.recommendations) {
      throw new ConflictException(
        `Training with ID ${id} already has recommendations generated.`,
      );
    }
    const aiResponse = await this.aiService.recommendationPrompt(
      training.measurements,
    );
    training.recommendations = aiResponse;
    return this.trainingRepository.save(training);
  }
}
