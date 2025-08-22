import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from './config.service';
import { AppConfigProviderToken } from '../../domain';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [
    {
      provide: AppConfigProviderToken,
      useClass: AppConfigService,
    },
    AppConfigService,
    ConfigService,
  ],
  exports: [AppConfigProviderToken, AppConfigService, ConfigService],
})
export class AppConfigModule {}
