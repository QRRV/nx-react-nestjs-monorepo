import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthUserModel } from '../schemas/authUserSchema';
import { User } from '@moviebuddy/shared';
import { AuthQueryRepository } from '../../../../domain/ports/authQueryRepository';

export class MongooseAuthQueryRepository implements AuthQueryRepository {
  constructor(
    @InjectModel('users') private readonly model: Model<AuthUserModel>
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.model.findOne({ email }).exec();
    if (!user) return null;

    return new User(
      user.id,
      user.username,
      user.email,
      user.password,
      user.bio,
      user.role
    );
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.model.findById(id).exec();
    if (!user) return null;

    return new User(
      user.id,
      user.username,
      user.email,
      user.password,
      user.bio,
      user.role
    );
  }
}
