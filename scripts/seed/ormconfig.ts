import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { ConfigModule } from '@nestjs/config';
import InitSeeder from './seeder/init.seeder';

void ConfigModule.forRoot({
  envFilePath: '.env',
});

const options: DataSourceOptions & SeederOptions = {
  type:
    (process.env.DB_TYPE as 'mysql' | 'postgres' | 'sqlite' | 'mariadb') ||
    'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(String(process.env.DB_PORT)) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'cerberus_auth',
  synchronize:
    String(process.env.DB_SYNCRONIZE).toLowerCase() === 'true' ? true : false,
  entities: [__dirname + '/../../**/*.db.entity{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/../../**/_migrations/**/*{.ts,.js}'],
  seeds: [InitSeeder],
  timezone: process.env.DB_TIMEZONE || 'Z',
};

const source = new DataSource(options);

export default source;
