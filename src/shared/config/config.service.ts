import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfigProvider } from './config.provider';

@Injectable()
export class AppConfigService implements AppConfigProvider {
  constructor(private readonly config: ConfigService) {}

  //   APP

  get appName(): string {
    return this.config.get<string>('APP_NAME') || 'Cerberus Auth';
  }

  get port(): number {
    return this.config.get<number>('APP_PORT') || 8000;
  }

  get isInProduction(): boolean {
    return this.config.get<boolean>('IS_IN_PRODUCTION') || false;
  }
}
