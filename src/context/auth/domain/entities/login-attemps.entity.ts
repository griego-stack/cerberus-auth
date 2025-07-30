export interface ILoginUserAttempts {
  id: number;
  userId?: number;
  email?: string;
  ipAddress: string;
  deviceInfo: string;
  success?: boolean;
  createdAt?: Date;
}

export class LoginUserAttempsEntity {
  id: number;
  userId?: number;
  email?: string;
  ipAddress: string;
  deviceInfo: string;
  success: boolean;
  createdAt: Date;

  constructor(attrs: ILoginUserAttempts) {
    this.id = attrs.id;
    this.userId = attrs.userId;
    this.email = attrs.email;
    this.ipAddress = attrs.ipAddress;
    this.deviceInfo = attrs.deviceInfo;
    this.success = attrs.success ?? false;
    this.createdAt = attrs.createdAt ?? new Date();
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      email: this.email,
      ipAddress: this.ipAddress,
      deviceInfo: this.deviceInfo,
      success: this.success,
      createdAt: this.createdAt.toISOString(),
    };
  }
}
