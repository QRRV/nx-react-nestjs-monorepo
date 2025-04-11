export class User {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly email: string,
    public readonly password: string,
    public readonly bio: string
  ) {}

  toSafeObject() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      bio: this.bio
    };
  }
}
