import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CqrsModule } from '@nestjs/cqrs'
import { MovieSchema } from './infrastructure/adapters/mongoose/schemas/movieSchema'
import { MongooseMovieQueryRepository } from './infrastructure/adapters/mongoose/repositories/mongooseMovieQueryRepository'
import { GetMoviesHandler } from './application/handlers/getMoviesHandler'
import { GetMovieByIdHandler } from './application/handlers/getMovieByIdHandler'
import { CreateMovieHandler } from './application/handlers/createMovieHandler';
import { UpdateMovieHandler } from './application/handlers/updateMovieHandler';
import { DeleteMovieHandler } from './application/handlers/deleteMovieHandler';
import { MongooseMovieCommandRepository } from './infrastructure/adapters/mongoose/repositories/mongooseMovieCommandRepository';
import {
  HttpNeo4jMovieCommandRepository
} from './infrastructure/adapters/mongoose/repositories/httpNeo4jMovieCommandRepository';
import { WatchlistitemModule } from '@moviebuddy/watchlistitem';
import { ReviewModule } from '@moviebuddy/review';

const queryHandlers = [
  GetMoviesHandler,
  GetMovieByIdHandler
];

const commandHandlers = [
  CreateMovieHandler,
  UpdateMovieHandler,
  DeleteMovieHandler
];

@Module({
  imports: [
    CqrsModule,
    WatchlistitemModule,
    ReviewModule,
    MongooseModule.forFeature([
      { name: 'movies', schema: MovieSchema }
    ])
  ],
  providers: [
    ...queryHandlers,
    ...commandHandlers,
    {
      provide: 'MovieCommandRepository',
      useClass: MongooseMovieCommandRepository
    },
    {
      provide: 'MovieQueryRepository',
      useClass: MongooseMovieQueryRepository
    },
    {
      provide: 'MovieGraphCommandRepository',
      useClass: HttpNeo4jMovieCommandRepository
    }
  ],
  exports: [...queryHandlers]
})
export class MovieModule {}
