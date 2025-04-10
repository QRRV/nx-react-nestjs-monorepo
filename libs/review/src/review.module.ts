import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewModel, ReviewSchema } from './infrastructure/mongoose/schemas/reviewSchema';
import { MongooseReviewCommandRepository } from './infrastructure/mongoose/repositories/mongooseReviewCommandRepository';
import { CreateReviewHandler } from './application/handlers/createReviewHandler';
import { CqrsModule } from '@nestjs/cqrs';

const CommandHandlers = [CreateReviewHandler];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: 'reviews', schema: ReviewSchema },
    ]),
  ],
  providers: [
    ...CommandHandlers,
    {
      provide: 'ReviewCommandRepository',
      useClass: MongooseReviewCommandRepository,
    },
    CreateReviewHandler,
  ],
  exports: [...CommandHandlers],
})
export class ReviewModule {}
