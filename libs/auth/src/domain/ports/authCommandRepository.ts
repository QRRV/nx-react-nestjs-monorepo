import { User } from '@moviebuddy/user';

export interface AuthCommandRepository {
  create(user: User): Promise<User>;
}
