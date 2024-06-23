import { Module } from '@nestjs/common';
import { ConfigService, configService } from './config.service';

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: configService,
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
