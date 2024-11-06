import express, { Request, Response, NextFunction } from 'express';
import { Car, Overview, Images } from '../models';




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
