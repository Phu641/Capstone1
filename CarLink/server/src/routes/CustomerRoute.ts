import express from "express";
import {
  CustomerLogIn,
  CustomerSignUp,
  CustomerVerify,
  EditCustomerProfile,
  GetCustomerProfile,
  onRequestOTP,
} from "../controllers";
import { Authenticate } from "../middlewares";

const router = express.Router();

//SIGN UP
router.post("/signup", CustomerSignUp as any);

//LOGIN
router.post("/login", CustomerLogIn as any);

//AUTHENTICATION
router.use(Authenticate as any);

//GET OTP
router.get("/otp", onRequestOTP as any);

//VERIFY USER
router.post("/verify", CustomerVerify as any);

//VIEW PROFILE
router.get("/profile", GetCustomerProfile as any);

//EDIT CUSTOMER PROFILE
router.patch("/profile", EditCustomerProfile as any);

export { router as CustomerRoute };
