import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { Admin } from 'src/auth/decorators/admin.decorator';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(AuthGuard, AdminGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Admin()
  @Get()
  async geAllProfiles(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @Admin()
  @Get("admins")
  async getAllAdmins(): Promise<UserDto[]> {
    return this.userService.findAllAdmins();
  }


  @Get(':id')
  async getProfile(@Param('id') id: string): Promise<UserDto> {
    return this.userService.findOne(id);
  }

  @Admin()
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
