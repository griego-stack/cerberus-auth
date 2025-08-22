import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserProfileDBEntity } from './profile.db.entity';
import { UserProviderDBEntity } from './provider.db.entity';
import { UserRoleDBEntity } from './role.db.entity';
import { AuditLogDBEntity } from '../audit/audit-log.db.entity';
import { ConfirmationTokenDBEntity } from '../auth/confirmation-token.db.entity';
import { UserMFADBEntity } from '../auth/user-mfa.db.entity';
import { RefreshTokenDBEntity } from '../auth/refresh-token.db.entity';

@Entity({ name: 'user', orderBy: { id: 'ASC' } })
export class UserDBEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserProfileDBEntity, { cascade: true })
  @JoinColumn({ name: 'id', referencedColumnName: 'userId' })
  profile: UserProfileDBEntity;

  @Column({ type: 'varchar', length: 50, unique: true })
  username: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text', nullable: true })
  password?: string;

  @ManyToOne(() => UserProviderDBEntity)
  @JoinColumn({ name: 'provider_id' })
  provider: UserProviderDBEntity;

  @ManyToOne(() => UserRoleDBEntity)
  @JoinColumn({ name: 'role_id' })
  role: UserRoleDBEntity;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;

  @Column({ type: 'boolean', default: false, name: 'is_email_verified' })
  isEmailVerified: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 6,
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 6,
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @Column({ type: 'datetime', name: 'last_login_at', nullable: true })
  lastLoginAt?: Date;

  @OneToMany(() => AuditLogDBEntity, (audit) => audit.user)
  auditLogs: AuditLogDBEntity[];

  @OneToMany(
    () => ConfirmationTokenDBEntity,
    (confirmationToken) => confirmationToken.user,
  )
  confirmationTokens: ConfirmationTokenDBEntity[];

  @OneToMany(() => RefreshTokenDBEntity, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshTokenDBEntity[];

  @OneToOne(() => UserMFADBEntity, { cascade: true })
  @JoinColumn({ name: 'user_mfa', referencedColumnName: 'userId' })
  userMFA: UserProfileDBEntity;
}
