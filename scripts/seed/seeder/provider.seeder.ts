import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { UserProviderDBEntity } from '../../../src/contexts/shared/infrastructure/database/entities';

export default class ProviderSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(UserProviderDBEntity);

    await repo.insert([
      { name: 'email' },
      { name: 'google' },
      { name: 'github' },
    ]);
  }
}
