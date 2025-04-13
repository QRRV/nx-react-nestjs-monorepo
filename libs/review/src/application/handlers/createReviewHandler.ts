import { CreateReviewCommand } from '../commands/createReviewCommand';
import { Review } from '../../domain/entities/review';
import { ReviewCommandRepository } from '../../domain/ports/reviewCommandRepository';
import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';
import { ReviewGraphWriteRepository } from '../../domain/ports/reviewGraphWriteRepository';

@Injectable()
@CommandHandler(CreateReviewCommand)
export class CreateReviewHandler implements ICommandHandler<CreateReviewCommand> {

  constructor(
    @Inject('ReviewCommandRepository')
    private readonly repo: ReviewCommandRepository,
    @Inject('ReviewGraphWriteRepository')
    private readonly graphRepo: ReviewGraphWriteRepository
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
    const created = await this.repo.create(review);

    await this.graphRepo.createReviewRelation(command.movieId, command.rating, created._id, command.token);

    return created;
  }
}
