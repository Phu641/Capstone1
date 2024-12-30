import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DashboardOwner.css";
import { toast } from "react-toastify";

const DashboardOwner = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalCarOwner: 0,
    totalRentalsOwner: 0,
    revenueOwner: 0,
    balanceOwner: 0,
  });

  const [withdrawAmount, setWithdrawAmount] = useState("");
  const token = localStorage.getItem("token");

  // Lấy dữ liệu xe
  const fetchCarData = async () => {
    try {
      const response = await fetch("http://localhost:3000/owner/all-cars", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Không thể lấy dữ liệu từ server");
      }

      const carData = await response.json();
      setStats((prevStats) => ({
        ...prevStats,
        totalCarOwner: carData.filter((car) => car.isAvailable).length,
      }));
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu Car:", error);
    }
  };

  // Lấy doanh thu tháng và số lượt thuê
  const fetchRevenueAndRentals = async () => {
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
        throw new Error(
          "Không thể lấy dữ liệu doanh thu và lượt thuê từ server"
        );
      }

      const bookings = await response.json();
      const totalRevenue = bookings
        .filter((booking) => booking.bookingStatus === "completed")
        .reduce((sum, booking) => sum + parseInt(booking.totalAmount, 10), 0);

      const totalRentals = bookings.filter(
        (booking) => booking.bookingStatus === "completed"
      ).length;

      setStats((prevStats) => ({
        ...prevStats,
        revenueOwner: totalRevenue * 0.9, // Trừ 10% phí
        totalRentalsOwner: totalRentals,
      }));
    } catch (error) {
      console.error("Lỗi khi lấy doanh thu và lượt thuê:", error);
    }
  };

  // Lấy số dư
  const fetchBalance = async () => {
    try {
      const response = await fetch("http://localhost:3000/owner/view-balance", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Không thể lấy dữ liệu số dư từ server");
      }

      const balanceData = await response.text();
      const balanceMatch = balanceData.match(/(\d+)\s*VND/);
      if (balanceMatch && balanceMatch[1]) {
        setStats((prevStats) => ({
          ...prevStats,
          balanceOwner: parseInt(balanceMatch[1], 10),
        }));
      } else {
        console.error("Không thể trích xuất số dư từ chuỗi:", balanceData);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu số dư:", error);
    }
  };

  // Xử lý rút tiền
  const handleWithdrawRequest = async () => {
    if (!withdrawAmount || withdrawAmount <= 0) {
      toast.error("Vui lòng nhập số tiền hợp lệ");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/owner/request-withdraw",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount: withdrawAmount }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setWithdrawAmount("");
      } else {
        toast.error(data.message || "Đã xảy ra lỗi khi gửi yêu cầu rút tiền");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu rút tiền:", error);
      toast.error("Đã xảy ra lỗi khi gửi yêu cầu rút tiền");
    }
  };

  useEffect(() => {
    fetchCarData();
    fetchRevenueAndRentals();
    fetchBalance();
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
        {activePage === "dashboard" && (
          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>Tổng số xe đang cho thuê</h3>
              <p>{stats.totalCarOwner}</p>
            </div>
            <div className="stat-card">
              <h3>Tổng số lượt thuê tháng này</h3>
              <p>{stats.totalRentalsOwner}</p>
            </div>
            <div className="stat-card">
              <h3>Doanh thu tháng</h3>
              <p>{stats.revenueOwner.toLocaleString("vi-VN")} VND</p>
            </div>
            <div className="stat-card">
              <h3>Số dư trong ví</h3>
              <p>{stats.balanceOwner.toLocaleString("vi-VN")} VND</p>
            </div>
          </div>
        )}

        {/* Phần Rút Tiền */}
        <div className="withdraw-section">
          <h3>Yêu cầu rút tiền</h3>
          <div>
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="Nhập số tiền cần rút"
            />
            <button onClick={handleWithdrawRequest}>Gửi yêu cầu</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOwner;
