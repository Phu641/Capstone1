import express from "express";
import { AddCar, GetCarsByOwner, SubmitReport, UpdateCar } from "../controllers";
import multer from 'multer';
import { Authenticate, uploadVideo } from "../middlewares";

const router = express.Router();

const fs = require('fs');
const path = require('path');

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.join(__dirname, '..' , 'images');
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

//SUBMIT REPORT
router.put('/submit-report', uploadVideo, SubmitReport as any);

export { router as OwnerRoute }