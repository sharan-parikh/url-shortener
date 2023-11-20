import { ShortUrl } from '../models/shortUrl';

export interface UrlService {
  createShortUrl(username: string, originalUrl: string): Promise<ShortUrl>;
  getUrl(username: string, shortId: string, incRequestCount: boolean): Promise<ShortUrl>;
  getHistory(username: string): Promise<ShortUrl[]>;
}
