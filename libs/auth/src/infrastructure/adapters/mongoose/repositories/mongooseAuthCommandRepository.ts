import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthUserModel } from '../schemas/authUserSchema';
import { User } from '@moviebuddy/shared';

import { AuthCommandRepository } from '../../../../domain/ports/authCommandRepository';
import { ConflictException } from '@nestjs/common';

export class MongooseAuthCommandRepository implements AuthCommandRepository {
  constructor(
    @InjectModel('users') private readonly model: Model<AuthUserModel>
  ) {}

  async create(user: User): Promise<User> {
    try {
      const created = new this.model({
        _id: user.id,
        username: user.username,
        email: user.email,
        password: user.password,
        bio: user.bio,
        role: user.role
      });

      const saved = await created.save();

      return new User(
        saved.id,
        saved.username,
        saved.email,
        saved.password,
        saved.bio,
        saved.role
      );
    } catch (err: unknown) {
      if (
        typeof err === 'object' &&
        err !== null &&
        'code' in err &&
        (err as any).code === 11000 &&
        (err as any).keyPattern?.email
      ) {
        throw new ConflictException('Email address already in use');
      }

      throw err;
    }
  }
}
