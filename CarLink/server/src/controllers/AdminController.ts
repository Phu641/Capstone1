import { Request, Response, NextFunction } from 'express';
import { Car, Customer, Images, Overview } from '../models'


//FIND VANDOR
export const FindOwner = async(id: number | undefined, email?: string) => {
    if(email) return await Customer.findOne({where: {email: email}});
    else return await Customer.findOne({where: {customerID: id}});
}

/**-------------------------------------------User-------------------------------------------------- */

//GET ALL USERS
export const GetAllUsers = async(req: Request, res: Response, next: NextFunction) => {

    try {

        const users = await Customer.findAll();

        if(!users) return res.status(400).json('Chưa có người dùng nào');
        
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

//DELETE A USER
export const DeleteUser = async(req: Request, res: Response, next: NextFunction) => {

    try {
        
        const userID = req.params.id;

        const user = await Customer.findByPk(userID);

        if(!user) return res.status(400).json('Người dùng không tồn tại!');

        await user.destroy();

        return res.status(200).json('Người dùng và những thông tin liên quan đã được xoá thành công!');

    } catch (error) {

        res.status(500).json('Lỗi!')

    }

}


/**------------------------------------------------------Car--------------------------------------------------------- */

//GET ALL CARS
export const GetAllCars = async(req: Request, res: Response, next: NextFunction) => {

    try {
        const result = await Car.findAll({
            where: { isAvailable: false },
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

}

//GET A CAR
export const GetACar = async(req: Request, res: Response, next: NextFunction) => {

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

//DELETE A CAR
export const DeleteCar = async(req: Request, res: Response, next: NextFunction) => {

    try {
        
        const carID = req.params.id;

        const car = await Car.findByPk(carID);

        if(!car) return res.status(400).json('Xe không tồn tại!');

        await car.destroy();

        return res.status(200).json('Xe đã được xoá thành công!');

    } catch (error) {

        res.status(500).json('Lỗi!')

    }

}

//ACCEPT ADD CAR
export const AcceptCar = async (req: Request, res: Response) => {

    try {
        const carID = req.params.id;

        const car = await Car.findByPk(carID);
        if (!car) return res.status(404).json('Xe không tồn tại!');

        car.isAvailable = true; // Duyệt xe
        await car.save();

        return res.status(200).json('Xe đã được admin duyệt!' );

    } catch (error) {

        console.error('Lỗi khi duyệt xe:', error);
        return res.status(500).json({ message: 'Lỗi máy chủ!' });

    }

};


//DECLINE ADD CAR