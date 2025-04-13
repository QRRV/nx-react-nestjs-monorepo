export class DeleteReviewRelationCommand {
  constructor(
    public readonly userId: string,
    public readonly reviewId: string
  ) {}
}
