export class UpdateUserCommand {
  constructor(
    public readonly targetUserId: string, // ID in de URL
    public readonly requestingUserId: string, // ID uit JWT
    public readonly updates: {
      username?: string;
      password?: string;
      bio?: string;
    }
  ) {}
}
