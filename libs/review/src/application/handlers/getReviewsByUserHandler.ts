import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetReviewsByUserQuery } from '../queries/getReviewsByUserQuery';
import { Review } from '../../domain/entities/review';
import { ReviewQueryRepository } from '../../domain/ports/reviewQueryRepository';
import { Inject } from '@nestjs/common';

@QueryHandler(GetReviewsByUserQuery)
export class GetReviewsByUserHandler implements IQueryHandler<GetReviewsByUserQuery> {
  constructor(
    @Inject('ReviewQueryRepository')
    private readonly repo: ReviewQueryRepository,
  ) {}

  async execute(query: GetReviewsByUserQuery): Promise<Review[]> {
    return this.repo.findByUserId(query.userId);
  }
}
