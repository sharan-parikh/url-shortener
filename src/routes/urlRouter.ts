import express from 'express';
import { validateFormat } from '../utils/urlUtils';
import urlExist from 'url-exist';
import { container } from '../inversify.config';
import { UrlServiceImpl } from '../services/urlServiceImpl';
import TYPES from '../types';
import { requiredScopes } from 'express-oauth2-jwt-bearer';

export const urlRouter = express.Router();
const urlService = container.get<UrlServiceImpl>(TYPES.UrlService);

urlRouter.get('/history', requiredScopes('read:urls'), async (req, res) => {
  const urls = await urlService.getHistory(req.username);

  res.status(200).json({
    message: 'Url history successfully fetched.',
    urls: urls.map(url => url.originalUrl),
  });
});

urlRouter.post('/shorten', requiredScopes('create:urls'), async (req, res) => {
  const { originalUrl, shortId } = req.body;

  if (originalUrl) {
    if (!validateFormat(originalUrl)) {
      return res.status(400).json({
        message: 'Either of the urls provided were either malformed.',
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
});

urlRouter.get('/:shortId', requiredScopes('read:urls'), async (req, res) => {
  const shortId: string = req.params.shortId;

  const url = await urlService.getUrl(req.username, shortId, true);
  res.redirect(url.originalUrl);
});
