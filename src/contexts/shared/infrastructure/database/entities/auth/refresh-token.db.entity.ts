import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserDBEntity } from '../user/user.db.entity';

@Entity({ name: 'refresh_token', orderBy: { id: 'ASC' } })
export class RefreshTokenDBEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserDBEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserDBEntity;

  @Column({ type: 'varchar', length: 50 })
  token: string;

  @Column({ type: 'datetime', name: 'expires_at' })
  expiresAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 6,
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @Column({ type: 'boolean', default: false })
  revoked: boolean;

  @ManyToOne(() => UserDBEntity)
  @JoinColumn({ name: 'user_device_id' })
  userDevice: UserDBEntity;
}
