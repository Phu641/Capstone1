import express, { Application } from 'express';
const morgan = require('morgan');
import path from 'path';
import { CustomerRoute } from '../routes';

export default async (app: Application) => {

    app.use(morgan('common'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/customer', CustomerRoute);

    return app;

}
