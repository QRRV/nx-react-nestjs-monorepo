import { MovieListItemRelationRepository } from '../../../../domain/ports/movieListItemRelationRepository';
import { Inject } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j';

export class Neo4jMovieListItemRelationRepository implements MovieListItemRelationRepository {
  constructor(
    @Inject(Neo4jService)
    private readonly neo4j: Neo4jService
  ) {}

  async createMovieListItemRelation(userId: string, movieId: string, itemId: string): Promise<void> {
    await this.neo4j.write(
      `
      MERGE (u:User {id: $userId})
      MERGE (m:Movie {id: $movieId})
      MERGE (u)-[r:ADDED_TO_LIST]->(m)
      SET r.itemId = $itemId
      `,
      { userId, movieId, itemId }
    );
  }

  async deleteMovieListItemRelation(userId: string, itemId: string): Promise<void> {
    await this.neo4j.write(
      `
    MATCH (u:User {id: $userId})-[r:ADDED_TO_LIST]->(m:Movie)
    WHERE r.itemId = $itemId
    DELETE r
    `,
      { userId, itemId }
    );
  }
}
