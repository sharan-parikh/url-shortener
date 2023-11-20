import { Dialect } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

export const db = new Sequelize({
  dialect: process.env.DATABASE_DIALECT as Dialect,
  username: process.env.DATABASE_USERNAME,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT),
  password: process.env.DATABASE_PASSWORD,
  define: {
    createdAt: false,
    updatedAt: false,
  },
});
