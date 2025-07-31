import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserDBEntity } from './user.db.entity';

@Entity('audit_log')
export class AuditLogDBEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true, name: 'user_id' })
  userId?: number;

  @ManyToOne(() => UserDBEntity, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: UserDBEntity;

  @Column({ type: 'varchar', length: 10, default: 'info', nullable: false })
  level: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'text', nullable: true })
  metadata?: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
