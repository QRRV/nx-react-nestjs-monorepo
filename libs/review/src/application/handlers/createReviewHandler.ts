import { CreateReviewCommand } from '../commands/createReviewCommand';
import { Review } from '../../domain/entities/review';
import { ReviewCommandRepository } from '../../domain/ports/reviewCommandRepository';
import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';

@Injectable()
@CommandHandler(CreateReviewCommand)
export class CreateReviewHandler implements ICommandHandler<CreateReviewCommand> {

  constructor(
    @Inject('ReviewCommandRepository')
    private readonly repo: ReviewCommandRepository
  ) {}

  async execute(command: CreateReviewCommand): Promise<Review> {
    const review = new Review(
      randomUUID(),
      command.userId,
      command.movieId,
      command.rating,
      command.comment ?? '',
      command.reviewDate
    );

    return this.repo.create(review);
  }
}
