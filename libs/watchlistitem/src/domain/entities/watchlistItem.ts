export class WatchlistItem {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly movieId: string,
    public readonly addedAt: Date,
    public readonly watched: boolean,
    public readonly priority: number
  ) {}
}
