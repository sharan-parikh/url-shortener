import { Container } from 'inversify';
import { UserRepository } from './repositories/userRepository';
import TYPES from './types';
import { UrlDao } from './repositories/urlDao';
import { UserDao } from './repositories/userDao';
import { UrlRepository } from './repositories/urlRepository';
import { UrlService } from './services/urlService';
import { UrlServiceImpl } from './services/urlServiceImpl';
import { db } from './services/RDbConnector';
import { Sequelize } from 'sequelize-typescript';

const container = new Container();
container.bind<UserRepository>(TYPES.UserRepository).to(UserDao).inSingletonScope();
container.bind<UrlRepository>(TYPES.UrlRepository).to(UrlDao).inSingletonScope();
container.bind<UrlService>(TYPES.UrlService).to(UrlServiceImpl).inSingletonScope();
container.bind<Sequelize>(TYPES.Sequelize).toConstantValue(db);

export { container };
