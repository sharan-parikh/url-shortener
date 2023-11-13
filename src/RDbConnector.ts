import { Sequelize, SequelizeOptions } from "sequelize-typescript";

export class RDbConnector {

    private static sequelize: Sequelize;

    static connect =  async () => {
        if(!RDbConnector.sequelize) {
            const dbOptions: SequelizeOptions = {
                database: process.env.DATABASE_NAME,
                host: process.env.DATABASE_HOST || 'localhost',
                port: Number(process.env.DATABASE_PORT)
            };
            RDbConnector.sequelize = new Sequelize(dbOptions);
        }
        await RDbConnector.sequelize.authenticate();
        return RDbConnector.sequelize;
    };
        
}