import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../errors';

export const authErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'UnauthorizedError' || err.name === 'InvalidTokenError') {
    console.error(err);
    res.status(401).json({ message: 'User authentication failed.' });
  } else {
    next(err);
  }
};

export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if (err instanceof BadRequestError) {
    res.status(err.statusCode).json({
      message: err.message,
    });
  } else {
    res.status(500).json({
      message: 'Something went wrong.',
    });
  }
};
