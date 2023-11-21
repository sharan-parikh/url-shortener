import express from 'express';
import { validateFormat } from '../utils/urlUtils';
import { container } from '../inversify.config';
import { UrlServiceImpl } from '../services/urlServiceImpl';
import TYPES from '../types';
import { requiredScopes } from 'express-oauth2-jwt-bearer';

export const urlRouter = express.Router();
const urlService = container.get<UrlServiceImpl>(TYPES.UrlService);

urlRouter.get('/history', requiredScopes('read:urls'), async (req, res, next) => {
  try {
    const urls = await urlService.getHistory(req.username);

    res.status(200).json({
      message: 'Url history successfully fetched.',
      urls: urls.map(url => url.originalUrl),
    });
  } catch (err) {
    next(err);
  }
});

urlRouter.post('/shorten', requiredScopes('create:urls'), async (req, res, next) => {
  const { originalUrl, shortId } = req.body;

  try {
    if (originalUrl) {
      if (!validateFormat(originalUrl)) {
        return res.status(400).json({
          message: 'Any one or both the urls provided are malformed.',
        });
      }
    } else {
      res.status(400).json({
        message: 'Url to shorten was absent in the request.',
      });
    }
    const url = await urlService.createShortUrl(req.username, originalUrl, shortId);
    res.status(200).json({
      message: 'Url shortened successfully',
      shortUrl: `${process.env.TOKEN_AUDIENCE}/${url.shortId}`,
    });
  } catch (err) {
    next(err);
  }
});

urlRouter.get('/:shortId', requiredScopes('read:urls'), async (req, res, next) => {
  try {
    const shortId: string = req.params.shortId;
    const url = await urlService.getUrl(req.username, shortId, true);
    res.redirect(url.originalUrl);
  } catch (err) {
    next(err);
  }
});
