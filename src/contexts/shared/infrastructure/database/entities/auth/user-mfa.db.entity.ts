import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserDBEntity } from '../user/user.db.entity';

@Entity({ name: 'user_mfa' })
export class UserMFADBEntity {
  @Column({ primary: true, type: 'int', name: 'user_id' })
  userId: number;

  @OneToOne(() => UserDBEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserDBEntity;

  @Column({ type: 'text' })
  secret: string;

  @Column({ type: 'varchar', length: 32 })
  iv: string;

  @Column({ type: 'boolean', default: true, name: 'is_enabled' })
  isEnabled: boolean;
}
