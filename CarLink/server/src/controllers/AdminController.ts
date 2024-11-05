import { Request, Response, NextFunction } from 'express';
import { Car, Customer } from '../models'


//FIND VANDOR
export const FindOwner = async(id: number | undefined, email?: string) => {
    if(email) return await Customer.findOne({where: {email: email}});
    else return await Customer.findOne({where: {customerID: id}});
}

//GET ALL USERS
export const GetAllUsers = async(req: Request, res: Response, next: NextFunction) => {

    try {

        const users = await Customer.findAll();

        if(!users) return res.status(400).json('No user added');
        
        return res.status(200).json(users);
        
    } catch (error) {
        return res.status(500).json(error)
    }

}

//GET A USER
export const GetAnUser = async(req: Request, res: Response, next: NextFunction) => {

    try {
        const userID = req.params.id;
        const user = await Customer.findOne({where: {customerID: userID}});

        res.status(200).json(user);

    } catch (error) {
        return res.status(500).json(error);
    }

}

//GET ALL CARS
export const GetAllCars = async(req: Request, res: Response, next: NextFunction) => {

    try {

        const cars = await Car.findAll();

        if(!cars) return res.status(400).json('No car added');
        
        return res.status(200).json(cars);
        
    } catch (error) {

        return res.status(500).json(error);

    }

}

//GET A CAR
export const GetACar = async(req: Request, res: Response, next: NextFunction) => {

    try {

        const carID = req.params.id;
        const car = await Car.findOne({where: {carID: carID}});

        res.status(200).json(car);

    } catch (error) {

        return res.status(500).json(error);

    }

}