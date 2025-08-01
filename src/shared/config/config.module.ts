import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from './config.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [
    {
      provide: 'AppConfigProvider',
      useClass: AppConfigService,
    },
    AppConfigService,
    ConfigService,
  ],
  exports: ['AppConfigProvider', AppConfigService, ConfigService],
})
export class AppConfigModule {}
