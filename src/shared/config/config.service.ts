import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfigProvider, ConfigDatabase } from './config.provider';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

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

  //  DATABASE

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
      syncronize: this.config.get<boolean>('DB_SYNCRONIZE') || false,
    };
  }

  //  EMAIL

  get emailConfigTransport(): SMTPTransport | SMTPTransport.Options | string {
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
