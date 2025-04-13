export interface RecommendationRepository {
  getRecommendations(userId: string, minRating: number, genre: string | null, limit: number): Promise<any[]>;
}
