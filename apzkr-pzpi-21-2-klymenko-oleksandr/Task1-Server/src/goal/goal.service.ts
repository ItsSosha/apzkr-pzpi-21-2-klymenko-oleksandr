import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Goal } from './entities/goal.entity';
import { Repository } from 'typeorm';
import { GoalProgress } from './entities/goal-progress.entity';
import { UserService } from 'src/user/user.service';
import { CreateGoalProgressDto } from './dto/create-goal-progress.dto';
import { UpdateGoalProgressDto } from './dto/update-goal-progress.dto';

@Injectable()
export class GoalService {
  constructor(
    @InjectRepository(Goal) private readonly goalRepository: Repository<Goal>,
    @InjectRepository(GoalProgress)
    private readonly goalProgressRepository: Repository<GoalProgress>,
    private readonly userService: UserService,
  ) {}

  async create(userId: string, createGoalDto: CreateGoalDto) {
    const { initialProgress, ...rest } = createGoalDto;
    const user = await this.userService.findOne(userId);
    const newGoal = this.goalRepository.create(rest);
    const newGoalProgress = this.goalProgressRepository.create(initialProgress);
    newGoalProgress.date = new Date().toISOString().substring(0, 10);
    newGoal.user = user;
    newGoal.progresses = [newGoalProgress];
    return this.goalRepository.save(newGoal);
  }

  findAll(userId: string) {
    return this.goalRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async findOne(id: string) {
    const goal = await this.goalRepository.findOne({
      where: {
        id,
      },
      relations: ['progresses'],
    });

    if (!goal) {
      throw new NotFoundException(`Goal with ID ${id} not found.`);
    }

    return goal;
  }

  async update(id: string, updateGoalDto: UpdateGoalDto) {
    const goal = await this.findOne(id);
    const mergedGoal = this.goalRepository.merge(goal, updateGoalDto);
    return this.goalRepository.save(mergedGoal);
  }

  async remove(id: string) {
    const goal = await this.findOne(id);
    await this.goalRepository.remove(goal);
  }

  async findOneProgress(id: string) {
    const goalProgress = await this.goalProgressRepository.findOneBy({
      id,
    });

    if (!goalProgress) {
      throw new NotFoundException(`Goal progress with ID ${id} not found.`);
    }

    return goalProgress;
  }

  async addProgress(
    goalId: string,
    createGoalProgressDto: CreateGoalProgressDto,
  ) {
    const existingProgress = await this.goalProgressRepository.findOne({
      where: {
        date: createGoalProgressDto.date,
        goal: {
          id: goalId,
        },
      },
    });
    if (existingProgress) {
      throw new ConflictException(
        `Progress for goal with ID ${goalId} was already created at the provided date`,
      );
    }
    const goal = await this.findOne(goalId);
    const newProgress = this.goalProgressRepository.create(
      createGoalProgressDto,
    );
    goal.progresses.push(newProgress);
    await this.goalRepository.save(goal);
  }

  async updateProgress(
    id: string,
    updateGoalProgressDto: UpdateGoalProgressDto,
  ) {
    const goalProgress = await this.findOneProgress(id);
    const mergedProgress = this.goalProgressRepository.merge(
      goalProgress,
      updateGoalProgressDto,
    );
    await this.goalProgressRepository.save(mergedProgress);
  }

  async removeProgress(id: string) {
    const goalProgress = await this.findOneProgress(id);
    await this.goalProgressRepository.remove(goalProgress);
  }
}
