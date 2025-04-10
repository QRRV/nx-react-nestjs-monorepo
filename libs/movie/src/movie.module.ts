import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CqrsModule } from '@nestjs/cqrs'
import { MovieSchema } from './infrastructure/mongoose/schemas/movieSchema'
import { MongooseMovieQueryRepository } from './infrastructure/mongoose/repositories/mongooseMovieQueryRepository'
import { GetMoviesHandler } from './application/handlers/getMoviesHandler'
import { GetMovieByIdHandler } from './application/handlers/getMovieByIdHandler'

const queryHandlers = [
  GetMoviesHandler,
  GetMovieByIdHandler
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
    {
      provide: 'MovieQueryRepository',
      useClass: MongooseMovieQueryRepository
    }
  ],
  exports: [...queryHandlers]
})
export class MovieModule {}
