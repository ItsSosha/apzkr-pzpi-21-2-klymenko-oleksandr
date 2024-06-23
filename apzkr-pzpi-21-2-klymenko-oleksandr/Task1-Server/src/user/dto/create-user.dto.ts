import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { UserDto } from './user.dto';

export class CreateUserDto extends OmitType(UserDto, ['id']) {
  @ApiProperty({ description: "User's password" })
  @IsString()
  @MinLength(6)
  password: string;
}
