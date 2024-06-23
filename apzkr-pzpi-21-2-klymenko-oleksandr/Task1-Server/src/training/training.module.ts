import { Module } from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from './entities';
import { UserModule } from 'src/user';
import { AiModule } from 'src/ai/ai.module';
import { GymModule } from 'src/gym/gym.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Training]),
    UserModule,
    AiModule,
    GymModule,
  ],
  controllers: [TrainingController],
  providers: [TrainingService],
  exports: [TrainingService],
})
export class TrainingModule {}
