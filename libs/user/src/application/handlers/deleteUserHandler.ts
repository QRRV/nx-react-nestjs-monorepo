import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteUserCommand } from '../commands/deleteUserCommand';
import { UserCommandRepository } from '../../domain/ports/userCommandRepository';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @Inject('UserCommandRepository')
    private readonly repo: UserCommandRepository
  ) {}

  async execute(command: DeleteUserCommand): Promise<boolean> {
    return this.repo.delete(command.targetUserId, command.requestingUserId);
  }
}
