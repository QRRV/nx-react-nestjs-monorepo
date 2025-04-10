import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { GetMovieByIdQuery } from '../queries/getMovieByIdQuery'
import { Inject, NotFoundException } from '@nestjs/common'
import { MovieQueryRepository } from '../../domain/ports/movieQueryRepository'
import { Movie } from '../../domain/entities/movie'

@QueryHandler(GetMovieByIdQuery)
export class GetMovieByIdHandler implements IQueryHandler<GetMovieByIdQuery> {
  constructor(
    @Inject('MovieQueryRepository')
    private readonly repo: MovieQueryRepository
  ) {}

  async execute(query: GetMovieByIdQuery): Promise<Movie> {
    const result = await this.repo.findById(query.movieId)
    if (!result) throw new NotFoundException('Movie not found')
    return result
  }
}
