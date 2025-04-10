export class Review {
  constructor(
    public readonly _id: string,
    public readonly userId: string,
    public readonly movieId: string,
    public readonly rating: number,
    public readonly comment: string,
    public readonly reviewDate: Date,
  ) {}
}
