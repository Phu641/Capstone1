import { Request, Response, NextFunction } from "express";
import { CreateCarInputs } from "../dto";
import { FindOwner } from "./AdminController";
import {
  Car,
  Coordinate,
  Images,
  Overview,
  Booking,
  Report,
  Wallet,
  Withdraw,
  Customer,
  Transaction,
} from "../models";
import {
  deleteExpiredWithdrawRequests,
  GenerateOtp,
  getCoordinates,
} from "../utility";
import Decimal from "decimal.js";
import { Op } from "sequelize";
import { cursorTo } from "readline";
import PayOS from "@payos/node";
const nodemailer = require('nodemailer');
const payOS = new PayOS(
  "6b808926-685f-45a1-a532-908bccb31368",
  "da86690d-b052-4928-a51a-b9c52659062a",
  "1fd42ecdf13c1c4cbf8aaebd0063c0bea084ddb6961809d3e02c7e207bcc7b3e"
);

//ADD CAR
export const AddCar = async (
  req: Request,
  res: Response
) => {
  const user = req.user;

  if (user) {
    const {
      delivery,
      selfPickUp,
      model,
      type,
      year,
      transmission,
      fuelType,
      seats,
      pricePerDay,
      address,
      description
    } = <CreateCarInputs>req.body;

    const owner = await FindOwner(user.customerID);

    if (owner) {
      const files = req.files as [Express.Multer.File];

      const createdCar = await Car.create({
        customerID: owner.customerID,
        delivery,
        selfPickUp,
        booked: false
      });

      const createdOverview = await Overview.create({
        carID: createdCar.carID,
        model,
        type,
        year,
        transmission,
        fuelType,
        seats,
        pricePerDay,
        address,
        description,
      });

      const resultCar = await createdCar.save();
      await createdOverview.save();

      // Save images to Image model
      const images = files.map((file) => {
        return Images.create({
          carID: resultCar.carID, // Link image to the created car
          imageUrl: file.filename,
        });
      });

      // Wait for all images to be saved
      await Promise.all(images);

      try {
        // Get coordinates for the address
        const coordinates = await getCoordinates(address);
        console.log(coordinates);

        // Save coordinates to the Coordinate model
        await Coordinate.create({
          carID: createdCar.carID,
          latitude: coordinates.latitude, // Use correct latitude
          longitude: coordinates.longitude, // Use correct longitude
        });
      } catch (error) {
        console.error("Không thể lấy tọa độ:", error);
        return res.status(500).json({
          message:
            "Đã xảy ra lỗi khi lấy tọa độ. Vui lòng kiểm tra địa chỉ nhập vào.",
        });
      }

      const wallet = await Wallet.findOne({ where: { customerID: owner.customerID } });
      
          if (!wallet) {
            //CREATE WALLET FOR OWNER
            await Wallet.create({
              customerID: owner.customerID,
              balance: 0,
          });
      }

      return res.status(200).json(resultCar);
    }
  }

  return res.status(500).json("Đã có lỗi xảy ra với việc thêm xe!");
};

//GET ALL CARS
export const GetCarsByOwner = async (req: Request, res: Response) => {
  const user = req.user;

  if (user) {
    try {
      const cars = await Car.findAll({
        where: { customerID: user.customerID },
        include: [
          {
            model: Overview,
            attributes: [
              "model",
              "type",
              "year",
              "transmission",
              "fuelType",
              "seats",
              "pricePerDay",
              "address",
              "description",
            ],
          },
          {
            model: Images,
            attributes: ["imageUrl"],
          },
        ],
      });

      if (!cars || cars.length === 0) {
        return res
          .status(404)
          .json({ message: "Không có xe nào được tìm thấy." });
      }

      return res.status(200).json(cars);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách xe:", error);
      return res
        .status(500)
        .json({ message: "Đã xảy ra lỗi khi lấy danh sách xe." });
    }
  }

  return res.status(401).json({ message: "Người dùng không được xác thực." });
};

// UPDATE CAR
export const UpdateCar = async (req: Request, res: Response) => {
  const user = req.user;

  if (user) {
    const {
      carID,
      delivery,
      selfPickUp,
      isAvailable,
      pricePerDay,
      address,
      model,
      type,
      year,
      transmission,
      fuelType,
      seats,
      description,
    } = req.body;

    try {
      // Find the car and its related overview
      const car = await Car.findOne({
        where: { carID, customerID: user.customerID },
      });
      const overview = await Overview.findOne({ where: { carID } });

      if (!car || !overview) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy xe hoặc thông tin chi tiết xe." });
      }

      // Update car information
      if (delivery !== undefined) car.delivery = delivery;
      if (selfPickUp !== undefined) car.selfPickUp = selfPickUp;
      if (isAvailable !== undefined) car.isAvailable = isAvailable;

      // Update overview information
      if (pricePerDay !== undefined) overview.pricePerDay = pricePerDay;
      if (model !== undefined) overview.model = model;
      if (type !== undefined) overview.type = type;
      if (year !== undefined) overview.year = year;
      if (transmission !== undefined) overview.transmission = transmission;
      if (fuelType !== undefined) overview.fuelType = fuelType;
      if (seats !== undefined) overview.seats = seats;
      if (description !== undefined) overview.description = description;

      // Update address and coordinates if address is provided
      if (address) {
        overview.address = address;
        try {
          const coordinates = await getCoordinates(address);
          await Coordinate.update(
            {
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
            },
            { where: { carID } }
          );
        } catch (error) {
          console.error("Không thể lấy tọa độ:", error);
          return res.status(500).json({
            message:
              "Đã xảy ra lỗi khi cập nhật tọa độ. Vui lòng kiểm tra địa chỉ nhập vào.",
          });
        }
      }

      // Handle image updates
      const files = req.files as [Express.Multer.File];
      if (files && files.length > 0) {
        // Delete old images if needed (optional, depending on your requirements)
        await Images.destroy({ where: { carID } });

        // Save new images
        const imagePromises = files.map((file) => {
          return Images.create({
            carID,
            imageUrl: file.filename,
          });
        });
        await Promise.all(imagePromises);
      }

      // Save updated car and overview
      await car.save();
      await overview.save();

      return res
        .status(200)
        .json({ message: "Cập nhật thông tin xe thành công." });
    } catch (error) {
      console.error("Lỗi khi cập nhật xe:", error);
      return res
        .status(500)
        .json({ message: "Đã xảy ra lỗi khi cập nhật xe." });
    }
  }

  return res.status(401).json({ message: "Người dùng không được xác thực." });
};

//STOP SERVICE
export const StopService = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Bạn chưa đăng nhập." });
    }

    const { carID } = req.body;

    if (!carID)
      return res.status(400).json({ message: "Thiếu thông tin carID." });

    const car = await Car.findByPk(carID);

    if (!car)
      return res.status(404).json({ message: "Không tìm thấy xe với ID này." });

    if (car.booked)
      return res
        .status(404)
        .json(
          "Không thể tạm dừng dịch vụ của xe này bởi vì xe của bạn đang trong quá trình cho thuê!"
        );

    car.booked = true;

    await car.save();

    return res.status(200).json({ message: "Đã dừng dịch vụ đối với xe này." });
  } catch (error) {
    console.error("Lỗi khi dừng dịch vụ:", error);
    return res.status(500).json({ message: "Có lỗi xảy ra khi dừng dịch vụ." });
  }
};

//START SERVICE
export const StartService = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Bạn chưa đăng nhập." });
    }

    const { carID } = req.body;

    if (!carID)
      return res.status(400).json({ message: "Thiếu thông tin carID." });

    const car = await Car.findByPk(carID);

    if (!car)
      return res.status(404).json({ message: "Không tìm thấy xe với ID này." });

    car.booked = false;

    await car.save();

    return res.status(200).json({ message: "Đã bật dịch vụ đối với xe này." });
  } catch (error) {
    console.error("Lỗi khi dừng dịch vụ:", error);
    return res.status(500).json({ message: "Có lỗi xảy ra khi dừng dịch vụ." });
  }
};

//SUBMIT REPORT
export const SubmitReport = async (req: Request, res: Response) => {
  const user = req.user; // Lấy thông tin user từ middleware xác thực
  const { bookingID, validate, idCard, description, returnDate } = req.body;

  try {
    // Tìm booking theo bookingID
    const booking = await Booking.findByPk(bookingID);

    if (!booking) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin thuê xe!" });
    }

    // Kiểm tra xem đơn thuê đã được hoàn thành chưa
    if (booking.bookingStatus === "completed") {
      return res
        .status(400)
        .json({ message: "Đơn thuê này đã được hoàn thành và báo cáo!" });
    }

    // Kiểm tra xem user có phải là chủ xe không
    const car = await Car.findByPk(booking.carID);
    if (!car || car.customerID !== user?.customerID) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền xác nhận cho xe này!" });
    }

    // Kiểm tra xem validate có phải là true không
    if (validate) {
      const customer = await Customer.findByPk(booking.customerID);
      return res.status(200).json({
        booking: {
          bookingID: booking.bookingID,
          idCard: customer?.idCard,
        },
      });
    }

    // Kiểm tra file video (nếu có)
    const file = req.file;
    let damageVideo = null;
    if (file) {
      damageVideo = file.filename;
    }

    // Tạo một report mới
    const report = await Report.create({
      bookingID,
      idCard, // Lấy thông tin căn cước của người thuê từ bảng Booking
      returnDate: new Date(returnDate), // Ngày trả xe hiện tại
      damageVideo, // Có thể để null nếu không có file
      description,
    });

    return res.status(200).json({
      message: "Xác nhận hoàn thành thuê xe thành công từ chủ xe!",
      report,
    });
  } catch (error) {
    console.error("Lỗi:", error);
    return res.status(500).json({
      message: "Đã xảy ra lỗi, vui lòng thử lại!",
    });
  }
};

//GET ACTIVE BOOKINGS
export const GetActiveBookings = async (req: Request, res: Response) => {
  const user = req.user;

  try {
    // Lấy tất cả xe của owner
    const ownerCars = await Car.findAll({
      where: { customerID: user?.customerID },
    });

    const carIDs = ownerCars.map((car) => car.carID);

    // Lấy các booking đang hoạt động của những xe này
    const activeBookings = await Booking.findAll({
      where: {
        carID: carIDs,
        bookingStatus: "booking",
      },
      include: [
        {
          model: Car,
          include: [
            {
              model: Overview,
              attributes: ["model"],
            },
          ],
        },
      ],
    });

    return res.status(200).json(activeBookings);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Đã xảy ra lỗi khi lấy danh sách booking");
  }
};

//VIEW BALANCE
export const ViewBalance = async (req: Request, res: Response) => {
  const user = req.user;

  if (user) {
    console.log(user);

    const wallet = await Wallet.findOne({
      where: { customerID: user.customerID },
    });

    const balance = Number(wallet?.balance);

    console.log(balance);
    console.log(typeof balance);

    return res.status(200).json(`Số dư hiện tại của bạn là: ${balance} VND`);
  } else {
    return res.status(500).json("Người dùng chưa đăng nhập!");
  }
};

//REQUEST WITHDRAW
export const CreateWithdrawalRequest = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (user) {
      const { amount } = req.body;

      // Tìm ví của người dùng
      const wallet = await Wallet.findOne({
        where: { customerID: user.customerID },
      });

      const wantedAmount = new Decimal(amount);
      const realAmount = new Decimal(wallet?.balance ?? 0);

      const temp = realAmount.minus(wantedAmount);

      console.log(temp);

      // Kiểm tra số dư có đủ để rút tiền không
      if (Number(temp) >= 0) {
        // Kiểm tra yêu cầu rút tiền trong vòng 3 ngày qua
        const fiveDaysAgo = new Date();
        fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 3);

        const recentRequest = await Withdraw.findOne({
          where: {
            customerID: user.customerID,
            createdAt: {
              [Op.gte]: fiveDaysAgo, // Kiểm tra yêu cầu được tạo từ 3 ngày trước đến nay
            },
            status: "pending", // Chỉ xét các yêu cầu đang chờ xử lý (nếu có)
          },
        });

        if (recentRequest) {
          return res.status(400).json({
            message:
              "Bạn chỉ có thể gửi yêu cầu rút tiền 3 ngày một lần. Vui lòng thử lại sau.",
          });
        }

        // Tạo mã OTP và lưu yêu cầu mới
        const { OTP, otpExpiry } = GenerateOtp();

        const newRequest = await Withdraw.create({
          customerID: user.customerID,
          amount,
          OTP,
          otpExpiry,
          status: "pending",
        });

        return res.status(201).json({
          message: "Đã gửi yêu cầu rút tiền thành công!",
          newRequest,
        });
      } else {
        return res.status(400).json({
          message: "Số tiền bạn yêu cầu rút lớn hơn số dư trong ví!",
        });
      }
    } else {
      return res.status(401).json({ message: "Người dùng chưa đăng nhập!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Lỗi trong lúc gửi yêu cầu",
      error,
    });
  }
};

//AUTO DELETE WITHDRAW REQUEST
deleteExpiredWithdrawRequests();

//ALL BOOKING
export const GetAllBookingsForOwner = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.findAll();

    if (bookings) return res.status(200).json(bookings);
  } catch (error) {
    console.log(error);
  }
};

export const GetAllPendingBookingsForOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Lấy tất cả các booking có trạng thái "paied" và include thông tin liên quan
    const bookings = await Booking.findAll({
      where: { bookingStatus: "paied" },
      include: [
        {
          model: Car,
          as: "cars", // Tên alias theo model Booking
          include: [
            {
              model: Overview,
              as: "overview", // Tên alias theo model Car
            },
          ],
        },
      ],
    });

    if (bookings) {
      return res.status(200).json(bookings);
    } else {
      return res.status(404).json({ message: "No pending bookings found." });
    }
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//ALL PENDING BOOKING
export const GetAllBookingBookingsForOwner = async (
  req: Request,
  res: Response
) => {
  try {
    // Lấy tất cả các booking có trạng thái "booking" và include thông tin liên quan
    const bookings = await Booking.findAll({
      where: { bookingStatus: "booking" },
      include: [
        {
          model: Car,
          as: "cars", // Tên alias theo model Booking
          include: [
            {
              model: Overview,
              as: "overview", // Tên alias theo model Car
            },
          ],
        },
      ],
    });

    if (bookings) {
      return res.status(200).json(bookings);
    } else {
      return res.status(404).json({ message: 'No pending bookings found.' });
    }
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

//ALL BOOKING COMPLETE
export const GetAllCompleltedBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Lấy tất cả các booking có trạng thái "completed" và include thông tin liên quan
    const bookings = await Booking.findAll({
      where: { bookingStatus: "completed" },
      include: [
        {
          model: Car,
          as: "cars", // Tên alias theo model Booking
          include: [
            {
              model: Overview,
              as: "overview", // Tên alias theo model Car
            },
          ],
        },
      ],
    });

    if (bookings) {
      return res.status(200).json(bookings);
    } else {
      return res.status(404).json({ message: "No completed bookings found." });
    }
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//ACCEPT BOOKING
export const AcceptBookingForOwner = async (req: Request, res: Response) => {
  const user = req.user;

  if (user) {
    try {
      const { bookingID } = req.body;
      const booking = await Booking.findByPk(bookingID);

      const car = await Car.findByPk(booking?.carID);

      if (booking) booking.bookingStatus = "booking";

      await booking?.save();

      if (car) car.booked = true;
      console.log(car);

      await car?.save();

      return res.status(200).json("Quá trình thuê xe đã được duyệt!");
    } catch (error) {
      console.log(error);
    }
  } else return res.status(500).json("Bạn chưa đăng nhập!");
};

//USER SERVICE EMAIL
export const sendEmailServiceThankYouUser = async (
  email: string,
  bookingID: number
) => {
  const profileBooking = await Booking.findByPk(bookingID);

  const profileUser = await Customer.findByPk(profileBooking?.customerID);

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
    subject: "Cảm ơn bạn đã hoàn thành việc thuê xe tại CarLink 🚗", // Subject line
    text: "Cảm ơn bạn đã sử dụng dịch vụ thuê xe của CarLink. Chúng tôi rất mong được phục vụ bạn lần sau.", // plain text body
    html: `<div>Kính gửi ${profileUser?.firstName},<br><br>
  
            Cảm ơn bạn đã sử dụng dịch vụ thuê xe tại CarLink! Chúng tôi rất vui mừng thông báo rằng chuyến đi của bạn đã kết thúc thành công.<br><br/>
  
      
  
            <p>Chúng tôi hy vọng bạn có một trải nghiệm tuyệt vời cùng CarLink và rất mong được phục vụ bạn trong các chuyến đi tiếp theo!</p>
            
            <p>Để biết thêm chi tiết hoặc nếu có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email: <strong>${process.env.EMAIL_USER}</strong> hoặc số điện thoại: <strong>${process.env.PHONE_ADMIN}</strong>.</p>
  
            <p>Trân trọng,<br/>
            Đội ngũ CarLink</p>
        </div>`, // html body
  });

  return info;
};

//SEND MAIL TO USER TO NOTIFY
export const MailThankYouUser = async (email: string, bookingID: number) => {
  try {
    const profile = await Customer.findOne({ where: { email } });
    if (profile) {
      await sendEmailServiceThankYouUser(profile.email, bookingID);
      return "Thông tin chấp nhận đã được gửi đến email của bạn!";
    }
    return "Email không tồn tại trong hệ thống!";
  } catch (error) {
    console.log(error);
    throw new Error("Có lỗi xảy ra khi gửi email!");
  }
};

//COMPLETE BOOKING
// export const ConfirmCompletedBookingForOwner = async(req: Request, res: Response) => {

//   const user = req.user;

//   if(user) {

//     try {
      
//       const bookingID = req.body;
//       const booking = await Booking.findByPk(bookingID);

//       const customer = await Customer.findByPk(booking?.customerID);

//       const carID = booking?.carID;
//       const car = await Car.findByPk(carID);

//       if(booking) booking.bookingStatus = 'completed';

//       await booking?.save();

//       if(car) car.booked = false;
//       console.log(car);

//       await car?.save();
      
//       if (customer?.email) {
//         // Gửi email cảm ơn nếu email hợp lệ
//         MailThankYouUser(customer.email, bookingID);
//       } else {
//         console.log('Không có email hợp lệ của khách hàng');
//         // Xử lý trường hợp không có email hợp lệ nếu cần
//       }
      
//       return res.status(200).json('Quá trình thuê xe đã hoàn thành!');

//     } catch (error) {

//         console.log(error);

//     }

//   } else return res.status(500).json('Bạn chưa đăng nhập!');

// }
//COMPLETE BOOKING
export const ConfirmCompletedBookingForOwner = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json("Bạn chưa đăng nhập!");
  }

  try {
    // bookingID được gửi trong body
    const { bookingID } = req.body;
    // Tìm booking
    const booking = await Booking.findByPk(bookingID);

    if (!booking) {
      return res.status(404).json("Booking không tồn tại!");
    }

    // Lấy thông tin customer
    const customer = await Customer.findByPk(booking.customerID);

    // Lấy thông tin Car
    const car = await Car.findByPk(booking.carID);

    // Cập nhật trạng thái booking
    booking.bookingStatus = "completed";
    await booking.save();

    // Thả xe về trạng thái sẵn sàng
    if (car) {
      car.booked = false;
      await car.save();
    }

    // Tính điểm thưởng cho khách hàng (nếu có)
    // Giả sử booking.amount = số tiền thuê, 
    // ví dụ: 10,000 VND = 1 loyalPoint
    if (customer) {
      const amount = booking.totalAmount || 0; 
      // hoặc bạn có thể tính theo "bookingDays * pricePerDay"

      // Tính số điểm được thưởng
      const pointsEarned = Math.floor(amount / 10000); 
      // -> 1 point / 10k VND

      // Cộng vào loyalPoint
      customer.loyalPoint = (customer.loyalPoint || 0) + pointsEarned;
      await customer.save();

      // Gửi mail cảm ơn nếu có email
      if (customer.email) {
        MailThankYouUser(customer.email, bookingID);
      } else {
        console.log("Không có email hợp lệ của khách hàng");
      }
    }

    return res.status(200).json("Quá trình thuê xe đã hoàn thành!");

  } catch (error) {
    console.error("Lỗi ConfirmCompletedBookingForOwner:", error);
    return res.status(500).json("Đã xảy ra lỗi, vui lòng thử lại sau.");
  }
};


/**-----------------------------------------------------payment----------------------------------------------------------------------- */
export const createOwnerPayment = async (req: Request, res: Response) => {
  const amount = 100000; // Fixed amount for car owner payment
  const owner = req.user; // Assume this comes from authentication middleware

  const ownerID = owner?.customerID; // Extract owner ID from authenticated user

  // Find car with pending payment and isAvailable is NULL
  // const car = await Car.findOne({
  //   where: {
  //     customerID: ownerID,
  //     isAvailable: null // Add the condition for isAvailable being NULL
  //   }
  // });

  // if (!car) {
  //   return res.status(404).json({ message: "No car found requiring payment." });
  // }

  // const carID = car.carID;

  const wallet = await Wallet.findOne({where: {customerID: ownerID}});

  try {
    // Call PayOS service to create payment link
    let paymentUrl = await createPaymentPayosForOwner(amount, wallet?.walletID as any);

    // Return payment URL directly without updating the database
    return res.status(200).json({
      payUrl: paymentUrl,
    });
  } catch (error) {
    console.error("Error creating payment request:", error);

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "An unknown error occurred." });
    }
  }
};


//PAYMEMT FOR OWNER
export const createPaymentPayosForOwner = async (
  amount: number,
  walletID: number
) => {
  try {
    const orderCode = Number(String(new Date().getTime()).slice(-6)); // Generate order code as number

    const paymentData = {
      orderCode,
      amount,
      description: "Thanh toán phí đăng xe", // Rút ngắn để đảm bảo <= 25 ký tự
      returnUrl: "http://localhost:5173/",
      cancelUrl: "http://localhost:5173/",
    };

    console.log("Payment Data:", paymentData); // Debug payment data

    // Send request to PayOS to create payment link
    const response = await payOS.createPaymentLink(paymentData);

    console.log("Full PayOS Response:", response); // Debug full response

    if (response && (response as any).error) {
      const error = (response as any).error as { message: string };
      console.error("PayOS API Error:", error);
      throw new Error(`PayOS API Error: ${error.message}`);
    }

    if (response && response.checkoutUrl) {
      // Log transaction in the database (optional)
      await Transaction.create({
        walletID: walletID,
        paycode: orderCode.toString(),
        amount,
        paymentMode: "Thẻ tín dụng",
        paymentResponse: "Đang chờ",
        status: "Phí dịch vụ ban đầu",
        created_at: new Date(),
        updated_at: new Date(),
      });

      // Return payment URL
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
}
