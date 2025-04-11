import { User } from '../entities/user';

export interface UserCommandRepository {
  create(user: User): Promise<User>;
  update(
    userId: string,
    updates: { username?: string; password?: string; bio?: string; userId: string }
  ): Promise<User>;
  delete(userId: string, requestingUserId: string): Promise<boolean>;
}
