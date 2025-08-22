import { ConfigService } from '@nestjs/config';
import {
  AppConfigProvider,
  ConfigDatabase,
  EmailTransportConfig,
} from '../../domain';
import { Injectable } from '../framework';

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

  // API

  get apiPrefix(): string {
    return this.config.get<string>('API_PREFIX') || 'api';
  }

  // SECRETS

  get cookieSecret(): string | undefined {
    return this.config.get<string>('COOKIE_SECRET');
  }

  // DATABASE

  get mainDatabaseConfig(): ConfigDatabase {
    return {
      type:
        this.config.get<'mysql' | 'postgres' | 'sqlite' | 'mariadb'>(
          'DB_TYPE',
        ) || 'mysql',
      host: this.config.get<string>('DB_HOST') || 'localhost',
      port: this.config.get<number>('DB_PORT') || 3306,
      username: this.config.get<string>('DB_USERNAME') || 'root',
      password: this.config.get<string>('DB_PASSWORD') || '',
      database: this.config.get<string>('DB_NAME') || 'cerberus_auth',
      synchronize: this.config.get<boolean>('DB_SYNCHRONIZE') || false,
      timezone: this.config.get<string>('DB_TIMEZONE') || 'Z',
    };
  }

  get emailTransport(): string | EmailTransportConfig {
    return {
      host: this.config.get<string>('EMAIL_HOST') || 'smtp.example.com',
      port: this.config.get<number>('EMAIL_PORT') || 587,
      secure: this.config.get<boolean>('EMAIL_SECURE') || false,
      auth: {
        user: this.config.get<string>('EMAIL_AUTH_USER') || 'user@example.com',
        pass: this.config.get<string>('EMAIL_AUTH_PASS') || 'password',
      },
    };
  }
}
