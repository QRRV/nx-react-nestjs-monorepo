import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CqrsModule } from '@nestjs/cqrs'
import { MovieSchema } from './infrastructure/mongoose/schemas/movieSchema'
import { MongooseMovieQueryRepository } from './infrastructure/mongoose/repositories/mongooseMovieQueryRepository'
import { GetMoviesHandler } from './application/handlers/getMoviesHandler'
import { GetMovieByIdHandler } from './application/handlers/getMovieByIdHandler'
import { CreateMovieHandler } from './application/handlers/createMovieHandler';
import { UpdateMovieHandler } from './application/handlers/updateMovieHandler';
import { DeleteMovieHandler } from './application/handlers/deleteMovieHandler';
import { MongooseMovieCommandRepository } from './infrastructure/mongoose/repositories/mongooseMovieCommandRepository';
import {
  HttpNeo4jMovieCommandRepository
} from './infrastructure/mongoose/repositories/httpNeo4jMovieCommandRepository';

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
