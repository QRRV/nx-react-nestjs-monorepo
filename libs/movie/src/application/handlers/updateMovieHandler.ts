import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateMovieCommand } from '../commands/updateMovieCommand';
import { Inject } from '@nestjs/common';
import { MovieCommandRepository } from '../../domain/ports/movieCommandRepository';

@CommandHandler(UpdateMovieCommand)
export class UpdateMovieHandler implements ICommandHandler<UpdateMovieCommand> {
  constructor(
    @Inject('MovieCommandRepository')
    private readonly repo: MovieCommandRepository
  ) {}

  async execute(command: UpdateMovieCommand): Promise<boolean> {
    return this.repo.update(command.id, command.dto);
  }
}
