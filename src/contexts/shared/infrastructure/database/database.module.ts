import { Module } from '@nestjs/common';
import { AppConfigModule } from '../config';
import { databaseProviders } from './database.provider';

@Module({
  imports: [AppConfigModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
