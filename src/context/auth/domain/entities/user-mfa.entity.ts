export interface IUserMFA {
  userId: number;
  secret?: string;
  iv?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isEnabled?: boolean;
  isVerified?: boolean;
}

export class UserMFAEntity {
  userId: number;
  secret?: string;
  iv?: string;
  createdAt: Date;
  updatedAt: Date;
  isEnabled: boolean;
  isVerified: boolean;

  constructor(attrs: IUserMFA) {
    this.userId = attrs.userId;
    this.secret = attrs.secret;
    this.iv = attrs.iv;
    this.createdAt = attrs.createdAt ?? new Date();
    this.updatedAt = attrs.updatedAt ?? new Date();
    this.isEnabled = attrs.isEnabled ?? false;
    this.isVerified = attrs.isVerified ?? false;
  }

  markAsVerified(): void {
    this.isVerified = true;
  }

  markAsEnabled(secret: string, iv: string): void {
    this.isEnabled = true;
    this.secret = secret;
    this.iv = iv;
  }

  markAsDisabled(): void {
    this.isEnabled = false;
    this.secret = undefined;
    this.iv = undefined;
  }

  toJSON() {
    return {
      userId: this.userId,
      secret: this.secret,
      iv: this.iv,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isEnabled: this.isEnabled,
      isVerified: this.isVerified,
    };
  }
}
