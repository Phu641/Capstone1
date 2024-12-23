import express from "express";
import { AcceptBookingForOwner, AddCar, CreateWithdrawalRequest, GetActiveBookings, GetAllBookingBookingsForOwner, GetAllBookingsForOwner, GetAllCompleltedBookings, GetAllPendingBookingsForOwner, GetCarsByOwner, StartService, StopService, SubmitReport, UpdateCar, ViewBalance } from "../controllers";
import multer from 'multer';
import { Authenticate, uploadVideo } from "../middlewares";

const router = express.Router();

const fs = require('fs');
const path = require('path');

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.join(__dirname, '..', 'images');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '_' + file.originalname);
    }
});

const images = multer({ storage: imageStorage }).array('images', 10);


//MIDDLEWARE AUTHENTICATION & AUTHORIZATION
router.use(Authenticate as any);

//ADD CAR
router.post('/add-car', images as any, AddCar as any);

//GET ALL THEIR OWN CARS
router.get('/all-cars', GetCarsByOwner as any);

//UPDATE CAR
router.put('/update-car', images as any, UpdateCar as any);

//STOP SERVICE
router.put('/stop-service', StopService as any);

//START SERVICE
router.put('/start-service', StartService as any);

//SUBMIT REPORT
router.put('/submit-report', uploadVideo as any, SubmitReport as any);

//GET ACTIVE BOOKINGS
router.get('/active-bookings', GetActiveBookings as any);

//VIEW BALANCE
router.get('/view-balance', ViewBalance as any);

//SEND REQUEST WITHDRAW
router.post('/request-withdraw', CreateWithdrawalRequest as any);

//GET ALL BOOKINGS
router.get('/all-bookings', GetAllBookingsForOwner as any);

//GET ALL BOOKINGS
router.get('/all-pending-bookings', GetAllPendingBookingsForOwner as any);

//GET ALL BOOKINGS
router.get('/all-booking-bookings', GetAllBookingBookingsForOwner as any);

//GET ALL BOOKINGS
router.get('/all-completed-bookings', GetAllCompleltedBookings as any);

//ACCEPT BOOKING
router.put('accept-booking', AcceptBookingForOwner as any);


export { router as OwnerRoute }