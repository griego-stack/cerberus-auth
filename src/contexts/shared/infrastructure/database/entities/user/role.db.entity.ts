import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserDBEntity } from './user.db.entity';

@Entity({ name: 'role' })
export class UserRoleDBEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  name: string;

  @OneToMany(() => UserDBEntity, (user) => user.role)
  users: UserDBEntity[];
}
