import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule, getModelToken } from '@nestjs/mongoose'
import mongoose, { Model } from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { WatchlistItemSchema } from '../../infrastructure/adapters/mongoose/schemas/watchlistItemSchema'
import { GetWatchlistByUserHandler } from '../../application/handlers/getWatchlistByUserHandler'
import { MongooseWatchlistItemQueryRepository } from '../../infrastructure/adapters/mongoose/repositories/mongooseWatchlistItemQueryRepository'
import { GetWatchlistByUserQuery } from '../../application/queries/getWatchlistByUserQuery'
import { WatchlistItem } from '../../domain/entities/watchlistItem'

describe('GetWatchlistByUserHandler Integration', () => {
  jest.setTimeout(20000)

  let handler: GetWatchlistByUserHandler
  let mongoServer: MongoMemoryServer
  let module: TestingModule
  let model: Model<WatchlistItem>

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()

    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: 'watchlistitems', schema: WatchlistItemSchema }])
      ],
      providers: [
        GetWatchlistByUserHandler,
        {
          provide: 'WatchlistItemQueryRepository',
          useClass: MongooseWatchlistItemQueryRepository
        }
      ]
    }).compile()

    handler = module.get(GetWatchlistByUserHandler)
    model = module.get(getModelToken('watchlistitems'))
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
    await module.close()
  })

  it('should return all watchlist items for a user', async () => {
    await model.create([
      {
        _id: 'uuid-1',
        userId: 'user123',
        movieId: 'tt1375666',
        addedAt: new Date(),
        watched: false,
        priority: 3
      },
      {
        _id: 'uuid-2',
        userId: 'user123',
        movieId: 'tt0133093',
        addedAt: new Date(),
        watched: true,
        priority: 2
      },
      {
        _id: 'uuid-3',
        userId: 'otherUser',
        movieId: 'tt0848228',
        addedAt: new Date(),
        watched: false,
        priority: 1
      }
    ])

    const result = await handler.execute(new GetWatchlistByUserQuery('user123'))

    expect(result.length).toBe(2)
    expect(result.every(item => item.userId === 'user123')).toBe(true)
  })
})
