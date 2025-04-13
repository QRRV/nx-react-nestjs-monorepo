import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateWatchlistItemCommand } from '../commands/createWatchlistItemCommand'
import { Inject } from '@nestjs/common'
import { WatchlistItem } from '../../domain/entities/watchlistItem'
import { randomUUID } from 'crypto'
import { WatchlistItemCommandRepository } from '../../domain/ports/watchlistItemCommandRepository';
import { WatchlistGraphCommandRepository } from '../../domain/ports/watchlistItemGraphCommandRepository';
@CommandHandler(CreateWatchlistItemCommand)
export class CreateWatchlistItemHandler implements ICommandHandler<CreateWatchlistItemCommand> {
  constructor(
    @Inject('WatchlistItemCommandRepository')
    private readonly repo: WatchlistItemCommandRepository,
    @Inject('WatchlistGraphCommandRepository')
    private readonly graphRepo: WatchlistGraphCommandRepository
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

    const created = await this.repo.create(item);

    await this.graphRepo.createMovieListItemRelation(
      item.movieId,
      item.id,
      command.token
    );

    return created;
  }
}
