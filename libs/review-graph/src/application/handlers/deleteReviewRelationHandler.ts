import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteReviewRelationCommand } from '../commands/deleteReviewRelationCommand';
import { Inject } from '@nestjs/common';
import { ReviewRelationRepository } from '../../domain/ports/reviewRelationRepository';

@CommandHandler(DeleteReviewRelationCommand)
export class DeleteReviewRelationHandler
  implements ICommandHandler<DeleteReviewRelationCommand>
{
  constructor(
    @Inject('ReviewRelationRepository')
    private readonly repo: ReviewRelationRepository
  ) {}

  async execute(command: DeleteReviewRelationCommand): Promise<void> {
    await this.repo.deleteReviewRelation(command.userId, command.reviewId);
  }
}
