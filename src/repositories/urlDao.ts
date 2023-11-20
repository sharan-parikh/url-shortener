import { Sequelize } from 'sequelize-typescript';
import { ShortUrl } from '../models/shortUrl';
import { UrlModel } from '../models/urlModel';
import { UrlRepository } from './urlRepository';
import { UserRepository } from './userRepository';
import { inject, injectable } from 'inversify';
import TYPES from '../types';

@injectable()
export class UrlDao implements UrlRepository {
  @inject(TYPES.UserRepository)
  private _userDao: UserRepository;

  async exists(t: ShortUrl): Promise<boolean> {
    return !!(await UrlModel.findOne({
      where: {
        userId: t.userId,
        shortId: t.shortId,
      },
    }));
  }

  async delete(t: ShortUrl): Promise<any> {
    return await UrlModel.destroy({
      where: {
        shortId: t.shortId,
        userId: t.userId,
      },
    });
  }

  async getUrl(username: string, shortId: string): Promise<ShortUrl> {
    const user = await this._userDao.getUser(username);
    const urlModel = await UrlModel.findOne({
      where: {
        userId: user.id,
        shortId,
      },
    });
    return {
      userId: user.id,
      username: user.username,
      originalUrl: urlModel.originalUrl,
      shortId: urlModel.shortId,
    };
  }

  async getUrls(username: string): Promise<ShortUrl[]> {
    const user = await this._userDao.getUser(username);
    const urlModels = await UrlModel.findAll({
      where: {
        userId: user.id,
      },
    });
    const urls: ShortUrl[] = [];
    urlModels.forEach(urlModel => {
      urls.push({
        username,
        originalUrl: urlModel.originalUrl,
        shortId: urlModel.shortId,
      });
    });
    return urls;
  }

  async getDistinctOriginalUrls(username: string): Promise<ShortUrl[]> {
    const user = await this._userDao.getUser(username);
    const urlModels = await UrlModel.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('original_url')), 'originalUrl']],
      where: {
        userId: user.id,
      },
    });
    const urls: ShortUrl[] = [];
    urlModels.forEach(urlModel => {
      urls.push({
        username,
        originalUrl: urlModel.originalUrl,
        shortId: urlModel.shortId,
      });
    });
    return urls;
  }

  async save(url: ShortUrl): Promise<ShortUrl> {
    const urlModel = new UrlModel({
      userId: url.userId,
      originalUrl: url.originalUrl,
      shortId: url.shortId,
    });
    const savedModel = await urlModel.save();
    return {
      username: url.username,
      originalUrl: savedModel.originalUrl,
      shortId: savedModel.shortId,
    };
  }
}
