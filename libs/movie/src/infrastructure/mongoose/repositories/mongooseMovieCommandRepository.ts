import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from '../../../domain/entities/movie';
import { MovieCommandRepository } from '../../../domain/ports/movieCommandRepository';
import { UpdateMovieDto } from '../../../application/dto/updateMovieDto';

export class MongooseMovieCommandRepository implements MovieCommandRepository {
  constructor(
    @InjectModel('movies') private readonly model: Model<Movie>
  ) {}

  async create(movie: Movie): Promise<Movie> {
    return this.model.create(movie);
  }

  async update(id: string, dto: UpdateMovieDto): Promise<boolean> {
    const result = await this.model.updateOne({ _id: id  }, { $set: dto });
    return result.modifiedCount > 0;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }
}
