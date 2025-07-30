export interface ConfigDatabase {
  type: 'mysql' | 'postgres' | 'sqlite' | 'mariadb';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  syncronize?: boolean;
}

export interface AppConfigProvider {
  // APP
  appName: string;
  port: number;

  // DATABASE

  mainDatabaseConfig: ConfigDatabase;
}
