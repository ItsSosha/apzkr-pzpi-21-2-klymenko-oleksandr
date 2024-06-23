import { ApiProperty } from '@nestjs/swagger';

export class CreateGymDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;
}
