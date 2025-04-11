import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule, getModelToken } from '@nestjs/mongoose'
import mongoose, { Model } from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { WatchlistItem } from '../../domain/entities/watchlistItem'
import { UpdateWatchlistItemCommand } from '../../application/commands/updateWatchlistItemCommand'
import { UpdateWatchlistItemHandler } from '../../application/handlers/updateWatchlistItemHandler'
import { WatchlistItemSchema } from '../../infrastructure/mongoose/schemas/watchlistItemSchema'
import { MongooseWatchlistItemCommandRepository } from '../../infrastructure/mongoose/repositories/mongooseWatchlistItemCommandRepository'

describe('UpdateWatchlistItemHandler Integration', () => {
  jest.setTimeout(20000)

  let handler: UpdateWatchlistItemHandler
  let module: TestingModule
  let mongoServer: MongoMemoryServer
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
        UpdateWatchlistItemHandler,
        {
          provide: 'WatchlistItemCommandRepository',
          useClass: MongooseWatchlistItemCommandRepository
        }
      ]
    }).compile()

    handler = module.get(UpdateWatchlistItemHandler)
    model = module.get(getModelToken('watchlistitems'))
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
    await module.close()
  })

  it('should update a watchlist item', async () => {
    await model.create({
      _id: 'abc-123',
      userId: 'user123',
      movieId: 'tt1375666',
      addedAt: new Date(),
      watched: false,
      priority: 2
    })

    const command = new UpdateWatchlistItemCommand('abc-123', 'user123', true, 1)
    const result = await handler.execute(command)

    expect(result.watched).toBe(true)
    expect(result.priority).toBe(1)
  })

  it('should throw if item does not exist', async () => {
    const command = new UpdateWatchlistItemCommand('does-not-exist', 'userX', true, 1)

    await expect(handler.execute(command)).rejects.toThrow('Watchlist item not found')
  })

  it('should throw if item is not owned by user', async () => {
    await model.create({
      _id: 'xyz-789',
      userId: 'realUser',
      movieId: 'tt0133093',
      addedAt: new Date(),
      watched: false,
      priority: 3
    })

    const command = new UpdateWatchlistItemCommand('xyz-789', 'hackerUser', true, 1)

    await expect(handler.execute(command)).rejects.toThrow('Unauthorized to update this watchlist item')
  })
})
