export class CreateReviewRelationCommand {
  constructor(
    public readonly userId: string,
    public readonly movieId: string,
    public readonly rating: number,
    public readonly reviewId: string,
  ) {}
}
