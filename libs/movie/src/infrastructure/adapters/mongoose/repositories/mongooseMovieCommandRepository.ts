import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from '../../../../domain/entities/movie';
import { MovieCommandRepository } from '../../../../domain/ports/movieCommandRepository';
import { UpdateMovieDto } from '../../../../application/dto/updateMovieDto';
import { WatchlistItemModel } from '@moviebuddy/watchlistitem';
import { ReviewModel } from '@moviebuddy/review';

export class MongooseMovieCommandRepository implements MovieCommandRepository {
  constructor(
    @InjectModel('movies') private readonly model: Model<Movie>,
    @InjectModel('watchlistitems') private readonly watchlistModel: Model<WatchlistItemModel>,
    @InjectModel('reviews') private readonly reviewModel: Model<ReviewModel>,
  ) {}

  async create(movie: Movie): Promise<Movie> {
    return this.model.create(movie);
  }

  async update(id: string, dto: UpdateMovieDto): Promise<boolean> {
    const result = await this.model.updateOne({ _id: id }, { $set: dto });
    return result.modifiedCount > 0;
  }

  async delete(id: string): Promise<boolean> {
    await this.reviewModel.deleteMany({ movieId: id }).exec();

    await this.watchlistModel.deleteMany({ movieId: id }).exec();

    const result = await this.model.deleteOne({ _id: id }).exec();

    return result.deletedCount > 0;
  }
}
