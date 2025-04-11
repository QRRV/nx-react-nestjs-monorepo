import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateWatchlistItemCommand } from '../commands/createWatchlistItemCommand'
import { Inject } from '@nestjs/common'
import { WatchlistItem } from '../../domain/entities/watchlistItem'
import { randomUUID } from 'crypto'
import { WatchlistItemCommandRepository } from '../../domain/ports/watchlistItemCommandRepository';
@CommandHandler(CreateWatchlistItemCommand)
export class CreateWatchlistItemHandler implements ICommandHandler<CreateWatchlistItemCommand> {
  constructor(
    @Inject('WatchlistItemCommandRepository')
    private readonly repo: WatchlistItemCommandRepository
  ) {}

  async execute(command: CreateWatchlistItemCommand): Promise<WatchlistItem> {
    const item = new WatchlistItem(
      randomUUID(),
      command.userId,
      command.movieId,
      new Date(),
      false,
      command.priority ?? 3
    )

    return this.repo.create(item)
  }
}
