import express from 'express';
import { UserModel } from './models/userModel';
import { UrlModel } from './models/urlModel';
import { TierModel } from './models/tierModel';
import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
dotenv.config();
import { authErrorHandler, defaultErrorHandler } from './middlewares/errorHandlers';
import { urlRouter } from './routes/urlRouter';
import { checkJWT, setUserNameHandler } from './middlewares/authHandlers';
import { container } from './inversify.config';
import TYPES from './types';

// extending the Request interface provided by Express
declare global {
  namespace Express {
    export interface Request {
      username?: string;
    }
  }
}

const port = 8080;
const app = express();
setUp();

async function setUp() {
  try {
    await testDbConnection();
    if (process.env.SHORT_BASE_URL) {
      throw new Error('SHORT_BASE_URL environment variable not set!');
    }
    setUpRoutes();
    app.listen(port, () => {
      console.log(`Server is runnning on port: ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

async function testDbConnection() {
  const db = container.get<Sequelize>(TYPES.Sequelize);
  await db.authenticate();
  db.addModels([TierModel, UserModel, UrlModel]);
}

async function setUpRoutes() {
  app.use(express.json());
  app.use(checkJWT);
  app.use(authErrorHandler);
  app.use(setUserNameHandler);
  app.use('/url', urlRouter);
  app.use(defaultErrorHandler);
}
