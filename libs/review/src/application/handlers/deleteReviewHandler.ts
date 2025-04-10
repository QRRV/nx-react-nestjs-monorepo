import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteReviewCommand } from '../commands/deleteReviewCommand';
import { ReviewCommandRepository } from '../../domain/ports/reviewCommandRepository';
import { Inject, NotFoundException, } from '@nestjs/common';

@CommandHandler(DeleteReviewCommand)
export class DeleteReviewHandler implements ICommandHandler<DeleteReviewCommand> {
  constructor(
    @Inject('ReviewCommandRepository')
    private readonly repo: ReviewCommandRepository,
  ) {}

  async execute(command: DeleteReviewCommand): Promise<void> {
    const deleted = await this.repo.delete(command.reviewId, command.userId);
    if (!deleted) {
      throw new NotFoundException('Review not found or not allowed to delete');
    }
  }
}
