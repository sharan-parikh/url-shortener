import { ShortUrl } from '../models/shortUrl';
import { Repo } from './baseRepository';

export interface UrlRepository extends Repo<ShortUrl> {
  getUrl(username: string, originalUrl: string): Promise<ShortUrl>;

  getUrls(username: string): Promise<ShortUrl[]>;

  getDistinctOriginalUrls(username: string): Promise<ShortUrl[]>;
}
