import { ApiProperty } from '@nestjs/swagger';

export class CreateGoalProgressDto {
  @ApiProperty()
  currentValue: number;

  @ApiProperty({
    default: new Date().toISOString().substring(0, 10),
  })
  date: string;
}
