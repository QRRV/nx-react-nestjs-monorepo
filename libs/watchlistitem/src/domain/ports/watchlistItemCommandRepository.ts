import { WatchlistItem } from '../entities/watchlistItem';

export interface WatchlistItemCommandRepository {
  create(item: WatchlistItem): Promise<WatchlistItem>
  update(
    id: string,
    updates: { userId: string; watched?: boolean; priority?: number }
  ): Promise<WatchlistItem>
  delete(id: string, userId: string): Promise<'not_found' | 'unauthorized' | 'deleted'>

}
