export class CreateWatchlistItemCommand {
  constructor(
    public readonly userId: string,
    public readonly movieId: string,
    public readonly token: string,
    public readonly priority?: number
  ) {}
}
