import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { WatchlistItemQueryRepository } from '../../../../domain/ports/watchlistItemQueryRepository'
import { WatchlistItem } from '../../../../domain/entities/watchlistItem'
import { WatchlistItemModel } from '../schemas/watchlistItemSchema'

export class MongooseWatchlistItemQueryRepository implements WatchlistItemQueryRepository {
  constructor(
    @InjectModel('watchlistitems')
    private readonly model: Model<WatchlistItemModel>
  ) {}

  async findByUserId(userId: string): Promise<WatchlistItem[]> {
    const results = await this.model.find({ userId }).exec()

    return results.map(
      (doc) =>
        new WatchlistItem(
          doc.id,
          doc.userId,
          doc.movieId,
          doc.addedAt,
          doc.watched,
          doc.priority
        )
    )
  }
}
