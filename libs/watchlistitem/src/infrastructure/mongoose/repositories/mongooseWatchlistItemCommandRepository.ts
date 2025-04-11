import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { WatchlistItemCommandRepository } from '../../../domain/ports/watchlistItemCommandRepository'
import { WatchlistItem } from '../../../domain/entities/watchlistItem'
import { WatchlistItemModel } from '../schemas/watchlistItemSchema'
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

export class MongooseWatchlistItemCommandRepository implements WatchlistItemCommandRepository {
  constructor(
    @InjectModel('watchlistitems')
    private readonly model: Model<WatchlistItemModel>
  ) {}

  async create(item: WatchlistItem): Promise<WatchlistItem> {
    const doc = await this.model.create({
      _id: item.id,
      userId: item.userId,
      movieId: item.movieId,
      addedAt: item.addedAt,
      watched: item.watched,
      priority: item.priority
    })

    return new WatchlistItem(
      doc.id,
      doc.userId,
      doc.movieId,
      doc.addedAt,
      doc.watched,
      doc.priority
    )
  }

  async update(id: string, updates: { userId: string; watched?: boolean; priority?: number }): Promise<WatchlistItem> {
    const found = await this.model.findById(id).exec()
    if (!found) throw new NotFoundException('Watchlist item not found')

    if (found.userId !== updates.userId) {
      throw new UnauthorizedException('Unauthorized to update this watchlist item')
    }

    if (updates.watched !== undefined) {
      found.watched = updates.watched
    }

    if (updates.priority !== undefined) {
      found.priority = updates.priority
    }

    const saved = await found.save()

    return new WatchlistItem(
      saved.id,
      saved.userId,
      saved.movieId,
      saved.addedAt,
      saved.watched,
      saved.priority
    )
  }

  async delete(id: string, userId: string): Promise<'not_found' | 'unauthorized' | 'deleted'> {
    const found = await this.model.findById(id).exec()

    if (!found) return 'not_found'
    if (found.userId !== userId) return 'unauthorized'

    await found.deleteOne()
    return 'deleted'
  }


}
