import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule, getModelToken } from '@nestjs/mongoose'
import mongoose, { Model } from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MovieSchema } from '../../infrastructure/mongoose/schemas/movieSchema'
import { MongooseMovieQueryRepository } from '../../infrastructure/mongoose/repositories/mongooseMovieQueryRepository'
import { GetMoviesHandler } from '../../application/handlers/getMoviesHandler'

describe('GetMoviesHandler Integration', () => {
  jest.setTimeout(20000)

  let module: TestingModule
  let handler: GetMoviesHandler
  let mongoServer: MongoMemoryServer
  let movieModel: Model<Movie>

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()

    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: 'movies', schema: MovieSchema }])
      ],
      providers: [
        GetMoviesHandler,
        {
          provide: 'MovieQueryRepository',
          useClass: MongooseMovieQueryRepository
        }
      ]
    }).compile()

    handler = module.get(GetMoviesHandler)
    movieModel = module.get(getModelToken('movies'))
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
    await module.close()
  })

  it('should return all movies from the database', async () => {
    await movieModel.create([
      {
        _id: 'tt1375666',
        title: 'Inception',
        description: 'Mind-blowing dreams',
        releaseDate: new Date('2010-07-16'),
        genre: ['Action', 'Sci-Fi'],
        hasWonAwards: true
      },
      {
        _id: 'tt0133093',
        title: 'The Matrix',
        description: 'What is real?',
        releaseDate: new Date('1999-03-31'),
        genre: ['Action', 'Sci-Fi'],
        hasWonAwards: true
      }
    ])

    const result = await handler.execute()

    expect(result.length).toBe(2)
    expect(result[0]).toBeInstanceOf(Movie)
  })
})
