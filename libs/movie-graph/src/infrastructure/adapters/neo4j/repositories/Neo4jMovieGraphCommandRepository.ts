import { Inject } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j';
import { MovieGraphCommandRepository } from '../../../../domain/ports/movieGraphCommandRepository';

export class Neo4jMovieGraphCommandRepository implements MovieGraphCommandRepository {
  constructor(@Inject(Neo4jService) private readonly neo4j: Neo4jService) {}

  async createMovieWithGenres(id: string, title: string, genres: string[]): Promise<void> {
    await this.neo4j.write(
      `
      MERGE (m:Movie {id: $id})
      SET m.title = $title
      WITH m
      UNWIND $genres AS genreName
      MERGE (g:Genre {name: genreName})
      MERGE (m)-[:IN_GENRE]->(g)
      `,
      { id, title, genres }
    );
  }
}
