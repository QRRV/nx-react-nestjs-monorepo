import { WatchlistItem } from '../../domain/entities/watchlistItem'

describe('WatchlistItem Entity', () => {
  it('should create a watchlist item with all properties', () => {
    const now = new Date()
    const item = new WatchlistItem(
      'abc-uuid',
      'user123',
      'tt1375666',
      now,
      true,
      2
    )

    expect(item.id).toBe('abc-uuid')
    expect(item.userId).toBe('user123')
    expect(item.movieId).toBe('tt1375666')
    expect(item.addedAt).toBe(now)
    expect(item.watched).toBe(true)
    expect(item.priority).toBe(2)
  })
})
