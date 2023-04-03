import dotenv from 'dotenv'
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import models from './models';

dotenv.config({ path: __dirname + '/../../../../.env' });

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env
console.log(__dirname)
console.log(POSTGRES_PASSWORD)
const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  models,
};

export const sequelize = new Sequelize(sequelizeOptions);

export async function dbConnect() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log('  ➜ 🎸 Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
