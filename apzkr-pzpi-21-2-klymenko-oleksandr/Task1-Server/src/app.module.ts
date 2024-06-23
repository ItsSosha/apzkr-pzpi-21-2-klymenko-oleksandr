import { Module } from '@nestjs/common';
import { FirebaseModule } from './firebase';
import { AuthModule } from './auth';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config';
import { GymModule } from './gym/gym.module';
import { TrainingModule } from './training/training.module';
import { MeasurementModule } from './measurement/measurement.module';
import { GoalModule } from './goal/goal.module';
import { AiModule } from './ai/ai.module';
import { ArticleModule } from './article/article.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const serviceAccount = require('../serviceAccount.json');

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    FirebaseModule.forRoot({
      credential: serviceAccount,
    }),
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    GymModule,
    TrainingModule,
    MeasurementModule,
    GoalModule,
    AiModule,
    ArticleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
