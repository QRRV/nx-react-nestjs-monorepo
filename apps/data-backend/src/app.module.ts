import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CreateReviewController } from './review/controllers/createReviewController';
import { CqrsModule } from '@nestjs/cqrs';
import { GetReviewsByMovieController } from './review/controllers/getReviewsByMovieController';
import { ReviewModule } from '@moviebuddy/review';
import { UpdateReviewController } from './review/controllers/updateReviewController';
import { DeleteReviewController } from './review/controllers/deleteReviewController';
import { GetReviewsByUserController } from './review/controllers/getReviewsByUserController';
import { MovieModule } from '@moviebuddy/movie';
import { GetMovieByIdController } from './movie/controllers/getMovieByIdController';
import { GetMoviesController } from './movie/controllers/getMoviesController';
import { CreateWatchlistItemController } from './watchlistitem/controllers/createWatchlistItemController';
import { WatchlistitemModule } from '@moviebuddy/watchlistitem';
import { GetWatchlistByUserController } from './watchlistitem/controllers/getWatchlistByUserController';
import { UpdateWatchlistItemController } from './watchlistitem/controllers/updateWatchlistItemController';
import { DeleteWatchlistItemController } from './watchlistitem/controllers/deleteWatchlistItemController';
import { CreateUserController } from './user/controllers/createUserController';
import { UserModule } from '@moviebuddy/user';
import { GetUserByIdController } from './user/controllers/getUserByIdController';
import { UpdateUserController } from './user/controllers/updateUserController';
import { DeleteUserController } from './user/controllers/deleteUserController';


const reviewControllers = [
  CreateReviewController,
  GetReviewsByMovieController,
  UpdateReviewController,
  DeleteReviewController,
  GetReviewsByUserController,
];

const movieControllers = [
  GetMovieByIdController,
  GetMoviesController
];

const watchlistItemControllers = [
  CreateWatchlistItemController,
  GetWatchlistByUserController,
  UpdateWatchlistItemController,
  DeleteWatchlistItemController
];

const userControllers = [
  CreateUserController,
  GetUserByIdController,
  UpdateUserController,
  DeleteUserController
];

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/moviebuddy'),
    CqrsModule,
    ReviewModule,
    MovieModule,
    WatchlistitemModule,
    UserModule
  ],
  controllers: [
    ...reviewControllers,
    ...movieControllers,
    ...watchlistItemControllers,
    ...userControllers
  ],
})
export class AppModule {}
