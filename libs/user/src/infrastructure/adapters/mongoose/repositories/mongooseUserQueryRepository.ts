import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@moviebuddy/shared';
import { UserModel } from '../schemas/userSchema';
import { UserQueryRepository } from '../../../../domain/ports/userQueryRepository';

export class MongooseUserQueryRepository implements UserQueryRepository {
  constructor(
    @InjectModel('users')
    private readonly model: Model<UserModel>,
  ) {}

  async findById(id: string): Promise<User | null> {
    const found = await this.model.findById(id).exec();
    if (!found) return null;

    return new User(
      found.id,
      found.username,
      found.email,
      found.password,
      found.bio,
      found.role
    );
  }
}
