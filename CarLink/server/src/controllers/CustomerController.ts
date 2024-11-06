import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateCustomerInputs, UserLoginInputs, EditCustomerProfileInputs } from '../dto';
import { GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword, GenerateOtp } from '../utility';
import { Customer, Role } from '../models';
import path from 'path';
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '.././.env') });
const nodemailer = require("nodemailer");


/**------------------------------PROFILE SECTION------------------------------------------ */

//CUSTOMER SIGN UP
export const CustomerSignUp = async (req: Request, res: Response, next: NextFunction) => {

    const customerInputs = plainToClass(CreateCustomerInputs, req.body);

    const inputErrors = await validate(customerInputs, {
        skipMissingProperties: false, // Không bỏ qua các thuộc tính còn thiếu
        whitelist: true, // Loại bỏ các thuộc tính không xác thực khỏi đối tượng
        forbidNonWhitelisted: true, // Ném ra lỗi nếu có bất kỳ thuộc tính nào không nằm trong danh sách cho phép
    });

    if (inputErrors.length > 0) return res.status(400).json(inputErrors);

    const { idCard, email, password, firstName, lastName, phone, address } = customerInputs;

    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password, salt);

    const { OTP, otpExpiry } = GenerateOtp();

    const existedCustomer = await Customer.findOne({ where: { email: email } });

    if(existedCustomer) return res.status(400).json('Người dùng đã tồn tại với email này!');

    const result = await Customer.create({

        idCard: idCard,
        email: email,
        password: userPassword,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        salt: salt,
        OTP,
        otpExpiry,
        loyalPoint: 0,
        isVerified: false,
        address: address

    });

    if (result) {

        await Role.create({
            customerID: result.customerID,
            type: 'user'
        })

        //GENERATE THE SIGNATURE
        const signature = GenerateSignature({
            customerID: result.customerID as number,
            email: result.email,
            isVerified: result.isVerified
        });

        //SEND THE RESULT TO CLIENT
        return res.status(201).json({ signature: signature, isVerified: result.isVerified, email: result.email });

    }

    return res.status(400).json('Sai email hoặc mật khẩu!');

}



//CUSTOMER LOG IN
export const CustomerLogIn = async (req: Request, res: Response, next: NextFunction) => {

    const loginInputs = plainToClass(UserLoginInputs, req.body);

    const loginErrors = await validate(loginInputs, {
        skipMissingProperties: false, // Không bỏ qua các thuộc tính còn thiếu
        whitelist: true, // Loại bỏ các thuộc tính không xác thực khỏi đối tượng
        forbidNonWhitelisted: true, // Ném ra lỗi nếu có bất kỳ thuộc tính nào không nằm trong danh sách cho phép
    });

    if (loginErrors.length > 0) return res.status(400).json(loginErrors);

    const { email, password } = loginInputs;

    const customer = await Customer.findOne({ where: { email: email } });

    if (customer) {

        const validation = await ValidatePassword(password, customer.password, customer.salt);

        if (validation) {

            //GENERATE THE SIGNATURE
            const signature = GenerateSignature({

                customerID: customer.customerID as number,
                email: customer.email,
                isVerified: customer.isVerified,

            })

            //SEND RESULT TO CLIENT
            return res.status(201).json({ signature: signature, isVerified: customer.isVerified, email: customer.email });

        }

    }

    return res.status(404).json('Sai email hoặc mật khẩu!');

}

//SEND EMAIL
export const sendEmailService = async (email: string, OTP: number) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });


    const info = await transporter.sendMail({
        from: '"CAR LINK" <carlinkwebsite@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "SEND EMAIL", // Subject line
        text: "Reply on your request", // plain text body
        html: `<div>Your OTP is: <b>${OTP}</b></div>`, // html body
    });

    return info;

}

//REQUEST OTP
export const onRequestOTP = async (req: Request, res: Response, next: NextFunction) => {

    const customer = req.user;

    try {

        if (customer) {

            const profile = await Customer.findOne({ where: { email: customer.email } });

            if (profile) {
                await sendEmailService(profile.email, profile.OTP);
                return res.json('OTP đã được gửi đến email của bạn')
            }

            return res.json({
                status: 'err',
                message: 'the email is required'
            })

        }

    } catch (error) {
        console.log(error)
        return res.json({
            status: 'err'
        })
    }

}

//VERIFY USER
export const CustomerVerify = async (req: Request, res: Response, next: NextFunction) => {

    const { OTP } = req.body;
    const customer = req.user;

    if (customer) {

        const profile = await Customer.findOne({ where: { customerID: customer.customerID } });

        if (profile) {

            if (profile.OTP === parseInt(OTP) && profile.otpExpiry >= new Date()) {

                profile.isVerified = true;

                const updatedCustomerResponse = await profile.save();

                //GENERATE SIGNATURE
                const signature = GenerateSignature({
                    customerID: updatedCustomerResponse.customerID as number,
                    email: updatedCustomerResponse.email,
                    isVerified: updatedCustomerResponse.isVerified
                });

                return res.status(200).json({ signature: signature, isVerified: updatedCustomerResponse.isVerified, email: updatedCustomerResponse.email });

            }

        }

    }

    return res.status(400).json('Xảy ra lỗi trong việc xác nhận OTP!');

}

//GET PROFILE
export const GetCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {

    const customer = req.user;

    if (customer) {

        const profile = await Customer.findOne(customer.customerID);

        if (profile) return res.status(200).json(profile);

    }

    return res.status(400).json('Lỗi không thể xem profile!');
}

//EDIT CUSTOMER PROFILE
export const EditCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {

    const customer = req.user;

    const profileInputs = plainToClass(EditCustomerProfileInputs, req.body);

    const profileErrors = await validate(profileInputs, {
        skipMissingProperties: false, // Không bỏ qua các thuộc tính còn thiếu
        whitelist: true, // Loại bỏ các thuộc tính không xác thực khỏi đối tượng
        forbidNonWhitelisted: true, // Ném ra lỗi nếu có bất kỳ thuộc tính nào không nằm trong danh sách cho phép
    });

    if (profileErrors.length > 0) return res.status(400).json(profileErrors);

    const { firstName, lastName, address } = profileInputs;

    if (customer) {

        const profile = await Customer.findOne(customer.customerID);

        if (profile) {

            profile.firstName = firstName;
            profile.lastName = lastName;
            profile.address = address;

            const result = await profile.save();

            return res.status(200).json(result);

        }

    }

}

//GET CURRENT ROLE
export const GetCurrentRole = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        const role = await Role.findOne({
            where: { customerID: user.customerID }
        });

        res.json({
            user: user.email,
            role: role?.type,
        });
    } catch (error) {
        res.status(500).json({ error: "Could not fetch role" });
    }
}

/**------------------------------FAVORITE SECTION------------------------------------------ */

/**------------------------------BOOKING SECTION------------------------------------------ */

/**------------------------------PAYMENT SECTION------------------------------------------ */
