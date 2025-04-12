import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Neo4jModule } from 'nest-neo4j';
import { CreateMovieListItemRelationHandler } from './application/handlers/createMovieListItemRelationHandler';
import { DeleteMovieListItemRelationHandler } from './application/handlers/deleteMovieListItemRelationHandler';
import { Neo4jMovieListItemRelationRepository } from './infrastructure/neo4j/repositories/neo4jMovieListItemRelationRepository';

const commandHandlers = [
  CreateMovieListItemRelationHandler,
  DeleteMovieListItemRelationHandler,
];

@Module({
  imports: [CqrsModule, Neo4jModule],
  providers: [
    ...commandHandlers,
    {
      provide: 'MovieListItemRelationRepository',
      useClass: Neo4jMovieListItemRelationRepository,
    },
  ],
  exports: [...commandHandlers],
})
export class MovieListItemGraphModule {}
