import { Request, Response, NextFunction } from 'express';
import { Car, Customer, Images, Overview, Role } from '../models';
const nodemailer = require('nodemailer');
import path from 'path';
import { CheckRole } from '../utility';
import { promises } from 'fs-extra';
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, './.env') });

//FIND VANDOR
export const FindOwner = async(id: number | undefined, email?: string) => {
    if(email) return await Customer.findOne({where: {email: email}});
    else return await Customer.findOne({where: {customerID: id}});
}

/**-------------------------------------------User-------------------------------------------------- */

//GET ALL USERS
export const GetAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customers = await Customer.findAll();

        if (!customers || customers.length === 0) {
            return res.status(404).json('Chưa có người dùng nào');
        }

        const customerIDs = customers.map((item) => item.customerID);

        const nonAdminCustomers = await Promise.all(
            customerIDs.map(async (customerID) => {
                const role = await CheckRole(customerID);
                return { customerID, role };
            })
        );

        const filteredCustomers = nonAdminCustomers.filter((item) => item.role !== 'admin');

        const listCustomers = await Promise.all(filteredCustomers.map((item) => {

            return Customer.findByPk(item.customerID);

        }));

        return res.status(200).json(listCustomers);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Đã xảy ra lỗi, vui lòng thử lại sau!');
    }
};


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

//GET ALL CARS WAS NOT ACCEPTED
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

//GET ALL CARS WAS ACCEPTED
export const GetCarSAvailability = async (req: Request, res: Response, next: NextFunction) => {
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

//GET A CAR
export const GetACar = async(req: Request, res: Response, next: NextFunction) => {

    const ID = req.params.id;

    const result = await Car.findOne({
        where: { carID: ID},
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

//SEND EMAIL TO OWNER
export const sendEmailServiceAccepted = async (email: string) => {

    const profileOwner = await Customer.findOne({where: {email: email }});
    const profileCar = await Car.findOne({where: {customerID: profileOwner?.customerID}});
    const profileOverview = await Overview.findOne({where: {carID: profileCar?.carID}});

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
        subject: "Chúc mừng! Xe của bạn đã được phê duyệt trên CarLink 🎉", // Subject line
        text: "Phản hồi dựa trên yêu cầu của bạn", // plain text body
        html: `<div>Kính gửi ${profileOwner?.firstName},

                    Cảm ơn bạn đã tin tưởng sử dụng CarLink để chia sẻ chiếc xe của mình. Chúng tôi vui mừng thông báo rằng xe của bạn đã được phê duyệt thành công.<br><br/>

                    Thông tin xe:<br><br/>

                    Tên xe: ${profileOverview?.model}<br><br/>

                    Địa chỉ: ${profileOverview?.address}<br><br/>
                    
                    Xe của bạn hiện đã được hiển thị công khai trên nền tảng CarLink và sẵn sàng cho các khách hàng tìm kiếm và đặt thuê.<br><br/>

                    Nếu bạn có bất kỳ thắc mắc hoặc cần hỗ trợ, vui lòng liên hệ với chúng tôi qua email: ${process.env.EMAIL_USER} hoặc số điện thoại: ${process.env.PHONE_ADMIN}.<br><br/>

                    Trân trọng,<br><br/>
                    Đội ngũ CarLink</div>`, // html body
    });

    return info;

}

//SEND EMAIL TO OWNER
export const sendEmailServiceDeclined = async (email: string) => {

    const profileOwner = await Customer.findOne({where: {email: email }});
    const profileCar = await Car.findOne({where: {customerID: profileOwner?.customerID}});
    const profileOverview = await Overview.findOne({where: {carID: profileCar?.carID}});

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
        subject: "Thông báo: Xe của bạn chưa đạt yêu cầu đăng ký trên CarLink", // Subject line
        text: "Phản hồi dựa trên yêu cầu của bạn", // plain text body
        html: `<div>Kính gửi ${profileOwner?.firstName},

                    Cảm ơn bạn đã đăng ký xe trên CarLink. Tuy nhiên, sau khi xem xét, chúng tôi rất tiếc phải thông báo rằng xe của bạn hiện không đáp ứng các yêu cầu để được phê duyệt trên nền tảng.<br><br/>

                    <ul>
                        <strong>Thông tin xe:</strong>
                        <li><strong>Tên xe:</strong> ${profileOverview?.model}</li>
                        <li><strong>Địa chỉ:</strong> ${profileOverview?.address}</li>
                        <li><strong>Lý do bị từ chối:</strong></li>
                        <ul>
                            <li>[Thay bằng form cho admin nhập]</li>
                        </ul>
                    </ul>
                    
                    Bạn có thể chỉnh sửa và gửi lại thông tin để được xem xét phê duyệt trong tương lai. Hãy truy cập vào http://localhost:5173/ để chỉnh sửa và bổ sung thông tin.<br><br/>

                    Nếu bạn có bất kỳ thắc mắc hoặc cần hỗ trợ, vui lòng liên hệ với chúng tôi qua email: ${process.env.EMAIL_USER} hoặc số điện thoại: ${process.env.PHONE_ADMIN}.<br><br/>

                    Trân trọng,<br><br/>
                    Đội ngũ CarLink</div>`, // html body
    });

    return info;

}


//SEND MAIL ACCEPTED TO OWNER
export const onSendAccepted = async (email: string) => {
    try {
        const profile = await Customer.findOne({ where: { email } });
        if (profile) {
            await sendEmailServiceAccepted(profile.email);
            return 'Thông tin chấp nhận đã được gửi đến email của bạn!';
        }
        return 'Email không tồn tại trong hệ thống!';
    } catch (error) {
        console.log(error);
        throw new Error('Có lỗi xảy ra khi gửi email!');
    }
};

//SEND MAIL DECLINED TO OWNER
export const onSendDeclined = async (email: string) => {
    try {
        const profile = await Customer.findOne({ where: { email } });
        if (profile) {
            await sendEmailServiceDeclined(profile.email);
            return 'Thông tin chấp nhận đã được gửi đến email của bạn!';
        }
        return 'Email không tồn tại trong hệ thống!';
    } catch (error) {
        console.log(error);
        throw new Error('Có lỗi xảy ra khi gửi email!');
    }
};

//ACCEPT ADD CAR
export const AcceptCar = async (req: Request, res: Response) => {

    try {
        
        const carID = req.params.id;

        const car = await Car.findByPk(carID);
        const ownerID = await car?.customerID;
        const profileOwner = await Customer.findByPk(ownerID);

        if (!car) return res.status(404).json('Xe không tồn tại!');

        car.isAvailable = true; // Duyệt xe
        await car.save();

        const owner = await Role.findOne({where: {customerID: ownerID}});
        if(owner) owner.type = 'owner';
        await owner?.save();

        try {
            await onSendAccepted(profileOwner?.email ?? '');
        } catch (error) {
            console.error('Lỗi khi gửi email:', error);
            return res.status(500).json({ message: 'Lỗi khi gửi email đến chủ xe!' });
        }
        

        return res.status(200).json('Xe đã được admin duyệt!' );

    } catch (error) {

        console.error('Lỗi khi duyệt xe:', error);
        return res.status(500).json({ message: 'Lỗi máy chủ!' });

    }

};

//DELETE A CAR
export const DeleteCar = async(req: Request, res: Response, next: NextFunction) => {

    try {
        
        const carID = req.params.id;
        const car = await Car.findByPk(carID);
        const ownerID = await car?.customerID;
        const profileOwner = await Customer.findByPk(ownerID);

        if(!car) return res.status(400).json('Xe không tồn tại!');

        try {
            await onSendDeclined(profileOwner?.email ?? '');
        } catch (error) {
            console.error('Lỗi khi gửi email:', error);
            return res.status(500).json({ message: 'Lỗi khi gửi email đến chủ xe!' });
        }

        await car.destroy();

        return res.status(200).json('Xe đã được xoá thành công!');

    } catch (error) {

        res.status(500).json('Lỗi!')

    }

}