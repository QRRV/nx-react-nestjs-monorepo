import { Review } from '../entities/review';

export interface ReviewCommandRepository {
  create(review: Review): Promise<Review>;
  delete(reviewId: string): Promise<void>;
}
