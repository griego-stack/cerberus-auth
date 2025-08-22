export interface ConfigDatabase {
  type: 'mysql' | 'postgres' | 'sqlite' | 'mariadb';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize?: boolean;
  timezone?: string;
}

export interface EmailTransportConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}
