import { Test, TestingModule } from '@nestjs/testing'
import { UpdateReviewHandler } from '../../application/handlers/updateReviewHandler'
import { UpdateReviewCommand } from '../../application/commands/updateReviewCommand'
import { MongooseModule, getModelToken } from '@nestjs/mongoose'
import { ReviewSchema } from '../../infrastructure/mongoose/schemas/reviewSchema'
import { MongooseReviewCommandRepository } from '../../infrastructure/mongoose/repositories/mongooseReviewCommandRepository'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose, { Model } from 'mongoose'
import { Review } from '../../domain/entities/review'

describe('UpdateReviewHandler Integration', () => {
  jest.setTimeout(20000)

  let handler: UpdateReviewHandler
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
        UpdateReviewHandler,
        {
          provide: 'ReviewCommandRepository',
          useClass: MongooseReviewCommandRepository
        }
      ]
    }).compile()

    handler = module.get(UpdateReviewHandler)
    reviewModel = module.get(getModelToken('reviews'))
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
    await module.close()
  })

  it('should update only the comment of a review', async () => {
    await reviewModel.create({
      _id: 'uuid-9',
      userId: 'userX',
      movieId: 'movieY',
      rating: 3,
      comment: 'Was wel oké',
      reviewDate: new Date()
    })

    const command = new UpdateReviewCommand(
      'uuid-9',
      'userX',
      undefined,
      'Nieuwe comment'
    )

    const updated = await handler.execute(command)
    expect(updated.comment).toBe('Nieuwe comment')
    expect(updated.rating).toBe(3)

    const inDb = await reviewModel.findOne({ _id: 'uuid-9' })
    expect(inDb?.comment).toBe('Nieuwe comment')
    expect(inDb?.rating).toBe(3)
  })

  it('should update only the rating of a review', async () => {
    const command = new UpdateReviewCommand(
      'uuid-9',
      'userX',
      5,
      undefined
    )

    const updated = await handler.execute(command)
    expect(updated.rating).toBe(5)
    expect(updated.comment).toBe('Nieuwe comment')

    const inDb = await reviewModel.findOne({ _id: 'uuid-9' })
    expect(inDb?.rating).toBe(5)
    expect(inDb?.comment).toBe('Nieuwe comment')
  })

  it('should update both rating and comment if both provided', async () => {
    const command = new UpdateReviewCommand('uuid-9', 'userX', 2, 'Toch weer matig')
    const updated = await handler.execute(command)

    expect(updated.rating).toBe(2)
    expect(updated.comment).toBe('Toch weer matig')

    const inDb = await reviewModel.findOne({ _id: 'uuid-9' })
    expect(inDb?.rating).toBe(2)
    expect(inDb?.comment).toBe('Toch weer matig')
  })

  it('should return null or throw when review does not exist', async () => {
    const command = new UpdateReviewCommand('niet-bestaand-id', 'userX', 3, 'nope')

    await expect(handler.execute(command)).rejects.toThrow()
  })

  it('should throw if user is not the owner of the review', async () => {
    const command = new UpdateReviewCommand('uuid-9', 'niet-de-eigenaar', 1, 'Hacked')

    await expect(handler.execute(command)).rejects.toThrow()
  })

})
