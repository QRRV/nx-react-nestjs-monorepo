export class DeleteMovieListItemRelationCommand {
  constructor(
    public readonly userId: string,
    public readonly itemId: string
  ) {}
}
