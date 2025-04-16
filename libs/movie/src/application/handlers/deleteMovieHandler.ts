import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteMovieCommand } from '../commands/deleteMovieCommand';
import { Inject } from '@nestjs/common';
import { MovieCommandRepository } from '../../domain/ports/movieCommandRepository';

@CommandHandler(DeleteMovieCommand)
export class DeleteMovieHandler implements ICommandHandler<DeleteMovieCommand> {
  constructor(
    @Inject('MovieCommandRepository')
    private readonly repo: MovieCommandRepository
  ) {}

  async execute(command: DeleteMovieCommand): Promise<boolean> {
    return this.repo.delete(command.id);
  }
}
