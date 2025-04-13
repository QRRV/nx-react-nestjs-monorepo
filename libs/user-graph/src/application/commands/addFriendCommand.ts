export class AddFriendCommand {
  constructor(
    public readonly userId: string,
    public readonly friendId: string
  ) {}
}
