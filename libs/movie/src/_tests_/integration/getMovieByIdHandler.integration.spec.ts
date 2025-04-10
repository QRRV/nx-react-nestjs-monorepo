import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule, getModelToken } from '@nestjs/mongoose'
import mongoose, { Model } from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MovieSchema } from '../../infrastructure/mongoose/schemas/movieSchema'
import { MongooseMovieQueryRepository } from '../../infrastructure/mongoose/repositories/mongooseMovieQueryRepository'
import { GetMovieByIdHandler } from '../../application/handlers/getMovieByIdHandler'
import { GetMovieByIdQuery } from '../../application/queries/getMovieByIdQuery'
import { Movie } from '../../domain/entities/movie'

describe('GetMovieByIdHandler Integration', () => {
  jest.setTimeout(20000)

  let module: TestingModule
  let handler: GetMovieByIdHandler
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
        GetMovieByIdHandler,
        {
          provide: 'MovieQueryRepository',
          useClass: MongooseMovieQueryRepository
        }
      ]
    }).compile()

    handler = module.get(GetMovieByIdHandler)
    movieModel = module.get(getModelToken('movies'))
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
    await module.close()
  })

  it('should return one movie by ID', async () => {
    await movieModel.create({
      _id: 'tt1375666',
      title: 'Inception',
      description: 'Mind-bending dream stuff',
      releaseDate: new Date('2010-07-16'),
      genre: ['Action', 'Sci-Fi'],
      hasWonAwards: true
    })

    const result = await handler.execute(new GetMovieByIdQuery('tt1375666'))

    expect(result).toBeInstanceOf(Movie)
    expect(result._id).toBe('tt1375666')
  })

  it('should throw NotFoundException if movie does not exist', async () => {
    await expect(
      handler.execute(new GetMovieByIdQuery('non-existent-id'))
    ).rejects.toThrow('Movie not found')
  })

})
