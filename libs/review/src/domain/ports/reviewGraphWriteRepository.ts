export interface ReviewGraphWriteRepository {
  createReviewRelation(movieId: string, rating: number, reviewId: string, token: string): Promise<void>;
  deleteReviewRelation(reviewId: string, token: string): Promise<void>;
}
