import { Test, TestingModule } from '@nestjs/testing'
import { DeleteReviewHandler } from '../../application/handlers/deleteReviewHandler'
import { DeleteReviewCommand } from '../../application/commands/deleteReviewCommand'
import { MongooseModule, getModelToken } from '@nestjs/mongoose'
import { ReviewSchema } from '../../infrastructure/mongoose/schemas/reviewSchema'
import { MongooseReviewCommandRepository } from '../../infrastructure/mongoose/repositories/mongooseReviewCommandRepository'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose, { Model } from 'mongoose'
import { Review } from '../../domain/entities/review'

describe('DeleteReviewHandler Integration', () => {
  jest.setTimeout(20000)

  let handler: DeleteReviewHandler
  let module: TestingModule
  let mongoServer: MongoMemoryServer
  let reviewModel: Model<Review>

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()

    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: 'reviews', schema: ReviewSchema }])
      ],
      providers: [
        DeleteReviewHandler,
        {
          provide: 'ReviewCommandRepository',
          useClass: MongooseReviewCommandRepository
        },
        {
          provide: 'ReviewGraphWriteRepository',
          useValue: {
            deleteReviewRelation: jest.fn(),
            createReviewRelation: jest.fn()
          }
        }
      ]
    }).compile()

    handler = module.get(DeleteReviewHandler)
    reviewModel = module.get(getModelToken('reviews'))
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
    await module.close()
  })

  it('should delete a review when user is owner', async () => {
    await reviewModel.create({
      _id: 'uuid-13',
      userId: 'userZ',
      movieId: 'movieW',
      rating: 2,
      comment: 'Niet geweldig',
      reviewDate: new Date()
    })

    await handler.execute(new DeleteReviewCommand('uuid-13', 'userZ', 'token'))

    const deleted = await reviewModel.findOne({ _id: 'uuid-13' })
    expect(deleted).toBeNull()
  })

  it('should throw NotFoundException when trying to delete non-existent review', async () => {
    const command = new DeleteReviewCommand('niet-bestaand-id', 'userX', 'token')

    await expect(handler.execute(command)).rejects.toThrow('Review not found')
  })

  it('should not allow delete if user is not the owner', async () => {
    await reviewModel.create({
      _id: 'uuid-15',
      userId: 'userReal',
      movieId: 'movieK',
      rating: 4,
      comment: 'Privéreview',
      reviewDate: new Date()
    })

    const command = new DeleteReviewCommand('uuid-15', 'fouteUser', 'token')

    await expect(handler.execute(command)).rejects.toThrow()
  })
})
