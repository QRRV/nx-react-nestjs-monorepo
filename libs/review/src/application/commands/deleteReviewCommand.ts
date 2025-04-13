export class DeleteReviewCommand {
  constructor(
    public readonly reviewId: string,
    public readonly userId: string,
    public readonly token: string
  ) {}
}
