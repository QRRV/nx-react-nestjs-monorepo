export interface ReviewRelationRepository {
  createReviewRelation(userId: string, movieId: string, rating: number, reviewId: string): Promise<void>;
  deleteReviewRelation(userId: string, reviewId: string): Promise<void>;
}
