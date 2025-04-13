export class CreateMovieListItemRelationCommand {
  constructor(
    public readonly userId: string,
    public readonly movieId: string,
    public readonly itemId: string,
  ) {}
}
