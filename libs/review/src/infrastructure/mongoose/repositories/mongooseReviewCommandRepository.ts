import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReviewCommandRepository } from '../../../domain/ports/reviewCommandRepository';
import { Review } from '../../../domain/entities/review';
import { ReviewModel } from '../schemas/reviewSchema';

export class MongooseReviewCommandRepository implements ReviewCommandRepository {
  constructor(
    @InjectModel('reviews')
    private readonly model: Model<ReviewModel>,
  ) {}

  async create(review: Review): Promise<Review> {
    const created = new this.model(review);
    const saved = await created.save();
    return new Review(
      saved.id,
      saved.userId,
      saved.movieId,
      saved.rating,
      saved.comment,
      saved.reviewDate,
    );
  }

  async delete(reviewId: string): Promise<void> {
    await this.model.deleteOne({ _id: reviewId });
  }
}
