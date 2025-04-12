export interface ReviewRelationRepository {
  createReviewRelation(userId: string, movieId: string, rating: number): Promise<void>;
  deleteReviewRelation(userId: string, movieId: string): Promise<void>;
}
