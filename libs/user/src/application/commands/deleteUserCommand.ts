export class DeleteUserCommand {
  constructor(
    public readonly targetUserId: string,
    public readonly requestingUserId: string
  ) {}
}
