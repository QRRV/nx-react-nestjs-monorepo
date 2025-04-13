export class UpdateUserCommand {
  constructor(
    public readonly targetUserId: string,
    public readonly requestingUserId: string,
    public readonly updates: {
      username?: string;
      password?: string;
      bio?: string;
    }
  ) {}
}
