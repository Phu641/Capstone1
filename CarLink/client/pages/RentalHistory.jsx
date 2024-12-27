import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RentalHistory.css";

const RentalHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [activePage, setActivePage] = useState("rentalHistory"); // Đặt trang hiện tại là "rentalHistory"
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  const navigate = useNavigate(); // Khởi tạo navigate

  // Gọi API để lấy danh sách các booking đã hoàn thành
  const fetchCompletedBookings = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/owner/all-completed-bookings",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Không thể lấy dữ liệu từ server");
      }

      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu lịch sử thuê xe:", error);
    }
  };

  useEffect(() => {
    fetchCompletedBookings();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <ul>
          <li
            className={activePage === "dashboard" ? "active" : ""}
            onClick={() => navigate("/DashboardOwner")}
          >
            Dashboard
          </li>
          <li
            className={activePage === "manageVehicles" ? "active" : ""}
            onClick={() => navigate("/manage-vehicles")}
          >
            Quản lý xe
          </li>
          <li
            className={activePage === "browseRentals" ? "active" : ""}
            onClick={() => navigate("/browse-rentals")}
          >
            Duyệt thuê xe
          </li>
          <li
            className={activePage === "rentalHistory" ? "active" : ""}
            onClick={() => navigate("/rental-history")}
          >
            Lịch sử thuê xe
          </li>
        </ul>
      </div>

      <div className="main-content">
        <div className="rental-history-container">
          <table className="rental-history-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>ID Đơn hàng</th>
                <th>Mẫu xe</th>
                <th>Customer ID</th>
                <th>Ngày thuê xe</th>
                <th>Ngày trả xe</th>
                <th>Số tiền sau khi trừ 10% phí DV</th>
                <th>Trạng thái</th>
                <th>Thời gian tạo</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking, index) => (
                  <tr key={booking.bookingID}>
                    <td>{index + 1}</td>
                    <td>{booking.bookingID}</td>
                    <td>{booking.cars.overview.model}</td>
                    <td>{booking.customerID}</td>
                    <td>
                      {new Date(booking.bookingDate).toLocaleDateString(
                        "vi-VN"
                      )}
                    </td>
                    <td>
                      {new Date(booking.untilDate).toLocaleDateString("vi-VN")}
                    </td>
                    <td>
                      {parseInt(booking.totalAmount, 10).toLocaleString(
                        "vi-VN"
                      )}{" "}
                      VND
                      <br />
                      <span style={{ color: "gray", fontSize: "0.9em" }}>
                        (
                        {(
                          parseInt(booking.totalAmount, 10) * 0.9
                        ).toLocaleString("vi-VN")}{" "}
                        VND Số tiền thực nhận được)
                      </span>
                    </td>
                    {/* <td>{booking.bookingStatus}</td> */}
                    <td className="status completed">
                      {booking.bookingStatus === "completed"
                        ? "Đã hoàn thành"
                        : booking.bookingStatus}
                    </td>

                    <td>
                      {new Date(booking.createdAt).toLocaleString("vi-VN")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">Bạn Không có lịch sử thuê xe nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RentalHistory;
