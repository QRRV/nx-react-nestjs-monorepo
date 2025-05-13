import { Test, TestingModule } from '@nestjs/testing'
import { GetReviewsByMovieHandler } from '../../application/handlers/getReviewsByMovieHandler'
import { GetReviewsByMovieQuery } from '../../application/queries/getReviewsByMovieQuery'
import { MongooseModule, getModelToken } from '@nestjs/mongoose'
import { ReviewSchema } from '../../infrastructure/adapters/mongoose/schemas/reviewSchema'
import { MongooseReviewQueryRepository } from '../../infrastructure/adapters/mongoose/repositories/mongooseReviewQueryRepository'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose, { Model } from 'mongoose'
import { Review } from '../../domain/entities/review'

describe('GetReviewsByMovieHandler Integration', () => {
  jest.setTimeout(20000)

  let handler: GetReviewsByMovieHandler
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
        GetReviewsByMovieHandler,
        {
          provide: 'ReviewQueryRepository',
          useClass: MongooseReviewQueryRepository
        }
      ]
    }).compile()

    handler = module.get(GetReviewsByMovieHandler)
    reviewModel = module.get(getModelToken('reviews'))
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
    await module.close()
  })

  it('should return all reviews for a movie', async () => {
    await reviewModel.create([
      {
        _id: 'uuid-1',
        userId: 'userA',
        movieId: 'movieX',
        rating: 5,
        comment: 'Topfilm',
        reviewDate: new Date()
      },
      {
        _id: 'uuid-2',
        userId: 'userB',
        movieId: 'movieX',
        rating: 4,
        comment: 'Ook goed',
        reviewDate: new Date()
      },
      {
        _id: 'uuid-3',
        userId: 'userC',
        movieId: 'movieY',
        rating: 2,
        comment: 'Bleh',
        reviewDate: new Date()
      }
    ])

    const query = new GetReviewsByMovieQuery('movieX')
    const result = await handler.execute(query)

    expect(result.length).toBe(2)
    expect(result.every(r => r.movieId === 'movieX')).toBe(true)
  })
})
