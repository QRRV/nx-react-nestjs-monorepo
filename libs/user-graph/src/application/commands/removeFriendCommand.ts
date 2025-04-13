export class RemoveFriendCommand {
  constructor(
    public readonly userId: string,
    public readonly friendId: string
  ) {}
}
