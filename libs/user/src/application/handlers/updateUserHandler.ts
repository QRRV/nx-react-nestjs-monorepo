import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { UpdateUserCommand } from '../commands/updateUserCommand';
import { UserCommandRepository } from '../../domain/ports/userCommandRepository';
import * as bcrypt from 'bcrypt';
import { User } from '../../domain/entities/user';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject('UserCommandRepository')
    private readonly repo: UserCommandRepository
  ) {}

  async execute(command: UpdateUserCommand): Promise<User> {
    const updates = { ...command.updates };

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    return this.repo.update(command.targetUserId, {
      ...updates,
      userId: command.requestingUserId
    });
  }
}
