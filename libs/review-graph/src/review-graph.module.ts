import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Neo4jModule } from 'nest-neo4j';

import { CreateReviewRelationHandler } from './application/handlers/createReviewRelationHandler';
import { Neo4jReviewRelationRepository } from './infrastructure/neo4j/repositories/neo4jReviewRelationRepository';
import { DeleteReviewRelationHandler } from './application/handlers/deleteReviewRelationHandler';

const commandHandlers = [
  CreateReviewRelationHandler,
  DeleteReviewRelationHandler
];

@Module({
  imports: [
    CqrsModule,
    Neo4jModule,
  ],
  providers: [
    ...commandHandlers,
    {
      provide: 'ReviewRelationRepository',
      useClass: Neo4jReviewRelationRepository,
    },
  ],
  exports: [...commandHandlers],
})
export class ReviewGraphModule {}
