import express from 'express';
import { AcceptBooking, AcceptCar, ApproveWithdrawalRequest, ConfirmComplete, ConfirmWithdraw, DeleteCar, DeleteUser, GetACar, getAllBookingCompleted, GetAllBookings, GetAllCars, GetAllCompleteReports, GetAllPendingBookings, GetAllPendingReports, GetAllUsers, GetAnUser, GetApprovedOrCompletedWithdrawals, GetCarSAvailability, GetPendingWithdrawals, GetReportById } from '../controllers/AdminController';
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

//GET ALL CARS  WAS NOT AVAILABLE
router.get('/all-cars', GetAllCars as any);

//GET ALL CARS  WAS AVAILABLE
router.get('/all-cars-availability', GetCarSAvailability as any);

//GET A CAR
router.get('/car/:id', GetACar as any);

//DELETE (DECLINE) CAR
router.delete('/car/:id', DeleteCar as any);

//ACCEPT CAR
router.patch('/car/:id', AcceptCar as any);

//GET ALL BOOKING
router.get('/all-bookings', GetAllBookings as any);

//GET ALL PENDING BOOKING
router.get('/all-pending-bookings', GetAllPendingBookings as any);

//ACCEPT BOOKING
router.patch('/booking', AcceptBooking as any);

router.get('/booking-completed', getAllBookingCompleted as any);

//GET ALL REPORTS
router.get('/all-reports', GetAllPendingReports as any);

//GET ALL REPORTS
router.get('/all-reports-complete', GetAllCompleteReports as any);

//GET A REPORT
router.get('/report/:id', GetReportById as any);

//CONFIRM COMPLETE
router.put('/confirm-report/:id', ConfirmComplete as any);

//GET PENDING WITHDRAW
router.get('/pending-withdraw', GetPendingWithdrawals as any);

//GET COMPLETED WITHDRAW
router.get('/completed-withdraw', GetApprovedOrCompletedWithdrawals as any);

//APPROVE WITHDRAW REQUEST
router.put('/approve-withdraw/:id', ApproveWithdrawalRequest as any);

//CONFIRM WITHDRAW
router.put('/confirm-withdraw', ConfirmWithdraw as any);

//UPDATE WALLET
//router.post('/update-wallet', updateWallet as any);

export { router as AdminRoute}