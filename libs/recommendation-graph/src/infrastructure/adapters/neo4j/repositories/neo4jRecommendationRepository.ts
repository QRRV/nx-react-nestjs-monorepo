import { Inject } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j';
import * as neo4j from 'neo4j-driver';
import { RecommendationRepository } from '../../../../domain/ports/recommendationRepository';

export class Neo4jRecommendationRepository implements RecommendationRepository {
  constructor(@Inject(Neo4jService) private readonly neo4j: Neo4jService) {}

  async getRecommendations(
    userId: string,
    minRating: number,
    genre: string | null,
    limit: number
  ): Promise<any[]> {
    const params = {
      userId,
      minRating,
      genre,
      limit: neo4j.int(limit),
    };

    const query = `
      MATCH (me:User {id: $userId})-[:FRIEND]->(friend:User)-[r:REVIEWED]->(m:Movie)
      WHERE NOT (me)-[:REVIEWED]->(m)
        AND r.rating >= $minRating
        ${genre ? 'AND (m)-[:IN_GENRE]->(:Genre {name: $genre})' : ''}
      RETURN m.id AS movieId, avg(r.rating) AS avgRating, count(r) AS numFriendsRated
      ORDER BY numFriendsRated DESC, avgRating DESC
      LIMIT $limit
    `;

    const result = await this.neo4j.read(query, params);
    return result.records.map((row) => ({
      movieId: row.get('movieId'),
      avgRating: row.get('avgRating'),
      numFriendsRated: (row.get('numFriendsRated') as any).toNumber?.() ?? 0,
    }));
  }
}
