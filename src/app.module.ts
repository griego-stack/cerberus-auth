import { Module } from '@nestjs/common';
import { AppConfigModule } from './contexts/shared/infrastructure';
import { DatabaseModule } from './contexts/shared/infrastructure/database/database.module';

@Module({
  imports: [AppConfigModule, DatabaseModule],
})
export class AppModule {}
