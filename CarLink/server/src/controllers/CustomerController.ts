import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateCustomerInputs, UserLoginInputs, EditCustomerProfileInputs } from '../dto';
import { GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword, GenerateOtp, GetCarByID} from '../utility';
import { Booking, Car, Customer, Favorite, Images, Overview, Role, Transaction, Wallet } from '../models';
import path from 'path';
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '.././.env') });
const nodemailer = require("nodemailer");
import PayOS from "@payos/node";
const payOS = new PayOS("6b808926-685f-45a1-a532-908bccb31368", "da86690d-b052-4928-a51a-b9c52659062a", "1fd42ecdf13c1c4cbf8aaebd0063c0bea084ddb6961809d3e02c7e207bcc7b3e");
import express from 'express';
import bodyParser from 'body-parser';
import Decimal from 'decimal.js';
import { AcceptBooking } from './AdminController';

const app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));



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
    try {

        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: 'Bạn chưa đăng nhập!' }); // 401 Unauthorized nếu user không tồn tại
        }

        const profile = await Customer.findByPk(user.customerID);

        if (!profile) {
            return res.status(404).json({ message: 'Không tìm thấy thông tin khách hàng!' }); // 404 Not Found nếu không tìm thấy profile
        }

        return res.status(200).json(profile); // Trả về thông tin profile nếu tìm thấy
    } catch (error) {
        console.error('Lỗi khi truy xuất profile:', error);
        return res.status(500).json({ message: 'Lỗi máy chủ, không thể truy xuất profile!' }); // 500 Internal Server Error nếu có lỗi bất ngờ
    }
};

//EDIT CUSTOMER PROFILE
export const EditCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    console.log(user);

    const profileInputs = plainToClass(EditCustomerProfileInputs, req.body);

    const profileErrors = await validate(profileInputs, {
        skipMissingProperties: false, // Không bỏ qua các thuộc tính còn thiếu
        whitelist: true, // Loại bỏ các thuộc tính không xác thực khỏi đối tượng
        forbidNonWhitelisted: true, // Ném ra lỗi nếu có bất kỳ thuộc tính nào không nằm trong danh sách cho phép
    });

    if (profileErrors.length > 0) return res.status(400).json(profileErrors);

    const { email, password, phone, firstName, lastName, address } = profileInputs;

    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password, salt);

    if (user) {

        const profile = await Customer.findByPk(user.customerID);

        if (profile) {

            profile.email = email,
            profile.password = userPassword,
            profile.salt = salt,
            profile.phone = phone,
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

//ADD AND REMOVE FROM FAVORITE
export const addToFavorite = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;
    const carID = req.params.id;

    try {

        const existingFavorite = await Favorite.findOne({
            where: {
                customerID: user?.customerID,
                carID,
            } 
        });

        if (existingFavorite) {

            await existingFavorite.destroy();
            return res.status(200).json('Xe đã được xóa khỏi danh mục yêu thích!');

        } else {

            const result = await Car.findOne({
                where: { carID: carID },
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

            await Favorite.create({
                customerID: user?.customerID,
                carID,
            });

            return res.status(200).json(result);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json('Đã xảy ra lỗi, vui lòng thử lại sau!');
    }
};

//GET ALL CAR IN FAVORITE
export const getAllCarsFavorite = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    try {

        const existingFavorite = await Favorite.findAll({
            where: {
                customerID: user?.customerID,
            } 
        });

        if (existingFavorite) {

            const result = await Promise.all(
                existingFavorite.map((item) => GetCarByID(item.carID))
            );

            return res.status(200).json(result);

        } else {

            return res.status(500).json('Chưa có xe nào trong mục yêu thích!');

        }
    } catch (error) {
        console.error(error);
        return res.status(500).json('Đã xảy ra lỗi, vui lòng thử lại sau!');
    }
};


/**------------------------------BOOKING SECTION------------------------------------------ */

//BOOK CAR 
export const BookCar = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;
    const {carID, bookingDate, untilDate, pricePerDay, days} = req.body;

    try {

        const car = await Car.findByPk(carID);

        if(car) {

            if(!car.booked) {

                const totalAmount = pricePerDay * days;

                const booking = await Booking.create({

                    customerID: user?.customerID,
                    carID,
                    bookingDate,
                    untilDate,
                    totalAmount,
                    bookingStatus: 'pending'

                });

                return res.status(200).json(booking);

            }

        }
        

    } catch (error) {
        console.error(error);
        return res.status(500).json('Đã xảy ra lỗi, vui lòng thử lại sau!');
    }
};

/**------------------------------PAYMENT SECTION------------------------------------------ */

//TẠO YÊU CẦU THANH TOÁN QUA PAY OS
export const createPaymentPayos = async (amount: number, walletID: number, bookingID: number) => {

    try {

        const orderCode = Number(String(new Date().getTime()).slice(-6));  // bởi vì payos yêu cầu mã đơn hàng phải là số

        const paymentData = {

            orderCode,
            amount,
            description: "Thanh toán qua PayOS",
            returnUrl: 'http://localhost:5173/', // Đảm bảo returnUrl được đặt đúng
            cancelUrl: 'http://localhost:5173/' // Đảm bảo cancelUrl được đặt đúng

        };

        console.log("Payment Data:", paymentData); // Kiểm tra giá trị của paymentData

        // Gửi yêu cầu tạo thanh toán đến payOS
        const response = await payOS.createPaymentLink(paymentData);

        console.log("Full PayOS Response:", response); // Kiểm tra toàn bộ phản hồi

        if (response && (response as any).error) {
            const error = (response as any).error as { message: string };
            console.error("PayOS API Error:", error);
            throw new Error(`PayOS API Error: ${error.message}`);
        }        


        if (response && response.checkoutUrl) {

            // Lưu thông tin giao dịch vào DB
            await Transaction.create({
                walletID: walletID,
                bookingID: bookingID,
                paycode: orderCode,
                amount,
                paymentMode: 'Thẻ tín dụng',
                paymentResponse: 'Đang chờ',
                status: 'Đang thanh toán bằng PayOS',
                created_at: new Date(),
                updated_at: new Date()
            });

            // Trả về URL thanh toán từ payOS
            return response.checkoutUrl;

        }

        throw new Error("Invalid PayOS response");
    } catch (error) {
    console.error("Error creating PayOS payment request:", error);

        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unexpected error occurred.");
        }
    }

};

//CREATE PAYMENT
export const  createPayment = async (req: Request, res: Response) => {

    const amount = req.body.amount;
    const user = req.user;
    
    console.log(typeof amount);

    const customerID = user?.customerID; //thay bằng id của owner??????????

    const booking = await Booking.findOne({where: {customerID: customerID, bookingStatus: 'pending'}});
    const bookingID = booking?.bookingID;

    const car = await Car.findByPk(booking?.carID);

    const ownerID = car?.customerID;

    console.log('Amount:', amount, 'User ID:', customerID);

    try {
        // Kiểm tra ví của người dùng
        const wallet = await Wallet.findOne({ where: { customerID: ownerID }, attributes: ['walletID'] });

        if (!wallet) {

            console.log('Wallet not found for user ID:', ownerID);
            return res.status(404).json({ message: 'Wallet not found' });

        }

        // Gọi dịch vụ thanh toán phù hợp dựa trên paymentMethod
        let paymentUrl = await createPaymentPayos(amount, wallet.walletID, bookingID as any); // Gọi PayOS service
        
        // Trả về URL thanh toán cho người dùng
        return res.status(200).json({ payUrl: paymentUrl, message: 'Payment request created, please proceed with the payment' });

    } catch (error) {

        console.error('Error creating payment request:', error);
    
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        } else {
            return res.status(500).json({ message: 'An unknown error occurred.' });
        }
    }
    
};

// Cập nhật số dư của ví sau khi giao dịch thành công
export const updateWallet = async(walletID: number, amount: number, orderCode: string) => {

    const wallet = await Wallet.findOne({ where: { walletID: walletID } });

    if (wallet) {

        const balance = new Decimal(wallet.balance);

        const amountToAdd = new Decimal(amount * 2/3);

        const updatedBalance = balance.plus(amountToAdd);

        wallet.balance = Number(updatedBalance);

        await wallet.save();

        // Cập nhật trạng thái giao dịch
        await Transaction.update(
            { status: 'Thanh toán PayOS thành công', paymentResponse: 'Thành công' },
            { where: { walletID: walletID, paycode: String(orderCode) }}
        );

    }

    if (!wallet) {
        throw new Error(`Wallet with ID ${walletID} not found`);
    }
    
}

// Xử lý callback từ PayOS khi giao dịch hoàn thành
export const handlePayOSCallback = async (req: Request, res: Response) => {

    console.log("PayOS callback response:", req.body);

    const { code, data } = req.body;

    // Kiểm tra nếu giao dịch thành công
    if (code === '00') {

        const { orderCode, amount } = data;
        const transaction = await Transaction.findOne({ where: { paycode: orderCode } });

        if (transaction) {

            // Cập nhật số dư của ví tương ứng bằng hàm updateWallet
            await updateWallet(transaction.walletID, amount, orderCode);
            
            await AcceptBooking(transaction.bookingID);

            return res.status(200).send("OK"); // Phản hồi thành công về cho PayOS

        } else {
            console.log("Transaction not found in database.");
            return res.status(404).json({ message: 'Transaction not found in database.' });
        }
    } else {
        const message = "An unknown error occurred";
        console.log("Transaction failed:", message);
        return res.status(400).json({
            message: `Transaction failed with resultCode:}`,
            error: message
        });
    }
    //res.json();
    
}