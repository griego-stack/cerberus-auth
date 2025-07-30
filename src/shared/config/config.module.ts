import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './config.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [
    {
      provide: 'AppConfigProvider',
      useClass: AppConfigService,
    },
    AppConfigService,
  ],
  exports: ['AppConfigProvider', AppConfigService],
})
export class AppConfigModule {}
