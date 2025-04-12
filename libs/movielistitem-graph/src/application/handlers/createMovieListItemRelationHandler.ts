import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMovieListItemRelationCommand } from '../commands/createMovieListItemRelationCommand';
import { Inject } from '@nestjs/common';
import { MovieListItemRelationRepository } from '../../domain/ports/movieListItemRelationRepository';

@CommandHandler(CreateMovieListItemRelationCommand)
export class CreateMovieListItemRelationHandler
  implements ICommandHandler<CreateMovieListItemRelationCommand>
{
  constructor(
    @Inject('MovieListItemRelationRepository')
    private readonly repo: MovieListItemRelationRepository
  ) {}

  async execute(command: CreateMovieListItemRelationCommand): Promise<void> {
    await this.repo.createMovieListItemRelation(command.userId, command.movieId);
  }
}
