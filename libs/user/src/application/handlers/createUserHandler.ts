import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/createUserCommand';
import { User } from '../../domain/entities/user';
import { UserCommandRepository } from '../../domain/ports/userCommandRepository';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject('UserCommandRepository')
    private readonly repo: UserCommandRepository
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const hashedPassword = await bcrypt.hash(command.password, 10);
    const user = new User(
      randomUUID(),
      command.username,
      command.email,
      hashedPassword,
      command.bio
    );
    return this.repo.create(user);
  }
}
