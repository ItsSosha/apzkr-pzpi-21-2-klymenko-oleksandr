import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GymService } from './gym.service';
import { CreateGymDto } from './dto/create-gym.dto';
import { UpdateGymDto } from './dto/update-gym.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { Admin } from 'src/auth/decorators/admin.decorator';

@ApiBearerAuth()
@ApiTags('gyms')
@UseGuards(AuthGuard, AdminGuard)
@Controller('gyms')
export class GymController {
  constructor(private readonly gymService: GymService) {}

  @Admin()
  @Post()
  create(@Body() createGymDto: CreateGymDto) {
    return this.gymService.create(createGymDto);
  }

  @Get()
  findAll() {
    return this.gymService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gymService.findOne(id);
  }

  @Admin()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGymDto: UpdateGymDto) {
    return this.gymService.update(id, updateGymDto);
  }

  @Admin()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gymService.remove(id);
  }
}
