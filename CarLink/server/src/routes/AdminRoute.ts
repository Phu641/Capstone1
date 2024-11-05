import express from 'express';
import { DeleteCar, DeleteUser, GetACar, GetAllCars, GetAllUsers, GetAnUser } from '../controllers/AdminController';

const router = express.Router();

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

//DELETE USER
router.delete('/car/:id', DeleteCar as any);

export { router as AdminRoute}