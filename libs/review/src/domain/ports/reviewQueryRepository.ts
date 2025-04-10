import { Review } from '../entities/review';

export interface ReviewQueryRepository {
  findByMovieId(movieId: string): Promise<Review[]>;
}
