export interface IUser {
  id: number;
  username: string;
  email: string;
  password?: string;
  providerId: number;
  roleId: number;
  isActive?: boolean;
  isEmailVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  lastLoginAt?: Date;
}

export class UserEntity {
  id: number;
  username: string;
  email: string;
  password?: string;
  providerId: number;
  roleId: number;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;

  constructor(user: IUser) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.providerId = user.providerId;
    this.roleId = user.roleId;
    this.isActive = user.isActive ?? true;
    this.isEmailVerified = user.isEmailVerified ?? false;
    this.createdAt = user.createdAt ?? new Date();
    this.updatedAt = user.updatedAt ?? new Date();
    this.lastLoginAt = user.lastLoginAt;
  }

  changePassword(newPassword: string): void {
    this.password = newPassword;
  }

  changeRole(newRoleId: number): void {
    this.roleId = newRoleId;
  }

  activate(): void {
    this.isActive = true;
  }

  deactivate(): void {
    this.isActive = false;
  }

  verifyEmail(): void {
    this.isEmailVerified = true;
  }

  updateLastLogin(): void {
    this.lastLoginAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      password: this.password,
      providerId: this.providerId,
      roleId: this.roleId,
      isActive: this.isActive,
      isEmailVerified: this.isEmailVerified,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      lastLoginAt: this.lastLoginAt,
    };
  }
}
