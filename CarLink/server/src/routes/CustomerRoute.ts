import express from 'express';
import { CustomerLogIn, CustomerSignUp, CustomerVerify, EditCustomerProfile, GetCustomerProfile, onRequestOTP, GetCurrentRole, addToFavorite, getAllCarsFavorite, BookCar, createPayment, handlePayOSCallback, cancelPayment, ForgotPassword, ResetPassword, GetLoyalPoints, GetAllCompleltedBookings, GetAllHistoryBookings} from '../controllers';
import { Authenticate } from '../middlewares';

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//SIGN UP
router.post('/signup', CustomerSignUp as any);

//LOGIN
router.post('/login', CustomerLogIn as any);

//UPDATE BALANCE
router.post('/update-balance', handlePayOSCallback as any);

//FORGOT PASSWORD
router.post('/forgot-password', ForgotPassword as any);

//RESET PASSWORD
router.post('/reset-password', ResetPassword as any);


//AUTHENTICATION
router.use(Authenticate as any);

//GET LOYAL POINT
router.get('/loyal-points', GetLoyalPoints as any);

//GET OTP
router.get('/otp', onRequestOTP as any);

//VERIFY USER
router.post('/verify', CustomerVerify as any);

//VIEW PROFILE
router.get('/profile', GetCustomerProfile as any);

//EDIT CUSTOMER PROFILE
router.patch('/profile', EditCustomerProfile as any);

//GET CURRENT ROLE
router.get('/check-role', GetCurrentRole as any); 

//ADD (REMOVE) TO FAVORITE
router.post('/add-favorite/:id', addToFavorite as any);

//ADD (REMOVE) TO FAVORITE
router.get('/cars-favorite', getAllCarsFavorite as any);

//BOOK CAR
router.post('/book-car', BookCar as any);

//CREATE PAYMENT
router.post('/create-payment', createPayment as any);

//BOOKING HISTORY
router.get('/booking-history', GetAllHistoryBookings as any)

//GET MONEY
// router.get('/get-money', testMoney as any);




export { router as CustomerRoute}