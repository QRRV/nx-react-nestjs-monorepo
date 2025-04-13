import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { DeleteWatchlistItemCommand } from '../commands/deleteWatchlistItemCommand'
import { Inject, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { WatchlistItemCommandRepository } from '../../domain/ports/watchlistItemCommandRepository'
import { WatchlistGraphCommandRepository } from '../../domain/ports/watchlistItemGraphCommandRepository';

@CommandHandler(DeleteWatchlistItemCommand)
export class DeleteWatchlistItemHandler implements ICommandHandler<DeleteWatchlistItemCommand> {
  constructor(
    @Inject('WatchlistItemCommandRepository')
    private readonly repo: WatchlistItemCommandRepository,
    @Inject('WatchlistGraphCommandRepository')
    private readonly graphRepo: WatchlistGraphCommandRepository
  ) {}

  async execute(command: DeleteWatchlistItemCommand): Promise<void> {
    const result = await this.repo.delete(command.itemId, command.userId)

    if (result === 'not_found') {
      throw new NotFoundException('Watchlist item not found')
    }

    if (result === 'unauthorized') {
      throw new UnauthorizedException('Not allowed to delete this watchlist item')
    }

    await this.graphRepo.deleteMovieListItemRelation(command.itemId, command.token)

  }
}
