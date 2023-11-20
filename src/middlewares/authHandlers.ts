import { Request, Response, NextFunction } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';

export const checkJWT = auth({
  issuerBaseURL: process.env.TOKEN_ISSUER_BASE_URL,
  audience: process.env.TOKEN_AUDIENCE,
});

export const setUserNameHandler = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.auth;
  if (!req.auth.payload) {
    res.status(401).json({ message: 'Username is missing in the authentication token' });
  } else {
    const username = auth.payload.azp as string; // azp claim will contain the username.
    req.username = username;
    next();
  }
};
