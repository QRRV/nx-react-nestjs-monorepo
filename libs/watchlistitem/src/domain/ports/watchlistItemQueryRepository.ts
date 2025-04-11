import { WatchlistItem } from '../entities/watchlistItem';

export interface WatchlistItemQueryRepository {
  findByUserId(userId: string): Promise<WatchlistItem[]>
}
