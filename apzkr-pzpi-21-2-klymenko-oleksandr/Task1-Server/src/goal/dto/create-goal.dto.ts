import { ApiProperty } from '@nestjs/swagger';
import { CreateGoalProgressDto } from './create-goal-progress.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GoalType } from '../enums/goal-type.enum';

export class CreateGoalDto {
  @ApiProperty({
    type: CreateGoalProgressDto,
  })
  @ValidateNested({ each: true })
  @Type(() => CreateGoalProgressDto)
  initialProgress: CreateGoalProgressDto;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({
    enum: GoalType,
    default: [GoalType.WEIGHT_LOSS, GoalType.WEIGHT_GAIN],
  })
  type: GoalType;

  @ApiProperty()
  targetValue: number;

  @ApiProperty({
    default: new Date().toISOString().substring(0, 10),
  })
  createdAt: string;

  @ApiProperty({ default: new Date().toISOString().substring(0, 10) })
  deadline: string;
}
