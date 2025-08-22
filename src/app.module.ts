import { Module } from '@nestjs/common';
import { AppConfigModule, DatabaseModule } from './contexts/shared';

@Module({
  imports: [AppConfigModule, DatabaseModule],
})
export class AppModule {}
