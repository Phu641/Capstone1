import React, { useEffect, useState } from "react";
import { toast } from "react-toastify"; // Import React-Toastify
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/BrowseRentals.css";

const BrowseRentals = () => {
  const [bookings, setBookings] = useState([]); // Danh sách hợp nhất từ hai API
  const [activePage, setActivePage] = useState("browseRentals"); // Đặt trang hiện tại là "browseRentals"
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  const navigate = useNavigate(); // Khởi tạo navigate

  // Hàm lấy danh sách đơn đặt xe từ API
  const fetchBookings = async () => {
    try {
      const [pendingResponse, bookingResponse] = await Promise.all([
        fetch("http://localhost:3000/owner/all-pending-bookings", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch("http://localhost:3000/owner/all-booking-bookings", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      if (!pendingResponse.ok || !bookingResponse.ok) {
        throw new Error("Không thể lấy danh sách từ server");
      }

      const pendingData = await pendingResponse.json();
      const bookingData = await bookingResponse.json();

      // Hợp nhất danh sách
      const combinedBookings = [
        ...pendingData.map((item) => ({ ...item, type: "pending" })),
        ...bookingData.map((item) => ({ ...item, type: "booking" })),
      ];
      setBookings(combinedBookings);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đặt xe:", error);
    }
  };

  // Hàm xử lý duyệt đơn đặt xe
  const handleApproveBooking = async (bookingID) => {
    try {
      const response = await fetch(
        "http://localhost:3000/owner/accept-booking",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookingID }),
        }
      );

      if (response.ok) {
        toast.success("Duyệt đơn đặt xe thành công!");
        fetchBookings(); // Cập nhật danh sách
      } else {
        toast.error("Có lỗi xảy ra khi duyệt đơn đặt xe!");
      }
    } catch (error) {
      console.error("Lỗi khi duyệt đơn đặt xe:", error);
      toast.error("Có lỗi xảy ra khi duyệt đơn đặt xe!");
    }
  };

  // Hàm xử lý hoàn thành đơn đặt xe
  const handleCompleteBooking = async (bookingID) => {
    try {
      const response = await fetch(
        "http://localhost:3000/owner/confirm-booking",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookingID }),
        }
      );

      if (response.ok) {
        toast.success("Đơn đặt xe đã được hoàn thành!");
        fetchBookings(); // Cập nhật danh sách
      } else {
        toast.error("Có lỗi xảy ra khi hoàn thành đơn đặt xe!");
      }
    } catch (error) {
      console.error("Lỗi khi hoàn thành đơn đặt xe:", error);
      toast.error("Có lỗi xảy ra khi hoàn thành đơn đặt xe!");
    }
  };

  // Gọi API khi component được mount
  useEffect(() => {
    fetchBookings();
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
        <h2 className="browse-rentals-title">
          Danh sách thuê xe đang chờ xác nhận
        </h2>
        <table className="browse-rentals-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>ID thuê xe</th>
              <th>Thời gian đặt xe</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Mẫu xe</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr key={booking.bookingID}>
                  <td>{index + 1}</td>
                  <td>{booking.bookingID}</td>
                  <td>
                    {new Date(booking.createdAt).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </td>
                  <td>
                    {parseInt(booking.totalAmount, 10).toLocaleString("vi-VN")}{" "}
                    VND
                  </td>
                  <td>
                    {booking.bookingStatus === "paied"
                      ? "Đã thanh toán cọc"
                      : booking.bookingStatus === "booking"
                      ? "Đang được thuê"
                      : booking.bookingStatus}
                  </td>
                  <td>{booking.cars?.overview?.model || "Không xác định"}</td>
                  <td>
                    {booking.type === "pending" ? (
                      <button
                        className="browse-rentals-approve-button"
                        onClick={() => handleApproveBooking(booking.bookingID)}
                      >
                        Duyệt
                      </button>
                    ) : (
                      <button
                        className="browse-rentals-complete-button"
                        onClick={() => handleCompleteBooking(booking.bookingID)}
                      >
                        Hoàn thành
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">Không có đơn đặt xe nào</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrowseRentals;
