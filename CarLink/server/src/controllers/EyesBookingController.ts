import express, { Request, Response, NextFunction } from 'express';
import { Car, Overview, Images, Coordinate } from '../models';
import { calculateDistance, getCoordinates } from '../utility';


//GET AVAILABILITY
export const GetCarAvailability = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Car.findAll({
            where: { isAvailable: true },
            include: [
                {
                    model: Overview,
                    attributes: ['model', 'type', 'year', 'transmission', 'fuelType', 'seats', 'pricePerDay', 'address', 'description']
                },
                {
                    model: Images,
                    attributes: ['imageUrl']
                }
            ]
        });

        if (result.length > 0)   return res.status(200).json(result);

        return res.status(400).json('Không tìm thấy xe nào');
    } catch (error) {
        return res.status(500).json('Lỗi! ');
    }
};


//GET CAR BY ID
export const GetCarByID = async(req: Request, res: Response, next: NextFunction) => {

    const ID = req.params.id;

    const result = await Car.findOne({
        where: { carID: ID, isAvailable: true },
        include: [
            {
                model: Overview,
                attributes: ['model', 'type', 'year', 'transmission', 'fuelType', 'seats', 'pricePerDay', 'address', 'description']
            },
            {
                model: Images,
                attributes: ['imageUrl']
            }
        ]
    });

    if(result) return res.status(200).json(result);

    return res.status(400).json('Xe không tồn tại!');

}

//SEARCH CAR BY LOCATION
export const GetCarByLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {address} = req.body;
        console.log("Address input for getCoordinates:", address);

        let userCoordinates = await getCoordinates(address as any);
        console.log("User Coordinates (from getCoordinates):", userCoordinates);

        if (!userCoordinates) {
            return res.status(404).json({ message: "Unable to determine user coordinates." });
        }

        // Chuyển đổi sang số nếu cần thiết
        userCoordinates.latitude = parseFloat(userCoordinates.latitude);
        userCoordinates.longitude = parseFloat(userCoordinates.longitude);
        console.log("User Coordinates (converted):", userCoordinates);

        const coordinates = await Coordinate.findAll();
        console.log("Coordinates from DB:", coordinates);

        const nearbyCars = [];

        for (const coordinate of coordinates) {
            const carID = coordinate.carID;

            const carCoordinates = {
                latitude: coordinate.latitude,
                longitude: coordinate.longitude
            };
            console.log("Car Coordinates:", carCoordinates);

            const distance = await calculateDistance(userCoordinates, carCoordinates);
            console.log(`Distance from User to Car (ID: ${carID}):`, distance);

            if (distance <= 5) {

                const car = await Car.findOne({
                    where: { carID: carID, isAvailable: true },
                    include: [
                        {
                            model: Overview,
                            attributes: ['model', 'type', 'year', 'transmission', 'fuelType', 'seats', 'pricePerDay', 'address', 'description']
                        },
                        {
                            model: Images,
                            attributes: ['imageUrl']
                        }
                    ]
                });

                nearbyCars.push(car);
            }
        }

        console.log(nearbyCars);
        return res.status(200).json(nearbyCars);

    } catch (error) {
        console.error("Error in GetCarByLocation:", error);
        next(error);
    }
};

