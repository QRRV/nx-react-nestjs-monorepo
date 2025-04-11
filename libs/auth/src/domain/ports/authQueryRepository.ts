import { User } from '@moviebuddy/user';

export interface AuthQueryRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
