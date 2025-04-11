import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'users' })
export class UserModel extends Document {
  @Prop({ required: true })
  override _id!: string;

  @Prop({ required: true })
  username!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: true })
  bio!: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
