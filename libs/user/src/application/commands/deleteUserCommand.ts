export class DeleteUserCommand {
  constructor(
    public readonly targetUserId: string,     // ID uit de URL
    public readonly requestingUserId: string  // ID uit de JWT (voor nu uit body)
  ) {}
}
