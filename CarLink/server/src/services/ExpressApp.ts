import express, { Application } from 'express';
const morgan = require('morgan');
import path from 'path';
import { AdminRoute, CustomerRoute, EyesBookingRoute, OwnerRoute } from '../routes';

export default async (app: Application) => {

    app.use(morgan('common'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/admin', AdminRoute);
    app.use('/customer', CustomerRoute);
    app.use('/searching', EyesBookingRoute);
    app.use('/owner', OwnerRoute);

    return app;

}
