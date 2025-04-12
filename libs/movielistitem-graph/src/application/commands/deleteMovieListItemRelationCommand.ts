export class DeleteMovieListItemRelationCommand {
  constructor(
    public readonly userId: string,
    public readonly movieId: string
  ) {}
}
