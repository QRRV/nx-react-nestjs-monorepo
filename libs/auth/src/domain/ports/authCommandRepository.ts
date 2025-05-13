import { User } from '@moviebuddy/shared';

export interface AuthCommandRepository {
  create(user: User): Promise<User>;
}
