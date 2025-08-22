import chalk from 'chalk';
import { DataSource } from 'typeorm';
import { runSeeder } from 'typeorm-extension';
import { ConfigModule } from '@nestjs/config';
import ProviderSeeder from './seeder/provider.seeder';
import RoleSeeder from './seeder/role.seeder';

void ConfigModule.forRoot({
  envFilePath: '.env',
});

const dataSource = new DataSource({
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
  timezone: process.env.DB_TIMEZONE || 'Z',
});

async function main() {
  console.log(chalk.cyan('🚀 Connecting to database...'));
  const ds = await dataSource.initialize();

  if (ds.isInitialized) {
    console.log(chalk.green('🟢 Database connected.'));
  } else {
    console.log(chalk.red('🔴 Failed to connect to the database.'));
    return;
  }

  try {
    console.log(chalk.blue('🔄 Running ProviderSeeder...'));
    await runSeeder(ds, ProviderSeeder);
    console.log(chalk.green('✅ ProviderSeeder completed.'));

    console.log(chalk.blue('🔄 Running RoleSeeder...'));
    await runSeeder(ds, RoleSeeder);
    console.log(chalk.green('✅ RoleSeeder completed.'));
  } catch (error) {
    console.error(chalk.red('❌ Seeder failed:'), error);
  } finally {
    await ds.destroy();
    console.log(chalk.gray('🧹 DataSource destroyed. Seed process finished.'));
  }
}

void main();
