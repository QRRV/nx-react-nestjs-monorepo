export class GetRecommendationsQuery {
  constructor(
    public readonly userId: string,
    public readonly minRating?: number,
    public readonly genre?: string,
    public readonly limit?: number
  ) {}
}
