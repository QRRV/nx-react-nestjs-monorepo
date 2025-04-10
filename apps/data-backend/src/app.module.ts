import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CreateReviewController } from './review/controllers/createReviewController';
import { CqrsModule } from '@nestjs/cqrs';
import { ReviewModule } from '../../../libs/review/src/review.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/moviebuddy'),
    CqrsModule,
    ReviewModule,
  ],
  controllers: [
    CreateReviewController
  ],
})
export class AppModule {}
