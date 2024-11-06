import express from 'express';
import dbConnection from './services/DatabaseConnection';
import App from './services/ExpressApp';
import path from 'path';
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, './.env') });

const StartServer = async() => {

  const app = express();
  app.use(cors());

  await dbConnection();

  await App(app);

  app.listen(process.env.PORT, () => {
      console.log(`Listening to port ${process.env.PORT}`);
  });

  console.log(process.env.DB_PASS);


}

StartServer();

