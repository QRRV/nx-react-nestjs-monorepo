import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'reviews' })
export class ReviewModel extends Document {
  @Prop({ required: true })
  override _id!: string;

  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true })
  movieId!: string;

  @Prop({ required: true })
  rating!: number;

  @Prop()
  comment!: string;

  @Prop({ default: Date.now })
  reviewDate!: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
