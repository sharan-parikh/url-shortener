import { NextFunction, Request, Response } from 'express';

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
  res.status(500).json({
    message: 'Something went wrong.',
  });
  next(err);
};
