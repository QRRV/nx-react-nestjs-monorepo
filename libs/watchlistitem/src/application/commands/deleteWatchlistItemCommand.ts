export class DeleteWatchlistItemCommand {
  constructor(
    public readonly itemId: string,
    public readonly userId: string
  ) {}
}
