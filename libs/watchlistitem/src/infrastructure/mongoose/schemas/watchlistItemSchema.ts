import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ collection: 'watchlistitems' })
export class WatchlistItemModel extends Document {
  @Prop({ required: true })
  override _id!: string

  @Prop({ required: true })
  userId!: string

  @Prop({ required: true })
  movieId!: string

  @Prop({ required: true })
  addedAt!: Date

  @Prop({ required: true })
  watched!: boolean

  @Prop({ required: true })
  priority!: number

}

export const WatchlistItemSchema = SchemaFactory.createForClass(WatchlistItemModel)
