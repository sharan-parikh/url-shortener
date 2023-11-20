import { User } from '../models/user';
import { Repo } from './baseRepository';

export interface UserRepository extends Repo<User> {
  getAll(): Promise<User[]>;

  getUser(username: string): Promise<User>;

  save(user: User): Promise<User>;

  update(user: User): Promise<User>;
}
