export interface IUserRole {
  id: number;
  name: string;
}

export class UserRoleEntity {
  id: number;
  name: string;

  constructor(provider: IUserRole) {
    this.id = provider.id;
    this.name = provider.name;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
