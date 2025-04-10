export class Review {
  constructor(
    public readonly _id: string,
    public readonly userId: string,
    public readonly movieId: string,
    public readonly rating: number,
    public readonly comment: string,
    public readonly reviewDate: Date,
  ) {
    if (rating < 1 || rating > 10) {
      throw new Error('Rating must be between 1 and 10');
    }
  }
}
