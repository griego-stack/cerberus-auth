import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserProfileDBEntity } from './profile.db.entity';
import { UserProviderDBEntity } from './provider.db.entity';
import { UserRoleDBEntity } from './role.db.entity';
import { AuditLogDBEntity } from './audit-log.db.entity';

@Entity({ name: 'user' })
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

  @Column({ type: 'int', name: 'provider_id' })
  providerId: number;

  @ManyToOne(() => UserProviderDBEntity)
  @JoinColumn({ name: 'provider_id' })
  provider: UserProviderDBEntity;

  @Column({ type: 'int', name: 'role_id' })
  roleId: number;

  @ManyToOne(() => UserRoleDBEntity)
  @JoinColumn({ name: 'role_id' })
  role: UserRoleDBEntity;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;

  @Column({ type: 'boolean', default: false, name: 'is_email_verified' })
  isEmailVerified: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ type: 'timestamp', name: 'last_login_at', nullable: true })
  lastLoginAt?: Date;

  @OneToMany(() => AuditLogDBEntity, (audit) => audit.user)
  auditLogs: AuditLogDBEntity[];
}
