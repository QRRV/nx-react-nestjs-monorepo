import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteReviewCommand } from '../commands/deleteReviewCommand';
import { ReviewCommandRepository } from '../../domain/ports/reviewCommandRepository';
import { Inject, NotFoundException, } from '@nestjs/common';
import { ReviewGraphWriteRepository } from '../../domain/ports/reviewGraphWriteRepository';

@CommandHandler(DeleteReviewCommand)
export class DeleteReviewHandler implements ICommandHandler<DeleteReviewCommand> {
  constructor(
    @Inject('ReviewCommandRepository')
    private readonly repo: ReviewCommandRepository,
    @Inject('ReviewGraphWriteRepository')
    private readonly graphRepo: ReviewGraphWriteRepository
  ) {}

  async execute(command: DeleteReviewCommand): Promise<void> {
    const deleted = await this.repo.delete(command.reviewId, command.userId);
    if (!deleted) {
      throw new NotFoundException('Review not found or not allowed to delete');
    }

    await this.graphRepo.deleteReviewRelation(command.reviewId, command.token);
  }
}
