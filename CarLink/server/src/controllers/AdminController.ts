import { Customer } from '../models'


//FIND VANDOR
export const FindOwner = async(id: number | undefined, email?: string) => {
    if(email) return await Customer.findOne({where: {email: email}});
    else return await Customer.findOne({where: {customerID: id}});
}