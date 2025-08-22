import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserDBEntity } from '../user/user.db.entity';

@Entity({ name: 'confirmation_token' })
export class ConfirmationTokenDBEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserDBEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserDBEntity;

  @Column({ type: 'varchar', length: 50 })
  token: string;

  @Column({ type: 'datetime', name: 'expires_at' })
  expiresAt: Date;

  @Column({ type: 'boolean', default: false, name: 'is_used' })
  isUsed: boolean;
}
