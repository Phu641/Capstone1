import { Sequelize } from 'sequelize-typescript';
import { Customer, Car, Favorite, Role, Comment, Booking, Transaction, Images, Overview, Report } from '../models';
const dotenv = require('dotenv');
import path from 'path';
import { DB_PASSWORD } from '../config';
dotenv.config({ path: path.resolve(__dirname, '.././.env') });


const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: DB_PASSWORD as any,
  database: process.env.DB_NAME,
  models: [Customer, Car, Favorite, Role, Comment, Booking, Transaction, Images, Overview, Report], // Đưa các models vào đây
  logging: false, // Tắt logging (tùy chọn)
});

export default sequelize;
