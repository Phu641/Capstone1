import { Car, Images, Overview, Role } from "../models";




//GET A CAR BY ID
export const GetCarByID = async(carID: number) => {

    const result = await Car.findOne({
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

    if(result) return result;

    return 'Xe không tồn tại!';

}

//CHECK ROLE PASS ADMIN
export const CheckRole = async (customerID: number) => {
    const role = await Role.findOne({ where: { customerID: customerID } });

    if (role?.type === 'admin') return 'admin';
    if (role?.type === 'owner') return 'owner';
    if (role?.type === 'user') return 'user';
    
};

