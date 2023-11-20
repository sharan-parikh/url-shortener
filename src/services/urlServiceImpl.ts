import { Sequelize, Transaction } from 'sequelize';
import { ShortUrl } from '../models/shortUrl';
import { getRandomShortId } from '../utils/urlUtils';
import { BadRequestError, MAXIMUM_REQUESTS_REACHED_MESSAGE } from '../errors';
import { User } from '../models/user';
import { UserRepository } from '../repositories/userRepository';
import { inject, injectable } from 'inversify';
import TYPES from '../types';
import { UrlRepository } from '../repositories/urlRepository';
import { UrlService } from './urlService';

@injectable()
export class UrlServiceImpl implements UrlService {
  @inject(TYPES.UserRepository)
  private _userDao: UserRepository;

  @inject(TYPES.UrlRepository)
  private _urlDao: UrlRepository;

  @inject(TYPES.Sequelize)
  private _db: Sequelize;

  async createShortUrl(
    username: string,
    originalUrl: string,
    customShortId?: string,
  ): Promise<ShortUrl> {
    const t = await this._db.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
    });
    try {
      const user = await this._userDao.getUser(username);

      if (this.checkIfMaxRequestsReached(user)) {
        throw new BadRequestError({ message: MAXIMUM_REQUESTS_REACHED_MESSAGE });
      }

      const shortUrl: ShortUrl = {
        userId: user.id,
        username: user.username,
        originalUrl,
        shortId: customShortId || getRandomShortId(),
      };
      const saveUrlModel = await this._urlDao.save(shortUrl);

      this._userDao.update({
        username: saveUrlModel.username,
        id: saveUrlModel.userId,
        requestCount: user.requestCount + 1, // increase request count by 1.
      });

      t.commit();
      return {
        originalUrl: saveUrlModel.originalUrl,
        shortId: saveUrlModel.shortId,
        username: saveUrlModel.username,
      };
    } catch (err) {
      t.rollback();
      throw err; // rethrow error.
    }
  }

  async getUrl(username: string, shortId: string, incRequestCount: boolean): Promise<ShortUrl> {
    const t = await this._db.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
    });
    try {
      const user = await this._userDao.getUser(username);
      if (this.checkIfMaxRequestsReached(user)) {
        throw new BadRequestError({ message: MAXIMUM_REQUESTS_REACHED_MESSAGE });
      }
      const shortUrl = await this._urlDao.getUrl(username, shortId);

      if (incRequestCount) {
        this._userDao.update({
          username: user.username,
          id: user.id,
          requestCount: user.requestCount + 1, // increase request count by 1.
        });
      }
      t.commit();
      return shortUrl;
    } catch (err) {
      t.rollback();
      throw err;
    }
  }

  async getHistory(username: string): Promise<ShortUrl[]> {
    const t = await this._db.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
    });

    try {
      const user = await this._userDao.getUser(username);
      if (this.checkIfMaxRequestsReached(user)) {
        throw new BadRequestError({ message: MAXIMUM_REQUESTS_REACHED_MESSAGE });
      }
      const urls = await this._urlDao.getDistinctOriginalUrls(username);
      return urls;
    } catch (err) {
      t.rollback();
      throw err;
    }
  }

  private checkIfMaxRequestsReached(user: User): boolean {
    return user.requestCount >= user.maxRequestsAllowed;
  }
}
