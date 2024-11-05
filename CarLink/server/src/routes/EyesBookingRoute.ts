import express from 'express';
import { GetCarAvailability, GetCarByID } from '../controllers';

const router = express.Router();


//CAR AVAILABILITY
router.get('/cars', GetCarAvailability as any);

//DETAIL
router.get('/car/:id', GetCarByID as any);



export {router as EyesBookingRoute}