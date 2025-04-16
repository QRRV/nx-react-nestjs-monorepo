import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ collection: 'movies' })
export class MovieModel extends Document {
  @Prop({ required: true })
  override _id!: string

  @Prop({ required: true })
  title!: string

  @Prop({ required: true })
  description!: string

  @Prop({ required: true })
  releaseDate!: Date

  @Prop({ type: [String], required: true })
  genres!: string[]
}

export const MovieSchema = SchemaFactory.createForClass(MovieModel)
