import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MovieGraphCommandRepository } from '../../domain/ports/movieGraphCommandRepository';
import { CreateMovieGraphCommand } from '../command/CreateMovieGraphCommand';

@CommandHandler(CreateMovieGraphCommand)
export class CreateMovieGraphHandler implements ICommandHandler<CreateMovieGraphCommand> {
  constructor(
    @Inject('MovieGraphCommandRepository')
    private readonly repo: MovieGraphCommandRepository
  ) {}

  async execute(command: CreateMovieGraphCommand): Promise<void> {
    const { id, title, genres } = command;
    await this.repo.createMovieWithGenres(id, title, genres);
  }
}
