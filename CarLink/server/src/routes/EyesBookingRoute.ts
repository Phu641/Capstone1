import express from 'express';
import { GetCarAvailability, GetCarByID, GetCarByLocation } from '../controllers';

const router = express.Router();


//CAR AVAILABILITY
router.get('/cars', GetCarAvailability as any);

//DETAIL
router.get('/car/:id', GetCarByID as any);

//SEARCH CARS BY LOCATION
router.post('/cars-by-location', GetCarByLocation as any);

export { router as EyesBookingRoute }