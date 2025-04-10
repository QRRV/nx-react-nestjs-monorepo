import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewSchema } from './infrastructure/mongoose/schemas/reviewSchema';
import { MongooseReviewCommandRepository } from './infrastructure/mongoose/repositories/mongooseReviewCommandRepository';
import { MongooseReviewQueryRepository } from './infrastructure/mongoose/repositories/mongooseReviewQueryRepository';
import { CreateReviewHandler } from './application/handlers/createReviewHandler';
import { GetReviewsByMovieHandler } from './application/handlers/getReviewsByMovieHandler';
import { CqrsModule } from '@nestjs/cqrs';
import { UpdateReviewHandler } from './application/handlers/updateReviewHandler';

const commandHandlers = [CreateReviewHandler, UpdateReviewHandler];
const queryHandlers = [GetReviewsByMovieHandler];

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
  ],
  exports: [...commandHandlers, ...queryHandlers],
})
export class ReviewModule {}
