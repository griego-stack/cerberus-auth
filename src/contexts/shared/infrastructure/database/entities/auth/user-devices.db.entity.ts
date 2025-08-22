import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RefreshTokenDBEntity } from './refresh-token.db.entity';

@Entity({ name: 'user_device' })
export class UserDeviceDBEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => RefreshTokenDBEntity, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshTokenDBEntity[];

  @Column({ type: 'text', name: 'device_info' })
  deviceInfo: string;

  @Column({ type: 'text', name: 'ip_address' })
  ipAddress: string;

  @Column({ type: 'boolean', default: false })
  trusted: boolean;

  @Column({ type: 'datetime', name: 'last_used_at' })
  lastUsedAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 6,
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
