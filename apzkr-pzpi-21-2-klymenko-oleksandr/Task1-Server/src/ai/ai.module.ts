import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { ConfigModule } from 'src/config';

@Module({
  imports: [ConfigModule],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}
