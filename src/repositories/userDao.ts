import { TierModel } from '../models/tierModel';
import { User } from '../models/user';
import { UserModel } from '../models/userModel';
import { UserRepository } from './userRepository';
import { injectable } from 'inversify';

@injectable()
export class UserDao implements UserRepository {
  async getAll(): Promise<User[]> {
    try {
      const users: User[] = [];
      const userModels = await UserModel.findAll();
      userModels.forEach(model => {
        users.push({
          id: model.id,
          username: model.username,
          requestCount: model.requestCount,
        });
      });
      return users;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to fetch all users from database');
    }
  }

  async getUser(username: string): Promise<User | undefined> {
    try {
      const userModel = await UserModel.findOne({
        attributes: ['id', 'username'],
        where: {
          username: username,
        },
        include: [TierModel],
      });
      if (userModel) {
        return {
          id: userModel.id,
          username: userModel.username,
          requestCount: userModel.requestCount,
          maxRequestsAllowed: userModel.tier.maxRequestsAllowed,
        };
      }
    } catch (err) {
      console.error(err);
      throw new Error(`Failed to fetch user with username: ${username} from database`);
    }
  }

  async save(user: User): Promise<User> {
    try {
      const savedModel = await UserModel.create({
        tierCode: user.tierCode,
        username: user.username,
        dateCreated: Date.now(),
      });
      return {
        id: savedModel.id,
        username: savedModel.username,
        tierCode: savedModel.tierCode,
        requestCount: savedModel.requestCount,
      };
    } catch (err) {
      console.error(err);
      throw new Error(`User model with username: ${user.username} failed`);
    }
  }

  async update(user: User): Promise<User> {
    try {
      const [affectedCount, updatedModel] = await UserModel.update(
        {
          requestCount: user.requestCount,
        },
        {
          where: {
            id: user.id,
          },
          returning: true,
        },
      );
      if (affectedCount > 0) {
        return updatedModel[0];
      }
    } catch (err) {}
  }

  async exists(t: User): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async delete(t: User): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
