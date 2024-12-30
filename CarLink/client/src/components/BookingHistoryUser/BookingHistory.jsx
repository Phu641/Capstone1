import React, { useState, useEffect } from "react";
import "./BookingHistory.css";

const BookingHistory = () => {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookingHistory = async () => {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      if (!token) {
        setError("You need to log in to view your booking history.");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:3000/customer/booking-history",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Thêm token vào header
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setBookingHistory(data);
      } catch (err) {
        console.error("Lỗi khi tải lịch sử đặt chỗ:", err);
        setError("Không tải được lịch sử đặt chỗ. Vui lòng thử lại sau.");
      }
    };

    fetchBookingHistory();
  }, []);

  const calculateDays = (bookingDate, untilDate) => {
    const startDate = new Date(bookingDate);
    const endDate = new Date(untilDate);
    const differenceInTime = endDate - startDate;
    return Math.ceil(differenceInTime / (1000 * 3600 * 24)); // Tính số ngày
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Đã hoàn thành";
      case "pending":
        return "Đang chờ";
      case "canceled":
        return "Đã hủy";
      default:
        return "Không xác định";
    }
  };

  if (error) {
    return <div className="booking-history-container">{error}</div>;
  }

  return (
    <div className="booking-history-container">
      <h2 className="booking-history-title">Lịch sử thuê xe</h2>
      <table className="booking-history-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>ID Thuê xe</th>
            <th>Số tiền</th>
            <th>Tên xe</th>
            <th>Số ngày thuê</th>
            <th>Thời gian đặt xe</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {bookingHistory.map((booking, index) => (
            <tr key={booking.bookingID}>
              <td>{index + 1}</td>
              <td>{booking.bookingID}</td>
              <td>{booking.totalAmount}</td>
              <td>{booking.cars?.overview?.model || "N/A"}</td>
              <td>
                {calculateDays(booking.bookingDate, booking.untilDate) || "N/A"}
              </td>
              <td>{new Date(booking.createdAt).toLocaleString()}</td>
              <td>
                {booking.bookingStatus === "completed" ? (
<div className="flame-effect">Đã hoàn thành</div>
                ) : (
                  getStatusText(booking.bookingStatus)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingHistory;
