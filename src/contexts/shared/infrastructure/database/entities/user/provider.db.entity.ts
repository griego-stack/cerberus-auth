import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserDBEntity } from './user.db.entity';

@Entity({ name: 'provider', orderBy: { id: 'ASC' } })
export class UserProviderDBEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15, unique: true })
  name: string;

  @OneToMany(() => UserDBEntity, (user) => user.provider)
  users: UserDBEntity[];
}
