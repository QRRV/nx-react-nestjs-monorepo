import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateWatchlistItemCommand } from '../commands/updateWatchlistItemCommand'
import { Inject } from '@nestjs/common'
import { WatchlistItemCommandRepository } from '../../domain/ports/watchlistItemCommandRepository'
import { WatchlistItem } from '../../domain/entities/watchlistItem'

@CommandHandler(UpdateWatchlistItemCommand)
export class UpdateWatchlistItemHandler implements ICommandHandler<UpdateWatchlistItemCommand> {
  constructor(
    @Inject('WatchlistItemCommandRepository')
    private readonly repo: WatchlistItemCommandRepository
  ) {}

  async execute(command: UpdateWatchlistItemCommand): Promise<WatchlistItem> {
    return this.repo.update(command.reviewId, {
      userId: command.userId,
      watched: command.watched,
      priority: command.priority
    })
  }
}
