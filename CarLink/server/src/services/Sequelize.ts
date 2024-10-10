import { Sequelize } from 'sequelize-typescript';
import { Customer, Car, Favorite, Role, Comment, Booking, Transaction, Images } from '../models';
import {DB_DIALECT, DB_HOST, DB_NAME, DB_PASSWORD, DB_USER} from '../config/index';


const sequelize = new Sequelize({
  dialect: DB_DIALECT,
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  models: [Customer, Car, Favorite, Role, Comment, Booking, Transaction, Images], // Đưa các models vào đây
  logging: false, // Tắt logging (tùy chọn)
});

export default sequelize;
