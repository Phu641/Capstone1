import { Request, Response, NextFunction } from 'express';
import { Booking, Car, Customer, Images, Overview, Report, Role, Wallet, Withdraw } from '../models';
const nodemailer = require('nodemailer');
import path from 'path';
import { CheckRole } from '../utility';
import { promises } from 'fs-extra';
import Decimal from 'decimal.js';
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
    const profileOwner = await Customer.findOne({ where: { email: email } });
    const profileCar = await Car.findOne({ where: { customerID: profileOwner?.customerID } });
    const profileOverview = await Overview.findOne({ where: { carID: profileCar?.carID } });
  
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
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
      subject: 'Chúc mừng! Xe của bạn đã được phê duyệt trên CarLink 🎉', // Subject line
      text: 'Phản hồi dựa trên yêu cầu của bạn', // plain text body
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
  };
  
  //SEND EMAIL TO OWNER
  export const sendEmailServiceDeclined = async (email: string, reason: string) => {
    const profileOwner = await Customer.findOne({ where: { email: email } });
    const profileCar = await Car.findOne({ where: { customerID: profileOwner?.customerID } });
    const profileOverview = await Overview.findOne({ where: { carID: profileCar?.carID } });
  
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
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
      subject: 'Thông báo: Xe của bạn chưa đạt yêu cầu đăng ký trên CarLink', // Subject line
      text: 'Phản hồi dựa trên yêu cầu của bạn', // plain text body
      html: `<div>Kính gửi ${profileOwner?.firstName},
  
                      Cảm ơn bạn đã đăng ký xe trên CarLink. Tuy nhiên, sau khi xem xét, chúng tôi rất tiếc phải thông báo rằng xe của bạn hiện không đáp ứng các yêu cầu để được phê duyệt trên nền tảng.<br><br/>
  
                      <ul>
                          <strong>Thông tin xe:</strong>
                          <li><strong>Tên xe:</strong> ${profileOverview?.model}</li>
                          <li><strong>Địa chỉ:</strong> ${profileOverview?.address}</li>
                          <li><strong>Lý do bị từ chối:</strong></li>
                          <ul>
                              <li>${reason}</li>
                          </ul>
                      </ul>
                      
                      Bạn có thể chỉnh sửa và gửi lại thông tin để được xem xét phê duyệt trong tương lai. Hãy truy cập vào http://localhost:5173/ để chỉnh sửa và bổ sung thông tin.<br><br/>
  
                      Nếu bạn có bất kỳ thắc mắc hoặc cần hỗ trợ, vui lòng liên hệ với chúng tôi qua email: ${process.env.EMAIL_USER} hoặc số điện thoại: ${process.env.PHONE_ADMIN}.<br><br/>
  
                      Trân trọng,<br><br/>
                      Đội ngũ CarLink</div>`, // html body
    });
    
    return info;
  };
  
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
  export const onSendDeclined = async (email: string, reason: string) => {
    try {
      const profile = await Customer.findOne({ where: { email } });
      if (profile) {
        await sendEmailServiceDeclined(profile.email, reason);
        return 'Thông tin từ chối đã được gửi đến email của bạn!';
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
  
      //UPDATE ROLE
      const owner = await Role.findOne({ where: { customerID: ownerID } });
      if (owner) owner.type = 'owner';
      await owner?.save();

      const wallet = await Wallet.findOne({where: {customerID: ownerID}});

      if(!wallet) {

        //CREATE WALLET FOR OWNER
        await Wallet.create({

            customerID: ownerID,
            balance: 0

        });

      }
  
      try {
        await onSendAccepted(profileOwner?.email ?? '');
      } catch (error) {
        console.error('Lỗi khi gửi email:', error);
        return res.status(500).json({ message: 'Lỗi khi gửi email đến chủ xe!' });
      }
  
      return res.status(200).json('Xe đã được admin duyệt!');
    } catch (error) {
      console.error('Lỗi khi duyệt xe:', error);
      return res.status(500).json({ message: 'Lỗi máy chủ!' });
    }
};

// };
  
  //DELETE A CAR
  export const DeleteCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const carID = req.params.id;
      const car = await Car.findByPk(carID);
      const ownerID = await car?.customerID;
      const profileOwner = await Customer.findByPk(ownerID);
  
      if (!car) return res.status(400).json('Xe không tồn tại!');
  
      try {
        await onSendDeclined(profileOwner?.email ?? '', req.body.reason || 'Không có lý do cụ thể');
      } catch (error) {
        console.error('Lỗi khi gửi email:', error);
        return res.status(500).json({ message: 'Lỗi khi gửi email đến chủ xe!' });
      }
  
      await car.destroy();
  
      return res.status(200).json('Xe đã được xoá thành công!');
    } catch (error) {
      res.status(500).json('Lỗi!');
    }

}

/**------------------------------------------------------Booking--------------------------------------------------------- */

//ALL BOOKING
export const GetAllBookings = async(req: Request, res: Response, next: NextFunction) => {

    try {

        const bookings = await Booking.findAll();

        if(bookings) return res.status(200).json(bookings);

        
    } catch (error) {
        console.log(error);
    }

}

//ALL BOOKING
export const GetAllPendingBookings = async(req: Request, res: Response, next: NextFunction) => {

    try {

        const bookings = await Booking.findAll({where: {bookingStatus: 'pending'}});

        if(bookings) return res.status(200).json(bookings);

        
    } catch (error) {
        console.log(error);
    }

}

//OWNER SERVICE EMAIL
export const sendEmailServiceAcceptedBookingOwner = async (email: string, bookingID: number) => {

    const profileOwner = await Customer.findOne({where: {email: email }});
    
    const profileBooking = await Booking.findByPk(bookingID);

    const carID = profileBooking?.carID;
    const profileOverview = await Overview.findOne({where: {carID: carID}});

    const profileUser = await Customer.findOne({where: {customerID: profileBooking?.customerID}});

    const deposit = profileBooking?.totalAmount ? profileBooking.totalAmount * 0.3 : 0;
    const resting = profileBooking?.totalAmount ? profileBooking.totalAmount * 0.7 : 0;    

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
        subject: "Thông báo: Xe của bạn đã được đặt thuê trên CarLink", // Subject line
        text: "Phản hồi dựa trên yêu cầu của bạn", // plain text body
        html: `<div>Kính gửi ${profileOwner?.firstName},

                    Chúng tôi xin thông báo rằng xe của bạn đã được một khách hàng đặt thuê thông qua CarLink. Dưới đây là thông tin chi tiết về đơn thuê xe:<br><br/>

                    <ul>
                        <strong>Thông tin khách thuê:</strong>
                        <li><strong>Tên người thuê:</strong> ${profileUser?.firstName} ${profileUser?.lastName}</li>
                        <li><strong>Số điện thoại:</strong> ${profileUser?.phone}</li>
                    </ul>

                    <ul>
                        <strong>Thông tin đặt xe:</strong>
                        <li><strong>Tên xe:</strong> ${profileOverview?.model}</li>
                        <li><strong>Ngày thuê xe:</strong> ${profileBooking?.bookingDate}</li>
                        <li><strong>Đến ngày:</strong> ${profileBooking?.untilDate}</li>
                        <li><strong>Thời gian nhận xe: </strong>30 phút trước giờ nhận xe</li>
                    </ul>
                    
                    <ul>
                        <strong>Chi phí thuê xe:</strong>
                        <li><strong>Tổng số tiền:</strong> ${profileBooking?.totalAmount} VND</li>
                        <li><strong>Số tiền người thuê đã đặt cọc:</strong> ${deposit} VND</li>
                        <li><strong>Số tiền người thuê cần phải thanh toán cho bạn:</strong> ${resting} VND</li>
                    </ul>

                    <ul>
                        <strong>Yêu cầu xác nhận:</strong>
                        <li>Chụp ảnh CCCD của khách thuê xe và lưu trữ cẩn thận để phục vụ việc xác nhận hoàn thành thuê xe hoặc xử lý các trường hợp phát sinh.</li>
                        <li>Vui lòng chuẩn xác minh CCCD của người thuê xe so với ứng dụng VNeID tại thời điểm nhận xe.</li>
                    </ul>

                    Sau khi hoàn tất việc xác minh và bàn giao xe, vui lòng báo cáo lại cho hệ thống CarLink để xác nhận rằng xe đã được giao thành công.<br><br/>

                    Nếu bạn có bất kỳ thắc mắc hoặc cần hỗ trợ, vui lòng liên hệ với chúng tôi qua email: ${process.env.EMAIL_USER} hoặc số điện thoại: ${process.env.PHONE_ADMIN}.<br><br/>

                    Trân trọng,<br><br/>
                    Đội ngũ CarLink</div>`, // html body
    });

    return info;

}

//USER SERVICE EMAIL
export const sendEmailServiceAcceptedBookingUser = async (email: string, bookingID: number) => {

    const profileBooking = await Booking.findByPk(bookingID);

    const profileUser = await Customer.findByPk(profileBooking?.customerID);

    const profileOverview = await Overview.findOne({where: {carID: profileBooking?.carID}});

    const car = await Car.findByPk(profileOverview?.carID);
    const profileOwner = await Customer.findByPk(car?.customerID);

    const deposit = profileBooking?.totalAmount ? profileBooking.totalAmount * 0.3 : 0;
    const resting = profileBooking?.totalAmount ? profileBooking.totalAmount * 0.7 : 0;    

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
        subject: "Xác nhận thuê xe thành công trên CarLink 🚗", // Subject line
        text: "Phản hồi dựa trên yêu cầu của bạn", // plain text body
        html: `<div>Kính gửi ${profileUser?.firstName},

                    Chúng tôi vui mừng thông báo rằng đơn thuê xe của bạn đã được xác nhận thành công bởi admin CarLink. Dưới đây là thông tin chi tiết về đơn thuê xe:<br><br/>

                    <ul>
                        <strong>Thông tin xe:</strong>
                        <li><strong>Tên xe:</strong> ${profileOverview?.model}</li>
                        <li><strong>Chủ xe:</strong> ${profileOwner?.firstName} ${profileOwner?.lastName}</li>
                        <li><strong>Số điện thoại chủ xe:</strong> ${profileOwner?.phone}</li>
                    </ul>

                    <ul>
                        <strong>Thông tin đặt thuê:</strong>
                        <li><strong>Ngày thuê xe:</strong> ${profileBooking?.bookingDate}</li>
                        <li><strong>Đến ngày:</strong> ${profileBooking?.untilDate}</li>
                        <li><strong>Thời gian nhận xe: </strong>30 phút trước giờ nhận xe</li>
                        <li><strong>Địa điểm nhận xe:</strong> ${profileOverview?.address}</li>
                    </ul>
                    
                    <ul>
                        <strong>Chi phí thuê xe:</strong>
                        <li><strong>Tổng số tiền:</strong> ${profileBooking?.totalAmount} VND</li>
                        <li><strong>Số tiền người bạn đặt cọc:</strong> ${deposit} VND</li>
                        <li><strong>Số tiền bạn cần phải thanh toán cho chủ xe:</strong> ${resting} VND</li>
                    </ul>

                    <ul>
                        <strong>Yêu cầu trước khi nhận xe:</strong>
                        <li>Mang theo CCCD cùng với ứng dụng VNEID để xác minh với chủ xe.</li>
                        <li>Kiểm tra kỹ thông tin xe và thực hiện xác nhận tình trạng xe với chủ xe trước khi nhận.</li>
                    </ul>

                    Nếu bạn có bất kỳ thắc mắc hoặc cần hỗ trợ, vui lòng liên hệ với chúng tôi qua email: ${process.env.EMAIL_USER} hoặc số điện thoại: ${process.env.PHONE_ADMIN}.<br><br/>

                    Trân trọng,<br><br/>
                    Đội ngũ CarLink</div>`, // html body
    });

    return info;

}

//SEND MAIL TO OWNER TO ACCEPT
export const MailAcceptBookingOwner = async (email: string, bookingID: number) => {
    try {
        const profile = await Customer.findOne({ where: { email } });
        if (profile) {
            await sendEmailServiceAcceptedBookingOwner(profile.email, bookingID);
            return 'Thông tin chấp nhận đã được gửi đến email của bạn!';
        }
        return 'Email không tồn tại trong hệ thống!';
    } catch (error) {
        console.log(error);
        throw new Error('Có lỗi xảy ra khi gửi email!');
    }
};

//SEND MAIL TO USER TO NOTIFY
export const MailAcceptBookingUser = async (email: string, bookingID: number) => {
    try {
        const profile = await Customer.findOne({ where: { email } });
        if (profile) {
            await sendEmailServiceAcceptedBookingUser(profile.email, bookingID);
            return 'Thông tin chấp nhận đã được gửi đến email của bạn!';
        }
        return 'Email không tồn tại trong hệ thống!';
    } catch (error) {
        console.log(error);
        throw new Error('Có lỗi xảy ra khi gửi email!');
    }
};

//ACCEPT BOOKING
export const AcceptBooking = async(bookingID: number) => {

    try {
        
        //const bookingID = req.params.id;
        const booking = await Booking.findByPk(bookingID);
        const customerID = booking?.customerID;
        const customer = await Customer.findByPk(customerID);
        const carID = booking?.carID;
        const car = await Car.findByPk(carID);
        const ownerID = car?.customerID;
        const owner = await Customer.findByPk(ownerID);

        if(booking) booking.bookingStatus = 'booking';

        await booking?.save();

        if(car) car.booked = true;

        await car?.save();

        try {

            //send mail to 2 owner
            await MailAcceptBookingOwner(owner?.email ?? '', bookingID as any);

            //send mail to 2 owner
            await MailAcceptBookingUser(customer?.email ?? '', bookingID as any);
            
        } catch (error) {

            console.log(error);
        }

        //return res.status(200).json('Quá trình thuê xe đã được duyệt!');

    } catch (error) {

        console.log(error);

    }

}

/**------------------------------------------------------Report--------------------------------------------------------- */
// GET ALL REPORTS with condition on bookingStatus in Booking
export const GetAllPendingReports = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reports = await Report.findAll({
        include: [
          {
            model: Booking,
            attributes: [],
            where: {
              bookingStatus: 'booking',
            },
          },
        ],
        order: [['createdAt', 'DESC']],
      });
  
      if (reports.length === 0) {
        return res.status(404).json({ message: 'No reports found.' });
      }
  
      return res.status(200).json(reports);
    } catch (error) {
      console.error('Error fetching reports:', error);
      return res.status(500).json('Đã xảy ra lỗi!');
    }
  };


  // GET ALL REPORTS with condition on bookingStatus in Booking
export const GetAllCompleteReports = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reports = await Report.findAll({
        include: [
          {
            model: Booking,
            attributes: [],
            where: {
              bookingStatus: 'completed',
            },
          },
        ],
        order: [['createdAt', 'DESC']],
      });
  
      if (reports.length === 0) {
        return res.status(404).json({ message: 'No reports found.' });
      }
  
      return res.status(200).json(reports);
    } catch (error) {
      console.error('Error fetching reports:', error);
      return res.status(500).json('Đã xảy ra lỗi!');
    }
  };
  

//GET REPORT BY ID
export const GetReportById = async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;
  
    try {

      const report = await Report.findOne({

        where: { reportID: id }, 
        
      });
  
      if (!report) {
        return res.status(404).json({ message: 'Report not found.' });
      }
  
      return res.status(200).json(report);

    } catch (error) {
      console.error('Error fetching report:', error);
      return res.status(500).json('Đã xảy ra lỗi');
    }
};


//CONFIRM COMPLETE
export const ConfirmComplete = async (req: Request, res: Response, next: NextFunction) => {

    const  reportID  = req.params.id;
  
    try {

        const report = await Report.findByPk(reportID);
            
        const booking = await Booking.findByPk(report?.bookingID);
    
        if (!booking) {

            return res.status(404).json({ message: 'Booking not found.' });

        }
    
        if (booking.bookingStatus === 'completed') {

            return res.status(400).json({ message: 'Đơn này đã được hoàn thành.' });

        }
    
        booking.bookingStatus = 'completed';
        await booking.save();
    
        return res.status(200).json({

            message: 'Đơn thuê này đã xác nhận hoàn thành! ',
            booking,

        });
        } catch (error) {

        console.error('Error confirming booking completion:', error);
        return res.status(500).json('Đã xảy ra lỗi');

        }
  };


/**------------------------------------------------------Payment--------------------------------------------------------- */

//GET ALL PENDING WITHDRAW
export const GetPendingWithdrawals = async (req: Request, res: Response) => {

  try {

    const pendingWithdrawals = await Withdraw.findAll({
      where: { status: 'pending' }
    });

    if (pendingWithdrawals.length === 0) return res.status(404).json({ message: 'Không có yêu cầu rút tiền nào trong trạng thái pending.' });

    return res.status(200).json(pendingWithdrawals);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: 'Đã có lỗi xảy ra khi lấy danh sách yêu cầu rút tiền.' });

  }

};

//GET ALL APPROVAL AND COMPLETED WITHDRAW
export const GetApprovedOrCompletedWithdrawals = async (req: Request, res: Response) => {

  try {
    
    const approvedOrCompletedWithdrawals = await Withdraw.findAll({
      where: {
        status: ['approval', 'completed']
      }
    });

    if (approvedOrCompletedWithdrawals.length === 0) return res.status(404).json({ message: 'Không có yêu cầu rút tiền nào trong trạng thái approval hoặc completed.' });

    return res.status(200).json(approvedOrCompletedWithdrawals);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Đã có lỗi xảy ra khi lấy danh sách yêu cầu rút tiền.' });
  }
};

//SEND MAIL TO OWNER
export const sendEmailServiceAcceptedRequestWithdraw = async (email: string, withdrawID: number) => {

  const profileOwner = await Customer.findOne({where: {email: email }});
  
  const profileRequest = await Withdraw.findByPk(withdrawID);

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
      subject: "Thông báo: Yêu cầu rút tiền của bản trên CarLink đã được chấp thuận", // Subject line
      text: "Phản hồi dựa trên yêu cầu của bạn", // plain text body
      html: `<div>Kính gửi ${profileOwner?.firstName},

                  Chúng tôi xin thông báo rằng yêu cầu rút tiền của bạn trên CarLink đã được phê duyệt. Dưới đây là thông tin chi tiết về việc rút tiền:<br><br/>

                  <ul>
                      <strong>Thông tin chi tiết:</strong>
                      <li><strong>Số tiền rút:</strong> ${profileRequest?.amount} VND</li>
                      <li><strong>Ngày yêu cầu:</strong> ${profileRequest?.createdAt}</li>
                  </ul>

                  <ul>
                      <strong>Để hoàn tất việc rút tiền tại trụ sở của chúng tôi, vui lòng cung cấp mã các thông tin sau::</strong>
                      <li><strong>Mã OTP:</strong> ${profileRequest?.OTP}</li>
                      <li><strong>Mã OTP này sẽ có hiệu lưc trong vòng 3 ngày, nếu sau 3 ngày mà bạn không đến rút tiền thì yêu cầu của bạn sẽ bị huỷ!</strong>}</li>
                  </ul>

                  Nếu bạn có bất kỳ thắc mắc hoặc cần hỗ trợ, vui lòng liên hệ với chúng tôi qua email: ${process.env.EMAIL_USER} hoặc số điện thoại: ${process.env.PHONE_ADMIN}.<br><br/>

                  Trân trọng,<br><br/>
                  Đội ngũ CarLink</div>`, // html body
  });

  return info;

}

//SEND MAIL TO OWNER TO NOTIFY
export const MailAcceptWithdrawOwner = async (email: string, withdrawID: number) => {

  try {

      const profile = await Customer.findOne({ where: { email } });

      if (profile) {

          await sendEmailServiceAcceptedRequestWithdraw(profile.email, withdrawID);
          return 'Thông tin chấp nhận đã được gửi đến email của bạn!';
      }

      return 'Email không tồn tại trong hệ thống!';

  } catch (error) {

      console.log(error);
      throw new Error('Có lỗi xảy ra khi gửi email!');

  }

};

//APPROVAL WITHDRAW
export const ApproveWithdrawalRequest = async (req: Request, res: Response) => {

  try {

    const withdrawID = req.params.id;

    const withdraw = await Withdraw.findByPk(withdrawID);

    const ownerProfile = await Customer.findByPk(withdraw?.customerID);

    if (!withdraw || withdraw.status !== 'pending') return res.status(404).json({ message: 'Không tìm thấy yêu cầu rút tiền!' });

    withdraw.status = 'approved';

    await withdraw.save();

    // Gửi OTP qua email
    if (ownerProfile?.email) {
      await MailAcceptWithdrawOwner(ownerProfile.email, withdraw.withdrawID);
    } else {
      // Xử lý khi email không có giá trị hợp lệ
      console.log("Email không hợp lệ");
    }
    

    res.status(200).json({ message: 'Đã chấp nhận yêu cầu rút tiền thành công!', withdraw });

  } catch (error) {

    res.status(500).json({ message: 'Đã xảy ra lỗi trong việc chấp nhận yêu cầu rút tiền!', error });

  }

};


//CONFRIM WITHDRAW
export const ConfirmWithdraw = async (req: Request, res: Response) => {

  try {

    const { withdrawID, OTP } = req.body;

    const withdraw = await Withdraw.findByPk(withdrawID);
    const amount = new Decimal(withdraw?.amount??0);

    const wallet = await Wallet.findOne({where: {customerID: withdraw?.customerID}});

    if(wallet) {

      const balance = new Decimal(wallet?.balance??0);

      const resting = balance.minus(amount);
      wallet.balance = Number(resting);
      
      await wallet.save();

    }
    const balance = new Decimal(wallet?.balance??0);

    const resting = balance.minus(amount);

    if (!withdraw || withdraw.status !== 'approved') {

      return res.status(404).json({ message: 'Không tìm thấy yêu cầu rút tiền nào!' });

    }

    if (withdraw.OTP !== OTP) {

      return res.status(400).json({ message: 'Sai mã OTP!' });

    }

    withdraw.status = 'completed';
    await withdraw.save();

    return res.status(200).json({ message: 'Đã hoàn thành việc rút tiền!', withdraw });

  } catch (error) {

    res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình xác nhận rút tiền!', error });
  }

};
