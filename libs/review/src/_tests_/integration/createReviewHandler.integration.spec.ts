import { Test, TestingModule } from '@nestjs/testing'
import { CreateReviewHandler } from '../../application/handlers/createReviewHandler'
import { CreateReviewCommand } from '../../application/commands/createReviewCommand'
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { ReviewSchema } from '../../infrastructure/mongoose/schemas/reviewSchema'
import { MongooseReviewCommandRepository } from '../../infrastructure/mongoose/repositories/mongooseReviewCommandRepository'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose, { Model } from 'mongoose';
import { Review } from '../../domain/entities/review';

describe('CreateReviewHandler Integration', () => {
    jest.setTimeout(20000);

  let handler: CreateReviewHandler
  let mongoServer: MongoMemoryServer
  let module: TestingModule
  let reviewModel: Model<Review>

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()

    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([
          { name: 'reviews', schema: ReviewSchema }
        ]),
      ],
      providers: [
        CreateReviewHandler,
        {
          provide: 'ReviewCommandRepository',
          useClass: MongooseReviewCommandRepository
        }
      ]
    }).compile()

    handler = module.get(CreateReviewHandler)
    reviewModel = module.get(getModelToken('reviews'))
    if (mongoose.connection.db) {
      await mongoose.connection.db.admin().ping()
    }
  })


  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
    await module.close()
  })

  it('should save a review to the database', async () => {
    const command = new CreateReviewCommand(
      'user123',
      'movie456',
      4,
      'Goede film'
    )

    const result = await handler.execute(command)

    expect(result._id).toBeDefined()
    expect(result.userId).toBe('user123')

    const saved = await reviewModel.findOne({ _id: result._id })

    expect(saved).not.toBeNull()
    expect(saved?.['userId']).toBe('user123')
    expect(saved?.movieId).toBe('movie456')
    expect(saved?.rating).toBe(4)
    expect(saved?.comment).toBe('Goede film')
    expect(saved?.reviewDate).toBeDefined()
    if(saved) {
      expect(new Date(saved.reviewDate).getTime()).toBeLessThanOrEqual(Date.now())
    }
  })
})
