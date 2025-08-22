import { ConfigDatabase, EmailTransportConfig } from './config.types';

export const AppConfigProviderToken = Symbol('AppConfigProvider');

export interface AppConfigProvider {
  // APP

  appName: string;
  port: number;

  // API

  apiPrefix: string;

  // SECRETS

  cookieSecret?: string;

  // DATABASE

  mainDatabaseConfig: ConfigDatabase;

  // EMAIL
  emailTransport: string | EmailTransportConfig;
}
