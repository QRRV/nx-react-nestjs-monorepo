import { ReviewRelationRepository } from '../../../domain/ports/reviewRelationRepository';
import { Inject } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j';

export class Neo4jReviewRelationRepository implements ReviewRelationRepository {
  constructor(
    @Inject(Neo4jService)
    private readonly neo4j: Neo4jService
  ) {}

  async createReviewRelation(userId: string, movieId: string, rating: number): Promise<void> {
    await this.neo4j.write(
      `
      MERGE (u:User {id: $userId})
      MERGE (m:Movie {id: $movieId})
      MERGE (u)-[r:REVIEWED]->(m)
      SET r.rating = $rating
      `,
      { userId, movieId, rating }
    );
  }

  async deleteReviewRelation(userId: string, movieId: string): Promise<void> {
    await this.neo4j.write(
      `
      MATCH (u:User {id: $userId})-[r:REVIEWED]->(m:Movie {id: $movieId})
      DELETE r
      `,
      { userId, movieId }
    );
  }
}
