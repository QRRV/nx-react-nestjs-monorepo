import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Neo4jRecommendationRepository } from './infrastructure/neo4j/repositories/neo4jRecommendationRepository';
import { GetRecommendationsHandler } from './application/handlers/getRecommendationsHandler';

@Module({
  imports: [CqrsModule],
  providers: [
    GetRecommendationsHandler,
    {
      provide: 'RecommendationRepository',
      useClass: Neo4jRecommendationRepository,
    },
  ],
  exports: [GetRecommendationsHandler],
})
export class RecommendationGraphModule {}
