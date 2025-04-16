import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReviewCommandRepository } from '../../../domain/ports/reviewCommandRepository';
import { Review } from '../../../domain/entities/review';
import { ReviewModel } from '../schemas/reviewSchema';
import { ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';

export class MongooseReviewCommandRepository implements ReviewCommandRepository {
  constructor(
    @InjectModel('reviews')
    private readonly model: Model<ReviewModel>,
  ) {}

  async create(review: Review): Promise<Review> {
    const existing = await this.model.findOne({
      userId: review.userId,
      movieId: review.movieId,
    });

    if (existing) {
      throw new ConflictException('You have already reviewed this movie');
    }

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


  async delete(reviewId: string, userId: string): Promise<boolean> {
    const found = await this.model.findById(reviewId).exec()
    if (!found) throw new NotFoundException('Review not found')

    if (found.userId !== userId) {
      throw new UnauthorizedException('Unauthorized to delete this review')
    }

    const result = await this.model.deleteOne({ _id: reviewId }).exec()
    return result.deletedCount > 0
  }


  async update(reviewId: string, updates: { rating?: number; comment?: string; userId: string }): Promise<Review> {
    const found = await this.model.findById(reviewId).exec();
    if (!found) throw new NotFoundException('Review not found');

    if (found.userId !== updates.userId) {
      throw new UnauthorizedException('Unauthorized to update this review');
    }

    if (updates.rating !== undefined) {
      found.rating = updates.rating;
    }

    if (updates.comment !== undefined) {
      found.comment = updates.comment;
    }

    const saved = await found.save();

    return new Review(
      saved.id,
      saved.userId,
      saved.movieId,
      saved.rating,
      saved.comment,
      saved.reviewDate,
    );
  }

}
