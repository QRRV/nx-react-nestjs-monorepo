import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CreateReviewController } from './review/controllers/createReviewController';
import { CqrsModule } from '@nestjs/cqrs';
import { GetReviewsByMovieController } from './review/controllers/getReviewsByMovieController';
import { ReviewModule } from '@moviebuddy/review';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/moviebuddy'),
    CqrsModule,
    ReviewModule,
  ],
  controllers: [
    CreateReviewController,
    GetReviewsByMovieController,
  ],
})
export class AppModule {}
