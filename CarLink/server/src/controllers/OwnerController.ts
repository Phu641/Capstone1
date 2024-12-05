import { Request, Response, NextFunction } from "express";
import { CreateCarInputs } from "../dto";
import { FindOwner } from "./AdminController";
import { Car, Coordinate, Images, Overview, Booking, Report, Customer } from "../models";
import { getCoordinates } from "../utility";




//ADD CAR
export const AddCar = async(req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    if(user) {

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

        if(owner) {

            const files = req.files as [Express.Multer.File];

            const createdCar = await Car.create({
                customerID: owner.customerID,
                delivery,
                selfPickUp,
                booked: false,
                isAvailable: false
            })

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
                description
            });
            
            const resultCar = await createdCar.save();
            await createdOverview.save();

            // Save images to Image model
            const images = files.map((file) => {
                return Images.create({
                    carID: resultCar.carID, // Link image to the created car
                    imageUrl: file.filename
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
                    longitude: coordinates.longitude // Use correct longitude
                });
            } catch (error) {
                console.error("Không thể lấy tọa độ:", error);
                return res.status(500).json({
                    message: "Đã xảy ra lỗi khi lấy tọa độ. Vui lòng kiểm tra địa chỉ nhập vào."
                });
            }

           return res.status(200).json(resultCar);

        }

    }

    return res.status(500).json('Đã có lỗi xảy ra với việc thêm xe!');

}

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
                        attributes: ['model', 'type', 'year', 'transmission', 'fuelType', 'seats', 'pricePerDay', 'address', 'description']
                    },
                    {
                        model: Images,
                        attributes: ['imageUrl']
                    }
                ]
            });

            if (!cars || cars.length === 0) {
                return res.status(404).json({ message: "Không có xe nào được tìm thấy." });
            }

            return res.status(200).json(cars);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách xe:", error);
            return res.status(500).json({ message: "Đã xảy ra lỗi khi lấy danh sách xe." });
        }
    }

    return res.status(401).json({ message: "Người dùng không được xác thực." });
};

// UPDATE CAR
export const UpdateCar = async (req: Request, res: Response, next: NextFunction) => {
    
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
            description 
        } = req.body;

        try {
            // Find the car and its related overview
            const car = await Car.findOne({ where: { carID, customerID: user.customerID } });
            const overview = await Overview.findOne({ where: { carID } });

            if (!car || !overview) {
                return res.status(404).json({ message: "Không tìm thấy xe hoặc thông tin chi tiết xe." });
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
                            longitude: coordinates.longitude
                        },
                        { where: { carID } }
                    );
                } catch (error) {
                    console.error("Không thể lấy tọa độ:", error);
                    return res.status(500).json({
                        message: "Đã xảy ra lỗi khi cập nhật tọa độ. Vui lòng kiểm tra địa chỉ nhập vào."
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
                        imageUrl: file.filename
                    });
                });
                await Promise.all(imagePromises);
            }

            // Save updated car and overview
            await car.save();
            await overview.save();

            return res.status(200).json({ message: "Cập nhật thông tin xe thành công." });
        } catch (error) {
            console.error("Lỗi khi cập nhật xe:", error);
            return res.status(500).json({ message: "Đã xảy ra lỗi khi cập nhật xe." });
        }
    }

    return res.status(401).json({ message: "Người dùng không được xác thực." });
};


//STOP SERVICE
export const StopService = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: "Bạn chưa đăng nhập." });
        }

        const { carID } = req.body;

        if (!carID)  return res.status(400).json({ message: "Thiếu thông tin carID." });

        const car = await Car.findByPk(carID);

        if (!car)  return res.status(404).json({ message: "Không tìm thấy xe với ID này." });

        car.booked = true;

        await car.save();

        return res.status(200).json({ message: "Đã dừng dịch vụ đối với xe này." });

    } catch (error) {

        console.error("Lỗi khi dừng dịch vụ:", error);
        return res.status(500).json({ message: "Có lỗi xảy ra khi dừng dịch vụ." });

    }
};

//START SERVICE
export const StartService = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: "Bạn chưa đăng nhập." });
        }

        const { carID } = req.body;

        if (!carID)  return res.status(400).json({ message: "Thiếu thông tin carID." });

        const car = await Car.findByPk(carID);

        if (!car)  return res.status(404).json({ message: "Không tìm thấy xe với ID này." });

        car.booked = false;

        await car.save();

        return res.status(200).json({ message: "Đã bật dịch vụ đối với xe này." });

    } catch (error) {

        console.error("Lỗi khi dừng dịch vụ:", error);
        return res.status(500).json({ message: "Có lỗi xảy ra khi dừng dịch vụ." });

    }

}

// //CONFRIM 
// export const SubmitReport = async (req: Request, res: Response, next: NextFunction) => {
//     const user = req.user; // Lấy thông tin user từ middleware xác thực
//     const { bookingID, idCard, description } = req.body;

//     try {
//         // Tìm booking theo bookingID
//         const booking = await Booking.findByPk(bookingID);

//         if (!booking) {
//             return res.status(404).json({ message: "Không tìm thấy thông tin thuê xe!" });
//         }

//         // Kiểm tra xem user có phải là chủ xe không
//         const car = await Car.findByPk(booking.carID);
//         if (!car || car.customerID !== user?.customerID) {
//             return res.status(403).json({ message: "Bạn không có quyền xác nhận cho xe này!" });
//         }

//         // Cập nhật trạng thái booking thành 'completed'
//         // booking.bookingStatus = "completed";
//         // await booking.save();

//         // Kiểm tra file video được upload
//         const file = req.file; // Sử dụng req.file thay vì req.files vì chỉ upload 1 file
//         if (!file) {
//             return res.status(400).json({ message: "Vui lòng upload video hư hỏng!" });
//         }

//         // Tạo một report mới
//         const report = await Report.create({
//             bookingID,
//             idCard, // Lấy thông tin căn cước của người thuê từ bảng Booking
//             returnDate: new Date(), // Ngày trả xe hiện tại
//             damageVideo: file.filename, // Lưu tên file video
//             description,
//         });

//         return res.status(200).json({
//             message: "Xác nhận hoàn thành thuê xe thành công!",
//             report,
//         });
//     } catch (error) {
//         console.error("Lỗi khi submit report:", error);
//         return res.status(500).json({
//             message: "Đã xảy ra lỗi khi xác nhận thuê xe, vui lòng thử lại!",
//         });
//     }
// };
export const SubmitReport = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user; // Lấy thông tin user từ middleware xác thực
    const { bookingID, idCard, description } = req.body;

    try {
        // Tìm booking theo bookingID
        const booking = await Booking.findByPk(bookingID);

        if (!booking) {
            return res.status(404).json({ message: "Không tìm thấy thông tin thuê xe!" });
        }

        // Kiểm tra xem đơn thuê đã được hoàn thành chưa
        if (booking.bookingStatus === 'completed') {
            return res.status(400).json({ message: "Đơn thuê này đã được hoàn thành và báo cáo!" });
        }

        // Kiểm tra xem user có phải là chủ xe không
        const car = await Car.findByPk(booking.carID);
        if (!car || car.customerID !== user?.customerID) {
            return res.status(403).json({ message: "Bạn không có quyền xác nhận cho xe này!" });
        }

        // Kiểm tra xem validate có phải là true không
        if (req.body.validate) {
            const customer = await Customer.findByPk(booking.customerID);
            return res.status(200).json({
                booking: {
                    bookingID: booking.bookingID,
                    idCard: customer?.idCard
                }
            });
        }

        // Kiểm tra file video (nếu có)
        const file = req.file; // Sử dụng req.file vì chỉ upload 1 file (tùy vào middleware)
        let damageVideo = null;
        if (file) {
            damageVideo = file.filename; // Lưu tên file video nếu có
        }

        // Tạo một report mới
        const report = await Report.create({
            bookingID,
            idCard, // Lấy thông tin căn cước của người thuê từ bảng Booking
            returnDate: new Date(), // Ngày trả xe hiện tại
            damageVideo, // Có thể để null nếu không có file
            description,
        });

        return res.status(200).json({
            message: "Xác nhận hoàn thành thuê xe thành công từ chủ xe!",
            report,
        });
    } catch (error) {
        console.error("Lỗi khi submit report:", error);
        return res.status(500).json({
            message: "Đã xảy ra lỗi khi xác nhận thuê xe, vui lòng thử lại!",
        });
    }
};
