// import { Request, Response, NextFunction } from "express";
// import { plainToClass } from "class-transformer";
// import { validate } from "class-validator";
// import { CreateCustomerInputs } from "../dto";
// import { GenerateOtp, GeneratePassword, GenerateSalt, GenerateSignature, onRequestOTP } from "../utility";
// import { Customer } from "../models";



// //CUSTOMER SIGN UP
// export const CustomerSignUp = async(req: Request, res: Response, next: NextFunction) => {

//     const customerInputs = plainToClass(CreateCustomerInputs, req.body);

//     const inputErrors = await validate(customerInputs, {
//         skipMissingProperties: false, // Không bỏ qua các thuộc tính còn thiếu
//         whitelist: true, // Loại bỏ các thuộc tính không xác thực khỏi đối tượng
//         forbidNonWhitelisted: true, // Ném ra lỗi nếu có bất kỳ thuộc tính nào không nằm trong danh sách cho phép
//     });

//     if(inputErrors.length > 0) return res.status(400).json(inputErrors);

//     const { idCard, email, password, firstName, lastName, phone, address } = customerInputs;

//     const salt = await GenerateSalt();
//     const userPassword = await GeneratePassword(password, salt);

//     const { OTP, expiry } = GenerateOtp();

//     const existedCustomer = await Customer.findOne({where: {email: email}});

//     if(existedCustomer) return res.status(400).json('User existing with email');

//     const result = await Customer.create({

//         idCard: idCard,
//         email: email,
//         password: userPassword,
//         firstName: firstName,
//         lastName: lastName,
//         phone: phone,
//         salt: salt,
//         OTP: OTP,
//         loyalPoint: 0,
//         isVerified: false,
//         address: address

//     });

//     if(result) {

//         // SEND OTP TO CUSTOMER
//         await onRequestOTP(OTP, phone);

//         //GENERATE THE SIGNATURE
//         const signature = GenerateSignature({
//             customerID: result.customerID as number,
//             email: result.email,
//             isVerified: result.isVerified
//         });

//         //SEND THE RESULT TO CLIENT
//         return res.status(201).json({signature: signature, isVerified: result.isVerified, email: result.email});

//     }

//     return res.status(400).json('Error with sign up');

// }



// //CUSTOMER LOG IN
// export const CustomerLogIn = async(req: Request, res: Response, next: NextFunction) => {

    

// }
import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateCustomerInputs } from '../dto';
import { GenerateOtp, GeneratePassword, GenerateSalt, GenerateSignature, onRequestOTP } from '../utility';
import { Customer } from '../models';

export const CustomerSignUp = (req: Request, res: Response, next: NextFunction) => {
    const customerInputs = plainToClass(CreateCustomerInputs, req.body);

    validate(customerInputs, {
        skipMissingProperties: false,
        whitelist: true,
        forbidNonWhitelisted: true,
    })
    .then((inputErrors) => {
        if (inputErrors.length > 0) {
            return Promise.reject({ status: 400, errors: inputErrors });
        }

        const { idCard, email, password, firstName, lastName, phone, address } = customerInputs;

        return GenerateSalt()
        .then((salt) => {
            return GeneratePassword(password, salt).then((userPassword) => {
                return { salt, userPassword };
            });
        })
        .then(({ salt, userPassword }) => {
            const { OTP, expiry } = GenerateOtp();

            return Customer.findOne({ where: { email: email } })
            .then((existedCustomer) => {
                if (existedCustomer) {
                    return Promise.reject({ status: 400, message: 'User existing with email' });
                }

                return Customer.create({
                    idCard,
                    email,
                    password: userPassword,
                    firstName,
                    lastName,
                    phone,
                    salt,
                    OTP,
                    loyalPoint: 0,
                    isVerified: false,
                    address
                });
            })
            .then((result) => {
                if (result) {
                    return onRequestOTP(OTP, phone).then(() => {
                        const signature = GenerateSignature({
                            customerID: result.customerID as number,
                            email: result.email,
                            isVerified: result.isVerified
                        });

                        res.status(201).json({ signature, isVerified: result.isVerified, email: result.email });
                    });
                } else {
                    return Promise.reject({ status: 400, message: 'Error with sign up' });
                }
            });
        });
    })
    .catch((error) => {
        if (error.status && error.errors) {
            res.status(error.status).json(error.errors);
        } else if (error.status && error.message) {
            res.status(error.status).json(error.message);
        } else {
            next(error);
        }
    });
};
