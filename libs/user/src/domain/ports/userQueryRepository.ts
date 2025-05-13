import { User } from '@moviebuddy/shared';

export interface UserQueryRepository {
  findById(id: string): Promise<User | null>;
}
