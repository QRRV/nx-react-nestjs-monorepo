import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemoveFriendCommand } from '../commands/removeFriendCommand';
import { Inject } from '@nestjs/common';
import { FriendshipRepository } from '../../domain/ports/friendshipRepository';

@CommandHandler(RemoveFriendCommand)
export class RemoveFriendHandler implements ICommandHandler<RemoveFriendCommand> {
  constructor(
    @Inject('FriendshipRepository')
    private readonly repo: FriendshipRepository
  ) {}

  async execute(command: RemoveFriendCommand): Promise<void> {
    await this.repo.removeFriend(command.userId, command.friendId);
  }
}
