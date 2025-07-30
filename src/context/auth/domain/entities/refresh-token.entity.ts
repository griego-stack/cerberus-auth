export interface IRefreshToken {
  id: number;
  userId: number;
  token: string;
  expiresAt: Date;
  createdAt?: Date;
  deviceInfo: string;
  ipAddress: string;
  isRevoked?: boolean;
}

export class RefreshUserTokenEntity {
  id: number;
  userId: number;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  deviceInfo: string;
  ipAddress: string;
  isRevoked: boolean;

  constructor(attrs: IRefreshToken) {
    this.id = attrs.id;
    this.userId = attrs.userId;
    this.token = attrs.token;
    this.expiresAt = attrs.expiresAt;
    this.createdAt = attrs.createdAt ?? new Date();
    this.deviceInfo = attrs.deviceInfo;
    this.ipAddress = attrs.ipAddress;
    this.isRevoked = attrs.isRevoked ?? false;
  }

  markAsRevoked(): void {
    this.isRevoked = true;
  }

  isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      token: this.token,
      expiresAt: this.expiresAt.toISOString(),
      createdAt: this.createdAt.toISOString(),
      deviceInfo: this.deviceInfo,
      ipAddress: this.ipAddress,
      isRevoked: this.isRevoked,
    };
  }
}
