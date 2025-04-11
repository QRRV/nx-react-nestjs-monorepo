export class UpdateWatchlistItemCommand {
  constructor(
    public readonly reviewId: string,
    public readonly userId: string,
    public readonly watched?: boolean,
    public readonly priority?: number
  ) {}
}
