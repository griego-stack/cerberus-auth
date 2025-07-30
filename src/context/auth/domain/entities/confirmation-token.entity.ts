export interface IConfirmationUserToken {
  id: number;
  userId: number;
  token: string;
  expiresAt: Date;
  createdAt?: Date;
  isUsed?: boolean;
}

export class ConfirmationUserTokenEntity {
  id: number;
  userId: number;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  isUsed?: boolean;

  constructor(attrs: IConfirmationUserToken) {
    this.id = attrs.id;
    this.userId = attrs.userId;
    this.token = attrs.token;
    this.expiresAt = attrs.expiresAt;
    this.createdAt = attrs.createdAt ?? new Date();
    this.isUsed = attrs.isUsed ?? false;
  }

  markAsUsed(): void {
    this.isUsed = true;
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
      isUsed: this.isUsed,
    };
  }
}
