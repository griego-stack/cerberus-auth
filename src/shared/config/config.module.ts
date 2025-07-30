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
  ],
  exports: ['AppConfigProvider'],
})
export class AppConfigModule {}
