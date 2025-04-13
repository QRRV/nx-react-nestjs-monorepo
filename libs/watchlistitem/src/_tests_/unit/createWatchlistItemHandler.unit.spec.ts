import { CreateWatchlistItemHandler } from '../../application/handlers/createWatchlistItemHandler'
import { WatchlistItem } from '../../domain/entities/watchlistItem'
import { CreateWatchlistItemCommand } from '../../application/commands/createWatchlistItemCommand'
import { WatchlistItemCommandRepository } from '../../domain/ports/watchlistItemCommandRepository'
import { WatchlistGraphCommandRepository } from '../../domain/ports/watchlistItemGraphCommandRepository';

describe('CreateWatchlistItemHandler', () => {
  let handler: CreateWatchlistItemHandler
  let mockRepo: WatchlistItemCommandRepository
  let graphRepo: WatchlistGraphCommandRepository

  beforeEach(() => {
    mockRepo = {
      create: jest.fn(async (item: WatchlistItem) => item),
      update: jest.fn(),
      delete: jest.fn(),
    }

    graphRepo = {
      createMovieListItemRelation: jest.fn(),
      deleteMovieListItemRelation: jest.fn(),
    }

    handler = new CreateWatchlistItemHandler(mockRepo, graphRepo)
  })

  it('should create and return a WatchlistItem', async () => {
    const command = new CreateWatchlistItemCommand('user123', 'tt1375666', 'token', 2)

    const result = await handler.execute(command)

    expect(result).toBeInstanceOf(WatchlistItem)
    expect(result.userId).toBe('user123')
    expect(result.movieId).toBe('tt1375666')
    expect(result.priority).toBe(2)
    expect(result.watched).toBe(false)
  })
})
