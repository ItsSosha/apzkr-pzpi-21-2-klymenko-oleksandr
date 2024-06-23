import { ApiProperty } from '@nestjs/swagger';

export class StartTrainingDto {
  @ApiProperty()
  gymId: string;
}
