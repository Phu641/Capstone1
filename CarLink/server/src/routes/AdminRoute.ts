import express from 'express';
import { AcceptCar, DeleteCar, DeleteUser, GetACar, GetAllCars, GetAllUsers, GetAnUser } from '../controllers/AdminController';
import { AdminMiddleware, Authenticate } from '../middlewares';

const router = express.Router();

//AUTHENTICATION
router.use(Authenticate as any);

router.use(AdminMiddleware as any);

//GET ALL USERS
router.get('/all-users', GetAllUsers as any);

//GET A USER
router.get('/user/:id', GetAnUser as any);

//DELETE USER
router.delete('/user/:id', DeleteUser as any);

//GET ALL CARS
router.get('/all-cars', GetAllCars as any);

//GET A CAR
router.get('/car/:id', GetACar as any);

//DELETE (DECLINE) CAR
router.delete('/car/:id', DeleteCar as any);

//ACCEPT CAR
router.patch('/car/:id', AcceptCar as any);

export { router as AdminRoute}