import { Request, Response, NextFunction } from "express";
import { CreateCarInputs } from "../dto";
import { FindOwner } from "./AdminController";
import { Car, Images, Overview } from "../models";




//ADD CAR
export const AddCar = async(req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    if(user) {

        const { 
            delivery,
            selfPickUp,
            model, 
            type, 
            year,
            transmission,
            fuelType,
            seats,
            pricePerDay, 
            address, 
            description 
        } = <CreateCarInputs>req.body;
        
        
        const owner = await FindOwner(user.customerID);

        if(owner) {

            const files = req.files as [Express.Multer.File];

            const createdCar = await Car.create({
                customerID: owner.customerID,
                delivery,
                selfPickUp,
                isAvailable: false
            })

            const createdOverview = await Overview.create({
                carID: createdCar.carID,
                model, 
                type, 
                year, 
                transmission,
                fuelType, 
                seats, 
                pricePerDay, 
                address, 
                description
            });
            
            const resultCar = await createdCar.save();
            await createdOverview.save();

            // Save images to Image model
            const images = files.map((file) => {
                return Images.create({
                    carID: resultCar.carID, // Link image to the created car
                    imageUrl: file.filename
                });
            });

            // Wait for all images to be saved
            await Promise.all(images);

           return res.status(200).json(resultCar);

        }

    }

    return res.status(500).json('Đã có lỗi xảy ra với việc thêm xe!');

}

//UPDATE CAR
