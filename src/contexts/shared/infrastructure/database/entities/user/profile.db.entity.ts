import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserDBEntity } from './user.db.entity';

@Entity({ name: 'user_profile' })
export class UserProfileDBEntity {
  @Column({ primary: true, type: 'int', name: 'user_id' })
  userId: number;

  @OneToOne(() => UserDBEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserDBEntity;

  @Column({ type: 'varchar', length: 50, nullable: true, name: 'first_name' })
  firstName?: string;

  @Column({ type: 'varchar', length: 50, nullable: true, name: 'last_name' })
  lastName?: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text', nullable: true, name: 'avatar_url' })
  avatarUrl?: string;
}
