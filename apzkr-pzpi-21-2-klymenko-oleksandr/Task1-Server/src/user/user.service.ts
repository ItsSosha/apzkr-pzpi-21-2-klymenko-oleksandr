import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { FirebaseApp, InjectFirebase } from 'src/firebase';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectFirebase() private readonly firebase: FirebaseApp,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  findAllAdmins() {
    return this.userRepository.find({
      where: {
        isAdmin: true,
      },
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const existingUser = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new ConflictException(
        `User with email ${createUserDto.email} already exists`,
      );
    }
    const userToCreate = this.userRepository.create(createUserDto);
    const user = await this.userRepository.save(userToCreate);
    await this.firebase.auth.createUser({
      email: createUserDto.email,
      password: createUserDto.password,
      uid: user.id,
    });
    if (user.isAdmin) {
      await this.firebase.auth.setCustomUserClaims(user.id, {
        admin: true,
      });
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const result = await this.userRepository.update(id, updateUserDto);

    if (!result.affected) {
      throw new BadRequestException(`User with ID ${id} not found`);
    }

    return this.userRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    await this.userRepository.remove(user);
  }

  async exists(id: string) {
    return this.userRepository.existsBy({
      id,
    });
  }
}
