import express from "express";
import { GetAllCars } from "../controllers";

const router = express.Router();

//CAR AVAILABILITY
router.get("/cars", GetAllCars as any);

//DETAIL
router.get("/car/:id");

export { router as EyesBookingRoute };
