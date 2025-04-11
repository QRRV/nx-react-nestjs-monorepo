import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'users' })
export class AuthUserModel {
  @Prop({ required: true })
  _id!: string;

  @Prop({ required: true })
  username!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: true })
  bio!: string;
}

export const AuthUserSchema = SchemaFactory.createForClass(AuthUserModel);
