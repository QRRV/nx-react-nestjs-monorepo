import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateReviewRelationCommand } from '../commands/createReviewRelationCommand';
import { Inject } from '@nestjs/common';
import { ReviewRelationRepository } from '../../domain/ports/reviewRelationRepository';

@CommandHandler(CreateReviewRelationCommand)
export class CreateReviewRelationHandler
  implements ICommandHandler<CreateReviewRelationCommand>
{
  constructor(
    @Inject('ReviewRelationRepository')
    private readonly repo: ReviewRelationRepository
  ) {}

  async execute(command: CreateReviewRelationCommand): Promise<void> {
    await this.repo.createReviewRelation(command.userId, command.movieId, command.rating, command.reviewId);
  }
}
