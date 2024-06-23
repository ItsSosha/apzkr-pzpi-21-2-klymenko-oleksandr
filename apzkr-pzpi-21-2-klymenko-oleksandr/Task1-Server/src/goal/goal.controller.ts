import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GoalService } from './goal.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { AuthGuard, UserId } from 'src/auth';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateGoalProgressDto } from './dto/create-goal-progress.dto';
import { UpdateGoalProgressDto } from './dto/update-goal-progress.dto';

@ApiBearerAuth()
@ApiTags('goals')
@UseGuards(AuthGuard)
@Controller('goals')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Post()
  create(@UserId() userId: string, @Body() createGoalDto: CreateGoalDto) {
    return this.goalService.create(userId, createGoalDto);
  }

  @Get()
  findAll(@UserId() userId: string) {
    return this.goalService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goalService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGoalDto: UpdateGoalDto) {
    return this.goalService.update(id, updateGoalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goalService.remove(id);
  }

  @Post(':goalId/progress')
  addProgress(
    @Param('goalId') goalId: string,
    @Body() createGoalProgressDto: CreateGoalProgressDto,
  ) {
    return this.goalService.addProgress(goalId, createGoalProgressDto);
  }

  @Patch(':goalId/progress/:id')
  updateProgress(
    @Param('id') id: string,
    @Body() updateGoalProgressDto: UpdateGoalProgressDto,
  ) {
    return this.goalService.updateProgress(id, updateGoalProgressDto);
  }

  @Delete(':goalId/progress/:id')
  removeProgress(@Param('id') id: string) {
    return this.goalService.removeProgress(id);
  }
}
