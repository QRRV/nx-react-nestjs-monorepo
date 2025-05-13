import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateMovieGraphHandler } from './application/handler/createMovieGraphHandler';
import { Neo4jMovieGraphCommandRepository } from './infrastructure/adapters/neo4j/repositories/Neo4jMovieGraphCommandRepository';

@Module({
  imports: [CqrsModule],
  providers: [
    CreateMovieGraphHandler,
    {
      provide: 'MovieGraphCommandRepository',
      useClass: Neo4jMovieGraphCommandRepository,
    },
  ],
  exports: [CreateMovieGraphHandler],
})
export class MovieGraphModule {}
