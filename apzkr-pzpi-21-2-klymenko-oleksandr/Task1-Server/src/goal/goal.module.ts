import { Module } from '@nestjs/common';
import { GoalService } from './goal.service';
import { GoalController } from './goal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Goal } from './entities/goal.entity';
import { GoalProgress } from './entities/goal-progress.entity';
import { UserModule } from 'src/user';

@Module({
  imports: [TypeOrmModule.forFeature([Goal, GoalProgress]), UserModule],
  controllers: [GoalController],
  providers: [GoalService],
})
export class GoalModule {}
