import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule, getModelToken } from '@nestjs/mongoose'
import mongoose, { Model } from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { WatchlistItem } from '../../domain/entities/watchlistItem'
import { WatchlistItemSchema } from '../../infrastructure/mongoose/schemas/watchlistItemSchema'
import { MongooseWatchlistItemCommandRepository } from '../../infrastructure/mongoose/repositories/mongooseWatchlistItemCommandRepository'
import { DeleteWatchlistItemHandler } from '../../application/handlers/deleteWatchlistItemHandler'
import { DeleteWatchlistItemCommand } from '../../application/commands/deleteWatchlistItemCommand'

describe('DeleteWatchlistItemHandler Integration', () => {
  jest.setTimeout(20000)

  let handler: DeleteWatchlistItemHandler
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
        DeleteWatchlistItemHandler,
        {
          provide: 'WatchlistItemCommandRepository',
          useClass: MongooseWatchlistItemCommandRepository
        },
        {
          provide: 'WatchlistGraphCommandRepository',
          useValue: {
            createMovieListItemRelation: jest.fn(),
            deleteMovieListItemRelation: jest.fn()
          }
        }
      ]
    }).compile()

    handler = module.get(DeleteWatchlistItemHandler)
    model = module.get(getModelToken('watchlistitems'))
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
    await module.close()
  })

  it('should delete a watchlist item if user owns it', async () => {
    await model.create({
      _id: 'delete-me',
      userId: 'user123',
      movieId: 'tt0848228',
      addedAt: new Date(),
      watched: false,
      priority: 2
    })

    const command = new DeleteWatchlistItemCommand('delete-me', 'user123', 'valid-token')

    await expect(handler.execute(command)).resolves.not.toThrow()

    const check = await model.findById('delete-me')
    expect(check).toBeNull()
  })

  it('should throw NotFoundException if item does not exist', async () => {
    const command = new DeleteWatchlistItemCommand('non-existent', 'userX', 'valid-token')

    await expect(handler.execute(command)).rejects.toThrow('Watchlist item not found')
  })

  it('should throw UnauthorizedException if user is not the owner', async () => {
    await model.create({
      _id: 'owned-by-someone',
      userId: 'realUser',
      movieId: 'tt6751668',
      addedAt: new Date(),
      watched: false,
      priority: 3
    })

    const command = new DeleteWatchlistItemCommand('owned-by-someone', 'intruder', 'valid-token')

    await expect(handler.execute(command)).rejects.toThrow('Not allowed to delete this watchlist item')
  })
})
