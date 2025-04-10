import { Review } from '../entities/review';

export interface ReviewCommandRepository {
  create(review: Review): Promise<Review>;
  delete(reviewId: string, userId: string): Promise<boolean>;
  update(reviewId: string, updates: { rating?: number; comment?: string; userId: string }): Promise<Review>;
}
