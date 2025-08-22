import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserDBEntity } from '../user/user.db.entity';

@Entity('audit_log')
export class AuditLogDBEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserDBEntity, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: UserDBEntity;

  @Column({ type: 'varchar', length: 10, default: 'info', nullable: false })
  level: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'text', nullable: true })
  metadata?: string;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 6,
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
