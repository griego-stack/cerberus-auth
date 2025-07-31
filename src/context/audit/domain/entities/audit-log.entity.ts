export type AuditLogLevel =
  | 'info'
  | 'warn'
  | 'error'
  | 'debug'
  | 'trace'
  | 'fatal'
  | 'critical'
  | 'alert';

export interface IAuditLog {
  id: number;
  userId?: number;
  level: AuditLogLevel;
  message: string;
  metadata?: Record<string, any>;
  createdAt?: Date;
}

export class AuditLogEntity {
  id: number;
  userId?: number;
  level: AuditLogLevel;
  message: string;
  _metadata?: string;
  createdAt?: Date;

  constructor(attrs: IAuditLog) {
    this.id = attrs.id;
    this.userId = attrs.userId;
    this.level = attrs.level;
    this.message = attrs.message;
    this._metadata = attrs.metadata
      ? JSON.stringify(attrs.metadata)
      : undefined;
    this.createdAt = attrs.createdAt || new Date();
  }

  get metadata(): Record<string, any> | undefined {
    return this._metadata
      ? (JSON.parse(this._metadata) as Record<string, any>)
      : undefined;
  }
}
