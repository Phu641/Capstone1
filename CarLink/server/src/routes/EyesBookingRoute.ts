import express from 'express';

const router = express.Router();


//CAR AVAILABILITY
router.get('/cars');

//DETAIL
router.get('/car/:id');




export {router as EyesBookingRoute}