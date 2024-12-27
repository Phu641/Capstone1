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


import axios from "axios";

export const getAccessToken = async (): Promise<string> => {
  try {
    const response = await axios.post(
      "https://api.payos.vn/v1/auth/token",
      {
        client_id: "6b808926-685f-45a1-a532-908bccb31368", // Thay bằng client_id của bạn
        client_secret: "da86690d-b052-4928-a51a-b9c52659062a", // Thay bằng client_secret của bạn
        grant_type: "1fd42ecdf13c1c4cbf8aaebd0063c0bea084ddb6961809d3e02c7e207bcc7b3e",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { access_token } = response.data; // Lấy access_token từ phản hồi
    console.log("Access Token:", access_token);
    return access_token;
  } catch (error) {
    console.error("Lỗi khi lấy Access Token:", error);
    throw new Error("Không thể lấy Access Token từ PayOS.");
  }
};

export const cancelPaymentRequest = async (orderCode: string) => {
  try {
    const accessToken = await getAccessToken(); // Lấy Access Token từ hàm trên

    const response = await axios.post(
      "https://api.payos.vn/v1/payment/cancel",
      { orderCode },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Đính kèm Access Token
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`Hủy thanh toán thành công cho mã đơn hàng ${orderCode}.`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi hủy thanh toán cho mã đơn hàng ${orderCode}:`, error);
    throw new Error("Hủy thanh toán thất bại");
  }
};

