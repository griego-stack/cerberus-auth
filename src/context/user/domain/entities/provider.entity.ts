export interface IUserProvider {
  id: number;
  name: string;
}

export class UserProviderEntity {
  id: number;
  name: string;

  constructor(provider: IUserProvider) {
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
