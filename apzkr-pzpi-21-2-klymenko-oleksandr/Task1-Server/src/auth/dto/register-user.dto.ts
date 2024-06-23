import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class RegisterUserDto extends OmitType(CreateUserDto, ['isAdmin']) {}
