import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMovieCommand } from '../commands/createMovieCommand';
import { Inject } from '@nestjs/common';
import { MovieCommandRepository } from '../../domain/ports/movieCommandRepository';
import { Movie } from '../../domain/entities/movie';
import { MovieQueryRepository } from '../../domain/ports/movieQueryRepository';
import { MovieGraphCommandRepository } from '../../domain/ports/movieGraphCommandRepository';

@CommandHandler(CreateMovieCommand)
export class CreateMovieHandler implements ICommandHandler<CreateMovieCommand> {
  constructor(
    @Inject('MovieCommandRepository')
    private readonly repo: MovieCommandRepository,
    @Inject('MovieGraphCommandRepository')
    private readonly graphRepo: MovieGraphCommandRepository,
  ) {}

  async execute(command: CreateMovieCommand): Promise<Movie> {
    const { id, title, description, genres, releaseDate } = command.dto;
    const movie = new Movie(id, title, description, new Date(releaseDate), genres);

    const response = await this.repo.create(movie);
    await this.graphRepo.createMovie(id, title, genres, command.token);
    return response;
  }
}
