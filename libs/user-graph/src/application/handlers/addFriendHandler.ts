import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddFriendCommand } from '../commands/addFriendCommand';
import { Inject } from '@nestjs/common';
import { FriendshipRepository } from '../../domain/ports/friendshipRepository';

@CommandHandler(AddFriendCommand)
export class AddFriendHandler implements ICommandHandler<AddFriendCommand> {
  constructor(
    @Inject('FriendshipRepository')
    private readonly repo: FriendshipRepository
  ) {}

  async execute(command: AddFriendCommand): Promise<void> {
    await this.repo.addFriend(command.userId, command.friendId);
  }
}
