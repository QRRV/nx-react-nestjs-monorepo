import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { MovieQueryRepository } from '../../../domain/ports/movieQueryRepository'
import { Movie } from '../../../domain/entities/movie'
import { MovieModel } from '../schemas/movieSchema'

export class MongooseMovieQueryRepository implements MovieQueryRepository {
  constructor(
    @InjectModel('movies')
    private readonly model: Model<MovieModel>
  ) {}

  async findAll(): Promise<Movie[]> {
    const results = await this.model.find().exec()
    return results.map(
      (doc) =>
        new Movie(
          doc.id,
          doc.title,
          doc.description,
          doc.releaseDate,
          doc.genres,
        )
    )

  }

  async findById(id: string): Promise<Movie | null> {
    const doc = await this.model.findById(id).exec()
    if (!doc) return null
    return new Movie(
      doc.id,
      doc.title,
      doc.description,
      doc.releaseDate,
      doc.genres
    )
  }
}
