import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRecommendationsQuery } from '../queries/getRecommendationsQuery';
import { Inject } from '@nestjs/common';
import { RecommendationRepository } from '../../domain/ports/recommendationRepository';

@QueryHandler(GetRecommendationsQuery)
export class GetRecommendationsHandler implements IQueryHandler<GetRecommendationsQuery> {
  constructor(
    @Inject('RecommendationRepository')
    private readonly repo: RecommendationRepository
  ) {}

  async execute(query: GetRecommendationsQuery): Promise<any[]> {
    return this.repo.getRecommendations(
      query.userId,
      query.minRating ?? 6,
      query.genre ?? null,
      query.limit ?? 10
    );
  }
}
