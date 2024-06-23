import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  signUp(registerUserDto: RegisterUserDto) {
    return this.userService.create(registerUserDto);
  }
}
