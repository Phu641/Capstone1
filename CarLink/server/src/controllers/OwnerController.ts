import { Request, Response, NextFunction } from "express";
import { CreateCarInputs } from "../dto";
import { FindOwner } from "./AdminController";
import { Car, Coordinate, Images, Overview } from "../models";
import { getCoordinates } from "../utility";




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
                booked: false,
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

            try {
                // Get coordinates for the address
                const coordinates = await getCoordinates(address);
                console.log(coordinates);

                // Save coordinates to the Coordinate model
                await Coordinate.create({
                    carID: createdCar.carID,
                    latitude: coordinates.latitude, // Use correct latitude
                    longitude: coordinates.longitude // Use correct longitude
                });
            } catch (error) {
                console.error("Không thể lấy tọa độ:", error);
                return res.status(500).json({
                    message: "Đã xảy ra lỗi khi lấy tọa độ. Vui lòng kiểm tra địa chỉ nhập vào."
                });
            }

           return res.status(200).json(resultCar);

        }

    }

    return res.status(500).json('Đã có lỗi xảy ra với việc thêm xe!');

}

//UPDATE CAR
