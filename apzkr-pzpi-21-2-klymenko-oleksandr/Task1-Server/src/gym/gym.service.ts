import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGymDto } from './dto/create-gym.dto';
import { UpdateGymDto } from './dto/update-gym.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gym } from './entities/gym.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GymService {
  constructor(
    @InjectRepository(Gym) private readonly gymRepository: Repository<Gym>,
  ) {}

  create(createGymDto: CreateGymDto) {
    const gym = this.gymRepository.create(createGymDto);
    return this.gymRepository.save(gym);
  }

  findAll() {
    return this.gymRepository.find();
  }

  async findOne(id: string) {
    const gym = await this.gymRepository.findOneBy({ id });
    if (!gym) {
      throw new NotFoundException(`No gym with ID ${id}`);
    }
    return gym;
  }

  async update(id: string, updateGymDto: UpdateGymDto) {
    const gym = await this.findOne(id);
    const mergedGym = this.gymRepository.merge(gym, updateGymDto);
    return this.gymRepository.save(mergedGym);
  }

  async remove(id: string) {
    const gym = await this.findOne(id);
    await this.gymRepository.remove(gym);
  }
}
