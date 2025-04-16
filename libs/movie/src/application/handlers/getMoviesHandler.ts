import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetMoviesQuery } from '../queries/getMoviesQuery'
import { Inject } from '@nestjs/common'
import { MovieQueryRepository } from '../../domain/ports/movieQueryRepository'
import { Movie } from '../../domain/entities/movie'

@QueryHandler(GetMoviesQuery)
export class GetMoviesHandler implements IQueryHandler<GetMoviesQuery> {
  constructor(
    @Inject('MovieQueryRepository')
    private readonly repo: MovieQueryRepository,
  ) {}

  async execute(): Promise<Movie[]> {
    return this.repo.findAll()
  }
}

