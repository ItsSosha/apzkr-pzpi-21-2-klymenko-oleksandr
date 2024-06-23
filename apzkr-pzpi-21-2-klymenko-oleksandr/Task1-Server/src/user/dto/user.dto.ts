import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsUUID,
  IsDateString,
} from 'class-validator';

export class UserDto {
  @ApiProperty({ description: "User's unique id" })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: "User's name" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "User's surname name" })
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiProperty({ description: "User's date of birth", format: 'date' })
  dateOfBirth: Date;

  @ApiProperty({ description: "User's email address" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  isAdmin?: boolean;
}
