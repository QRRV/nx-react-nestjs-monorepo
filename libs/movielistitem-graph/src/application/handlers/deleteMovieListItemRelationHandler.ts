import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteMovieListItemRelationCommand } from '../commands/deleteMovieListItemRelationCommand';
import { Inject } from '@nestjs/common';
import { MovieListItemRelationRepository } from '../../domain/ports/movieListItemRelationRepository';

@CommandHandler(DeleteMovieListItemRelationCommand)
export class DeleteMovieListItemRelationHandler
  implements ICommandHandler<DeleteMovieListItemRelationCommand>
{
  constructor(
    @Inject('MovieListItemRelationRepository')
    private readonly repo: MovieListItemRelationRepository
  ) {}

  async execute(command: DeleteMovieListItemRelationCommand): Promise<void> {
    await this.repo.deleteMovieListItemRelation(command.userId, command.movieId);
  }
}
