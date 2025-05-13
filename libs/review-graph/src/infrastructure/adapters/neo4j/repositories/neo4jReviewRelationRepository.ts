import { ReviewRelationRepository } from '../../../../domain/ports/reviewRelationRepository';
import { Inject } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j';

export class Neo4jReviewRelationRepository implements ReviewRelationRepository {
  constructor(
    @Inject(Neo4jService)
    private readonly neo4j: Neo4jService
  ) {}

  async createReviewRelation(userId: string, movieId: string, rating: number, reviewId: string): Promise<void> {
    await this.neo4j.write(
      `
      MERGE (u:User {id: $userId})
      MERGE (m:Movie {id: $movieId})
      MERGE (u)-[r:REVIEWED]->(m)
      SET r.rating = $rating, r.reviewId = $reviewId
      `,
      { userId, movieId, rating, reviewId }
    );
  }

  async deleteReviewRelation(userId: string, reviewId: string): Promise<void> {
    await this.neo4j.write(
      `
    MATCH (u:User {id: $userId})-[r:REVIEWED]->(m:Movie)
    WHERE r.reviewId = $reviewId
    DELETE r
    `,
      { userId, reviewId }
    );
  }
}
