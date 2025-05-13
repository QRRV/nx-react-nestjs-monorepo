import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewSchema } from './infrastructure/adapters/mongoose/schemas/reviewSchema';
import { MongooseReviewCommandRepository } from './infrastructure/adapters/mongoose/repositories/mongooseReviewCommandRepository';
import { MongooseReviewQueryRepository } from './infrastructure/adapters/mongoose/repositories/mongooseReviewQueryRepository';
import { CreateReviewHandler } from './application/handlers/createReviewHandler';
import { GetReviewsByMovieHandler } from './application/handlers/getReviewsByMovieHandler';
import { CqrsModule } from '@nestjs/cqrs';
import { UpdateReviewHandler } from './application/handlers/updateReviewHandler';
import { DeleteReviewHandler } from './application/handlers/deleteReviewHandler';
import { GetReviewsByUserHandler } from './application/handlers/getReviewsByUserHandler';
import { HttpReviewGraphWriteRepository } from './infrastructure/adapters/neo4j/httpReviewGraphWriteRepository';

const commandHandlers = [
  CreateReviewHandler,
  UpdateReviewHandler,
  DeleteReviewHandler
];

const queryHandlers = [
  GetReviewsByMovieHandler,
  GetReviewsByUserHandler
];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: 'reviews', schema: ReviewSchema },
    ]),
  ],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    {
      provide: 'ReviewCommandRepository',
      useClass: MongooseReviewCommandRepository,
    },
    {
      provide: 'ReviewQueryRepository',
      useClass: MongooseReviewQueryRepository,
    },
    {
      provide: 'ReviewGraphWriteRepository',
      useClass: HttpReviewGraphWriteRepository,
    },
  ],
  exports: [...commandHandlers, ...queryHandlers, MongooseModule],
})
export class ReviewModule {}
