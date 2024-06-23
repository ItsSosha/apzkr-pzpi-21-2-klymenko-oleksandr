import { PartialType } from '@nestjs/swagger';
import { CreateGoalProgressDto } from './create-goal-progress.dto';

export class UpdateGoalProgressDto extends PartialType(CreateGoalProgressDto) {}
