import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { UserRoleDBEntity } from '../../../src/contexts/shared/infrastructure/database/entities';

export default class RoleSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(UserRoleDBEntity);

    await repo.insert([
      { name: 'user' },
      { name: 'admin' },
      { name: 'super_admin' },
      { name: 'staff' },
    ]);
  }
}
