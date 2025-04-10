export class CreateReviewCommand {
  constructor(
    public readonly userId: string,
    public readonly movieId: string,
    public readonly rating: number,
    public readonly comment?: string,
    public readonly reviewDate: Date = new Date(),
  ) {}
}
