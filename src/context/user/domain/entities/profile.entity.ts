export interface IUserProfile {
  userId: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  avatarUrl?: string;
}

export class UserProfileEntity {
  userId: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  avatarUrl?: string;

  constructor(attrs: IUserProfile) {
    this.userId = attrs.userId;
    this.firstName = attrs.firstName;
    this.lastName = attrs.lastName;
    this.email = attrs.email;
    this.avatarUrl = attrs.avatarUrl;
  }

  toJSON() {
    return {
      userId: this.userId,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      avatarUrl: this.avatarUrl,
    };
  }
}
