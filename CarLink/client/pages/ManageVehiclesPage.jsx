import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ManageVehiclesPage.css";

const ManageVehiclesPage = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchCarData = async () => {
    try {
      const response = await fetch("http://localhost:3000/owner/all-cars", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Không thể lấy dữ liệu từ server');
      }

      const carData = await response.json();
      if (Array.isArray(carData)) {
        const availableCars = carData.filter(car => car.isAvailable);
        setCars(availableCars);
      } else {
        console.error("Dữ liệu trả về không phải là mảng:", carData);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu xe:", error);
    }
  };

  useEffect(() => {
    fetchCarData();
  }, []);

  const handleUpdate = (carID) => {
    navigate(`/update-vehicle/${carID}`); // Điều hướng đến trang chỉnh sửa xe
  };

  return (
    <div className="manage-vehicles-container">
      <table className="manage-vehicles-table">
        <thead>
          <tr>
            <th colSpan="7">
              <h3>Danh sách xe có sẵn của bạn</h3>
            </th>
          </tr>
          <tr>
            <th>ID xe</th>
            <th>Tên xe</th>
            <th>Giá thuê xe mỗi ngày</th>
            <th>Địa chỉ</th>
            <th>Mô tả chi tiết xe</th>
            <th>Phương tiện</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {cars.length > 0 ? (
            cars.map((car) => (
              <tr key={car.carID}>
                <td>{car.carID}</td>
                <td>{car.overview.model}</td>
                <td>{car.overview.pricePerDay} VND</td>
                <td>{car.overview.address}</td>
                <td>{car.overview.description}</td>
                <td>
                  {car.carImages && car.carImages.length > 0 ? (
                    // Ưu tiên hiển thị ảnh nếu có
                    car.carImages[0].imageUrl.toLowerCase().endsWith(".mp4") ? (
                      <video
                        controls
                        src={`http://localhost:3000/videos/${car.carImages[0].imageUrl}`}
                        style={{ width: '100px', height: '100px', marginRight: '10px' }}
                      />
                    ) : (
                      <img
                        src={`http://localhost:3000/images/${car.carImages[0].imageUrl}`}
                        alt="Car Media"
                        style={{ width: '100px', height: '100px', marginRight: '10px' }}
                      />
                    )
                  ) : (
                    <span>Chưa có phương tiện</span>
                  )}
                </td>
                <td>
                  <button
                    className="update-button"
                    onClick={() => handleUpdate(car.carID)}
                  >
                    Cập nhật thông tin
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Chưa có xe nào có sẵn.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageVehiclesPage;
