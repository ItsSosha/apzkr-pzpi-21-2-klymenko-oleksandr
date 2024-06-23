import { ApiProperty } from '@nestjs/swagger';

export class CreateMeasurementDto {
  @ApiProperty()
  heartRate: number;

  @ApiProperty()
  temperature: number;

  @ApiProperty()
  date: Date;
}
