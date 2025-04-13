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
import { UserModule } from '@moviebuddy/user';
import { GetUserByIdController } from './user/controllers/getUserByIdController';
import { UpdateUserController } from './user/controllers/updateUserController';
import { DeleteUserController } from './user/controllers/deleteUserController';
import { RegisterController } from './auth/controllers/registerController';
import { LoginController } from './auth/controllers/loginController';
import { AuthModule } from '@moviebuddy/auth';
import * as process from 'node:process';
import { SharedModule } from '@moviebuddy/shared';


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
  GetUserByIdController,
  UpdateUserController,
  DeleteUserController
];

const authControllers = [
  RegisterController,
  LoginController,
];

@Module({
  imports: [
    MongooseModule.forRoot(process.env['MONGO_URI'] || 'mongodb://localhost:27017/moviebuddy'),
    CqrsModule,
    ReviewModule,
    MovieModule,
    WatchlistitemModule,
    UserModule,
    AuthModule,
    SharedModule
  ],
  controllers: [
    ...reviewControllers,
    ...movieControllers,
    ...watchlistItemControllers,
    ...userControllers,
    ...authControllers,
  ],
})
export class AppModule {}
