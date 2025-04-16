import { Role } from '../enums/Role';

export interface User {
  id: string;
  username: string;
  email: string;
  bio: string;
  role: Role;
}
