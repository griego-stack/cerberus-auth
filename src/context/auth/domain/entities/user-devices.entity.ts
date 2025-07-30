export interface IUserDevice {
  id: number;
  userId: number;
  ipAddress: string;
  userAgent: string;
  deviceId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserDeviceEntity {
  id: number;
  userId: number;
  ipAddress: string;
  userAgent: string;
  deviceId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(attrs: IUserDevice) {
    this.id = attrs.id;
    this.userId = attrs.userId;
    this.ipAddress = attrs.ipAddress;
    this.userAgent = attrs.userAgent;
    this.deviceId = attrs.deviceId;
    this.createdAt = attrs.createdAt ?? new Date();
    this.updatedAt = attrs.updatedAt ?? new Date();
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      ipAddress: this.ipAddress,
      userAgent: this.userAgent,
      deviceId: this.deviceId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
