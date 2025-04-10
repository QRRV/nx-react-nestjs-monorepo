import { Test, TestingModule } from '@nestjs/testing'
import { GetReviewsByUserHandler } from '../../application/handlers/getReviewsByUserHandler'
import { GetReviewsByUserQuery } from '../../application/queries/getReviewsByUserQuery'
import { MongooseModule, getModelToken } from '@nestjs/mongoose'
import { ReviewSchema } from '../../infrastructure/mongoose/schemas/reviewSchema'
import { MongooseReviewQueryRepository } from '../../infrastructure/mongoose/repositories/mongooseReviewQueryRepository'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose, { Model } from 'mongoose'
import { Review } from '../../domain/entities/review'

describe('GetReviewsByUserHandler Integration', () => {
  jest.setTimeout(20000)

  let handler: GetReviewsByUserHandler
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
        GetReviewsByUserHandler,
        {
          provide: 'ReviewQueryRepository',
          useClass: MongooseReviewQueryRepository
        }
      ]
    }).compile()

    handler = module.get(GetReviewsByUserHandler)
    reviewModel = module.get(getModelToken('reviews'))
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
    await module.close()
  })

  it('should return all reviews from a user', async () => {
    await reviewModel.create([
      {
        _id: 'uuid-1',
        userId: 'user123',
        movieId: 'movieA',
        rating: 4,
        comment: 'Nice!',
        reviewDate: new Date()
      },
      {
        _id: 'uuid-2',
        userId: 'user123',
        movieId: 'movieB',
        rating: 5,
        comment: 'Geweldig!',
        reviewDate: new Date()
      },
      {
        _id: 'uuid-3',
        userId: 'otherUser',
        movieId: 'movieC',
        rating: 2,
        comment: 'Meh',
        reviewDate: new Date()
      }
    ])

    const query = new GetReviewsByUserQuery('user123')
    const result = await handler.execute(query)

    expect(result.length).toBe(2)
    expect(result.every(r => r.userId === 'user123')).toBe(true)
  })
})
