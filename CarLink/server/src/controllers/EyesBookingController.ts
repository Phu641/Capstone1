import express, { Request, Response, NextFunction } from 'express';
import { Car } from '../models';




//GET AVAILABILITY
export const GetCarAvailability = async(req: Request, res: Response, next: NextFunction) => {

    const result = await Car.findAll({where: {isAvailable: true}});

    if(result.length > 0) return res.status(200).json(result);

    return res.status(400).json('Data not found');

}

//GET CAR BY ID
export const GetCarByID = async(req: Request, res: Response, next: NextFunction) => {

    const ID = req.params.id;

    const result = await Car.findOne({where: {carID: ID}});

    if(result) return res.status(200).json(result);

    return res.status(400).json('Data not found');

}
