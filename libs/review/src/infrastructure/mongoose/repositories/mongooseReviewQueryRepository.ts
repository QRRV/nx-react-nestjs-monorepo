import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReviewQueryRepository } from '../../../domain/ports/reviewQueryRepository';
import { Review } from '../../../domain/entities/review';
import { ReviewModel } from '../schemas/reviewSchema';

export class MongooseReviewQueryRepository implements ReviewQueryRepository {
  constructor(
    @InjectModel('reviews')
    private readonly model: Model<ReviewModel>,
  ) {}

  async findByMovieId(movieId: string): Promise<Review[]> {
    const results = await this.model.find({ movieId }).exec();
    return results.map(
      (doc) =>
        new Review(
          doc.id,
          doc.userId,
          doc.movieId,
          doc.rating,
          doc.comment,
          doc.reviewDate,
        ),
    );
  }

  async findByUserId(userId: string): Promise<Review[]> {
    const results = await this.model.find({ userId }).exec();
    return results.map(
      (doc) =>
        new Review(
          doc.id,
          doc.userId,
          doc.movieId,
          doc.rating,
          doc.comment,
          doc.reviewDate,
        ),
    );
  }

}
