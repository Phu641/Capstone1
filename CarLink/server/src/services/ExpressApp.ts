import express, { Application } from 'express';
const morgan = require('morgan');
import path from 'path';
import { CustomerRoute, EyesBookingRoute } from '../routes';

export default async (app: Application) => {

    app.use(morgan('common'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/customer', CustomerRoute);
    app.use('/searching', EyesBookingRoute);

    return app;

}
