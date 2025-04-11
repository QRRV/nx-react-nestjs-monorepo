import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule, getModelToken } from '@nestjs/mongoose'
import mongoose, { Model } from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { WatchlistItem } from '../../domain/entities/watchlistItem'
import { WatchlistItemSchema } from '../../infrastructure/mongoose/schemas/watchlistItemSchema'
import { MongooseWatchlistItemCommandRepository } from '../../infrastructure/mongoose/repositories/mongooseWatchlistItemCommandRepository'
import { CreateWatchlistItemCommand } from '../../application/commands/createWatchlistItemCommand'
import { CreateWatchlistItemHandler } from '../../application/handlers/createWatchlistItemHandler'

describe('CreateWatchlistItemHandler Integration', () => {
  jest.setTimeout(20000)

  let handler: CreateWatchlistItemHandler
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
        CreateWatchlistItemHandler,
        {
          provide: 'WatchlistItemCommandRepository',
          useClass: MongooseWatchlistItemCommandRepository
        }
      ]
    }).compile()

    handler = module.get(CreateWatchlistItemHandler)
    model = module.get(getModelToken('watchlistitems'))
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
    await module.close()
  })

  it('should save a watchlist item to the database', async () => {
    const command = new CreateWatchlistItemCommand('user123', 'tt1375666', 2)

    const result = await handler.execute(command)

    expect(result.id).toBeDefined()
    expect(result.userId).toBe('user123')

    const saved = await model.findOne({ _id: result.id })

    expect(saved).not.toBeNull()
    expect(saved?.movieId).toBe('tt1375666')
    expect(saved?.watched).toBe(false)
    expect(saved?.priority).toBe(2)
  })
})
