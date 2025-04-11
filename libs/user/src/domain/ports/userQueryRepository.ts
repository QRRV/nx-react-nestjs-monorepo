import { User } from '../entities/user';

export interface UserQueryRepository {
  findById(id: string): Promise<User | null>;
}
