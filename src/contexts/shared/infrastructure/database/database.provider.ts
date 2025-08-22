import { DataSource } from 'typeorm';
import { AppConfigProvider, AppConfigProviderToken } from '../../domain';

export const DataSourceToken = Symbol('DataSourceToken');

export const databaseProviders = [
  {
    provide: DataSourceToken,
    inject: [AppConfigProviderToken],
    useFactory: async (config: AppConfigProvider) => {
      const dbConfig = config.mainDatabaseConfig;
      const dataSource = new DataSource({
        ...dbConfig,
        entities: [__dirname + '/../../**/*.db.entity.{ts,js}'],
        migrations: [__dirname + '/../../migrations/**/*.{ts,js}'],
      });

      return dataSource.initialize();
    },
  },
];
