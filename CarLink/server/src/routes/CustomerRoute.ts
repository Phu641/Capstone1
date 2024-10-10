import express from 'express';
import { CustomerSignUp } from '../controllers';

const router = express.Router();

//SIGN UP
router.post('/signup', CustomerSignUp);

//LOGIN
//router.post('/login', );


export { router as CustomerRoute}