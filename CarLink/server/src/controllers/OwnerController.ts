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

// UPDATE CAR
export const UpdateCar = async (req: Request, res: Response, next: NextFunction) => {
    
    const user = req.user;

    if (user) {
        const { 
            carID, 
            delivery, 
            selfPickUp, 
            isAvailable, 
            pricePerDay, 
            address, 
            model, 
            type, 
            year, 
            transmission, 
            fuelType, 
            seats, 
            description 
        } = req.body;

        try {
            // Find the car and its related overview
            const car = await Car.findOne({ where: { carID, customerID: user.customerID } });
            const overview = await Overview.findOne({ where: { carID } });

            if (!car || !overview) {
                return res.status(404).json({ message: "Không tìm thấy xe hoặc thông tin chi tiết xe." });
            }

            // Update car information
            if (delivery !== undefined) car.delivery = delivery;
            if (selfPickUp !== undefined) car.selfPickUp = selfPickUp;
            if (isAvailable !== undefined) car.isAvailable = isAvailable;

            // Update overview information
            if (pricePerDay !== undefined) overview.pricePerDay = pricePerDay;
            if (model !== undefined) overview.model = model;
            if (type !== undefined) overview.type = type;
            if (year !== undefined) overview.year = year;
            if (transmission !== undefined) overview.transmission = transmission;
            if (fuelType !== undefined) overview.fuelType = fuelType;
            if (seats !== undefined) overview.seats = seats;
            if (description !== undefined) overview.description = description;

            // Update address and coordinates if address is provided
            if (address) {
                overview.address = address;
                try {
                    const coordinates = await getCoordinates(address);
                    await Coordinate.update(
                        {
                            latitude: coordinates.latitude,
                            longitude: coordinates.longitude
                        },
                        { where: { carID } }
                    );
                } catch (error) {
                    console.error("Không thể lấy tọa độ:", error);
                    return res.status(500).json({
                        message: "Đã xảy ra lỗi khi cập nhật tọa độ. Vui lòng kiểm tra địa chỉ nhập vào."
                    });
                }
            }

            // Handle image updates
            const files = req.files as [Express.Multer.File];
            if (files && files.length > 0) {
                // Delete old images if needed (optional, depending on your requirements)
                await Images.destroy({ where: { carID } });

                // Save new images
                const imagePromises = files.map((file) => {
                    return Images.create({
                        carID,
                        imageUrl: file.filename
                    });
                });
                await Promise.all(imagePromises);
            }

            // Save updated car and overview
            await car.save();
            await overview.save();

            return res.status(200).json({ message: "Cập nhật thông tin xe thành công." });
        } catch (error) {
            console.error("Lỗi khi cập nhật xe:", error);
            return res.status(500).json({ message: "Đã xảy ra lỗi khi cập nhật xe." });
        }
    }

    return res.status(401).json({ message: "Người dùng không được xác thực." });
};
