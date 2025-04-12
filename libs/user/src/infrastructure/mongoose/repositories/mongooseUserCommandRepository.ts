import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCommandRepository } from '../../../domain/ports/userCommandRepository';
import { User } from '../../../domain/entities/user';
import { UserModel } from '../schemas/userSchema';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

export class MongooseUserCommandRepository implements UserCommandRepository {
  constructor(
    @InjectModel('users')
    private readonly model: Model<UserModel>,
  ) {}

  async update(
    userId: string,
    updates: { username?: string; password?: string; bio?: string; userId: string }
  ): Promise<User> {
    const found = await this.model.findById(userId).exec();
    if (!found) throw new NotFoundException('User not found');

    if (found.id !== updates.userId) {
      throw new UnauthorizedException('Unauthorized to update this user');
    }

    if (updates.username !== undefined) found.username = updates.username;
    if (updates.password !== undefined) found.password = updates.password;
    if (updates.bio !== undefined) found.bio = updates.bio;

    const saved = await found.save();

    return new User(
      saved.id,
      saved.username,
      saved.email,
      saved.password,
      saved.bio
    );
  }

  async delete(userId: string, requestingUserId: string): Promise<boolean> {
    const found = await this.model.findById(userId).exec();
    if (!found) throw new NotFoundException('User not found');

    if (found.id !== requestingUserId) {
      throw new UnauthorizedException('Unauthorized to delete this user');
    }

    const result = await this.model.deleteOne({ _id: userId }).exec();
    return result.deletedCount > 0;
  }
}
