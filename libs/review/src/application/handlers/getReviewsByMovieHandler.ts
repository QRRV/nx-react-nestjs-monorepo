import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetReviewsByMovieQuery } from '../queries/getReviewsByMovieQuery';
import { Review } from '../../domain/entities/review';
import { ReviewQueryRepository } from '../../domain/ports/reviewQueryRepository';
import { Inject } from '@nestjs/common';

@QueryHandler(GetReviewsByMovieQuery)
export class GetReviewsByMovieHandler implements IQueryHandler<GetReviewsByMovieQuery> {
  constructor(
    @Inject('ReviewQueryRepository')
    private readonly repo: ReviewQueryRepository,
  ) {}

  async execute(query: GetReviewsByMovieQuery): Promise<Review[]> {
    return this.repo.findByMovieId(query.movieId);
  }
}
