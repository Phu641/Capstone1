import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/DashboardOwner.css";
import { toast } from "react-toastify"; // Import React-Toastify

const DashboardOwner = () => {
  const [activePage, setActivePage] = useState("dashboard");

  // Khai báo state để lưu dữ liệu từ API
  const [stats, setStats] = useState({
    totalCarOwner: 0,
    totalRentalsOwner: 0,
    revenueOwner: 0,
    balanceOwner: 0,
  });

  const [cars, setCars] = useState([]); // Thêm state cars để lưu dữ liệu xe
  const [withdrawAmount, setWithdrawAmount] = useState(""); // Số tiền rút
  const [withdrawRequests, setWithdrawRequests] = useState([]); // Danh sách yêu cầu rút tiền
  const [lastWithdrawTime, setLastWithdrawTime] = useState(null); // Lưu thời gian yêu cầu rút tiền cuối cùng

  const navigate = useNavigate(); // Khởi tạo navigate

  const handleDashboardClick = () => {
    setActivePage("dashboard");
  };

  const handleManageVehiclesClick = () => {
    navigate("/manage-vehicles"); // Điều hướng đến trang Quản lý xe
  };

  const handleRentalRequestsClick = () => {
    setActivePage("rentalRequests");
  };

  // Lấy token từ localStorage hoặc nơi bạn lưu trữ token
  const token = localStorage.getItem("token");

  // Lấy dữ liệu xe từ API và tính tổng số xe đang cho thuê
  const fetchCarData = async () => {
    try {
      const response = await fetch("http://localhost:3000/owner/all-cars", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token trong header
        },
      });

      if (!response.ok) {
        throw new Error("Không thể lấy dữ liệu từ server");
      }

      const carData = await response.json();

      if (Array.isArray(carData)) {
        const totalCars = carData.filter((car) => car.isAvailable).length;
        setStats((prevStats) => ({
          ...prevStats,
          totalCarOwner: totalCars,
        }));

        setCars(carData);
      } else {
        console.error("Dữ liệu trả về không phải là mảng:", carData);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu Car:", error);
    }
  };

  // Lấy số dư ví từ API và trích xuất số dư từ chuỗi
  const fetchBalance = async () => {
    try {
      const response = await fetch("http://localhost:3000/owner/view-balance", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token trong header
        },
      });

      if (!response.ok) {
        throw new Error("Không thể lấy dữ liệu số dư từ server");
      }

      const balanceData = await response.text(); // Lấy dữ liệu dưới dạng chuỗi

      // Sử dụng biểu thức chính quy để trích xuất số dư từ chuỗi
      const balanceMatch = balanceData.match(/(\d+)\s*VND/);

      if (balanceMatch && balanceMatch[1]) {
        // Nếu tìm thấy số dư trong chuỗi, cập nhật state
        const balance = parseInt(balanceMatch[1], 10); // Chuyển đổi số dư sang kiểu number
        setStats((prevStats) => ({
          ...prevStats,
          balanceOwner: balance, // Lưu giá trị số dư vào state
        }));
      } else {
        console.error("Không thể trích xuất số dư từ chuỗi:", balanceData);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu số dư:", error);
    }
  };

  // Lấy thời gian yêu cầu rút tiền cuối cùng từ API (nếu có)
  const fetchLastWithdrawTime = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/owner/last-withdraw-time",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        }
      );

      if (!response.ok) {
        throw new Error("Không thể lấy thời gian yêu cầu rút tiền cuối cùng");
      }

      const data = await response.json();
      setLastWithdrawTime(new Date(data.lastWithdrawTime)); // Lưu thời gian yêu cầu rút tiền cuối cùng
    } catch (error) {
      console.error("Lỗi khi lấy thời gian yêu cầu rút tiền:", error);
    }
  };

  // Gửi yêu cầu rút tiền
  const handleWithdrawRequest = async () => {
    if (!withdrawAmount || withdrawAmount <= 0) {
      alert("Vui lòng nhập số tiền hợp lệ");
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
          body: JSON.stringify({
            amount: withdrawAmount,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message); // Hiển thị toast thành công
        setWithdrawRequests((prevRequests) => [
          ...prevRequests,
          data.newRequest,
        ]);
        setWithdrawAmount(""); // Reset số tiền sau khi gửi yêu cầu
      } else {
        toast.error(data.message || "Đã xảy ra lỗi khi gửi yêu cầu rút tiền"); // Hiển thị toast thất bại
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu rút tiền:", error);
      toast.error("Đã xảy ra lỗi khi gửi yêu cầu rút tiền"); // Hiển thị toast thất bại
    }
  };

  useEffect(() => {
    fetchCarData();
    fetchBalance(); // Gọi hàm lấy số dư khi component mount
    fetchLastWithdrawTime(); // Lấy thời gian yêu cầu rút tiền cuối cùng khi component mount
  }, []);

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <ul>
          <li
            className={activePage === "dashboard" ? "active" : ""}
            onClick={handleDashboardClick}
          >
            Dashboard
          </li>
          <li
            className={activePage === "manageVehicles" ? "active" : ""}
            onClick={handleManageVehiclesClick}
          >
            Quản lý xe
          </li>
          {/* <li
            className={activePage === "rentalRequests" ? "active" : ""}
            onClick={handleRentalRequestsClick}
          >
            Yêu cầu thuê xe
          </li> */}
        </ul>
      </div>

      <div className="main-content">
        {activePage === "dashboard" && (
          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>Tổng số xe đang cho thuê trên CarLink</h3>
              <p>{stats.totalCarOwner}</p>
            </div>
            <div className="stat-card">
              <h3>Tổng số lượt thuê tháng này</h3>
              <p>{stats.totalRentalsOwner}</p>
            </div>
            <div className="stat-card">
              <h3>Doanh thu tháng</h3>
              <p>{stats.revenueOwner.toLocaleString("vi-VN")} VND</p>{" "}
              {/* Định dạng doanh thu */}
            </div>
            <div className="stat-card">
              <h3>Số dư trong ví</h3>
              <p>{stats.balanceOwner.toLocaleString("vi-VN")} VND</p>{" "}
              {/* Định dạng số dư */}
            </div>
          </div>
        )}

        {activePage === "manageVehicles" && (
          <div className="manage-vehicles">
            <h3>Quản lý xe (Chức năng này hiện tại không có nội dung)</h3>
          </div>
        )}

        {activePage === "rentalRequests" && (
          <div className="rental-requests">
            <h3>Danh sách yêu cầu thuê xe</h3>
            {/* Hiển thị danh sách yêu cầu thuê xe tại đây */}
          </div>
        )}

        {/* Thêm phần rút tiền */}
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
