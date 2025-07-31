import { DataSource } from 'typeorm';
import { AppConfigProvider } from '../config/config.provider';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: ['AppConfigProvider'],
    useFactory: async (config: AppConfigProvider) => {
      const dbConfig = config.mainDatabaseConfig;
      const dataSource = new DataSource({
        ...dbConfig,
        entities: [__dirname + '/../../**/*.db.entity{.ts,.js}'],
        migrations: [__dirname + '/../../migrations/**/*{.ts,.js}'],
      });

      return dataSource.initialize();
    },
  },
];
