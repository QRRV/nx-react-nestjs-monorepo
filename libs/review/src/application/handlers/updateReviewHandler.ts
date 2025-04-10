import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateReviewCommand } from '../commands/updateReviewCommand';
import { Review } from '../../domain/entities/review';
import { ReviewCommandRepository } from '../../domain/ports/reviewCommandRepository';
import { Inject } from '@nestjs/common';

@CommandHandler(UpdateReviewCommand)
export class UpdateReviewHandler implements ICommandHandler<UpdateReviewCommand> {
  constructor(
    @Inject('ReviewCommandRepository')
    private readonly repo: ReviewCommandRepository,
  ) {}

  async execute(command: UpdateReviewCommand): Promise<Review> {
    return this.repo.update(command.reviewId, {
      rating: command.rating,
      comment: command.comment,
      userId: command.userId,
    });
  }
}
