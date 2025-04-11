import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { WatchlistItem } from '../../domain/entities/watchlistItem'
import { GetWatchlistByUserQuery } from '../queries/getWatchlistByUserQuery'
import { WatchlistItemQueryRepository } from '../../domain/ports/watchlistItemQueryRepository';

@QueryHandler(GetWatchlistByUserQuery)
export class GetWatchlistByUserHandler implements IQueryHandler<GetWatchlistByUserQuery> {
  constructor(
    @Inject('WatchlistItemQueryRepository')
    private readonly repo: WatchlistItemQueryRepository
  ) {}

  async execute(query: GetWatchlistByUserQuery): Promise<WatchlistItem[]> {
    return this.repo.findByUserId(query.userId)
  }
}
