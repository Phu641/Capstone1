import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DashboardAdmin.css";
import RevenueChart from "../src/components/Chart/RevenueChart";
import VehicleApprovalPage from "./VehicleApprovalPage";

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const [showDashboard, setShowDashboard] = useState(true);
  const [showVehicleApproval, setShowVehicleApproval] = useState(false);
  const [activePage, setActivePage] = useState("DashboardAdmin");

  // State để lưu trữ dữ liệu từ API
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCars: 0,
    totalRentals: 0,
    revenue: 0,
  });

  // Sử dụng useEffect để gọi API khi component được render
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Lấy token admin từ localStorage (hoặc một nguồn khác)
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Không tìm thấy token admin. Vui lòng đăng nhập lại.");
          return;
        }

        // Gọi API để lấy dữ liệu xe với header authorization
        const carsResponse = await fetch(
          "http://localhost:3000/admin/all-cars-availability",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Thêm token vào header
            },
          }
        );

        if (!carsResponse.ok) {
          console.error(
            "Không thể truy cập dữ liệu xe. Vui lòng kiểm tra quyền admin."
          );
          return;
        }

        const carsData = await carsResponse.json();
        const totalCars = carsData.length;

        // Gọi API để lấy dữ liệu người dùng với header authorization
        const usersResponse = await fetch(
          "http://localhost:3000/admin/all-users",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Thêm token vào header
            },
          }
        );

        if (!usersResponse.ok) {
          console.error(
            "Không thể truy cập dữ liệu người dùng. Vui lòng kiểm tra quyền admin."
          );
          return;
        }

        const usersData = await usersResponse.json();
        const totalUsers = usersData.length;

        // Cập nhật state stats với tổng số xe và tổng số người dùng
        setStats((prevStats) => ({
          ...prevStats,
          totalCars: totalCars,
          totalUsers: totalUsers,
        }));
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchStats();
  }, []);

  const handleManageUsersClick = () => {
    navigate("/user-list");
    setActivePage("manageUsers");
  };

  const handleDashboardClick = () => {
    navigate("/DashboardAdmin");
    setActivePage("DashboardAdmin");
  };

  const handleVehicleApprovalClick = () => {
    navigate("/vehicle-approval");
    setActivePage("vehicleApproval");
  };

  const handleOwnerReportsClick = () => {
    navigate("/owner-reports");
    setActivePage("ownerReports");
  };

  const handleReportHistoryClick = () => {
    navigate("/report-history");
    setActivePage("reportHistory");
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        {" "}
        {/* Đã sửa className "sideb ar" thành "sidebar" */}
        <ul>
          <li
            className={activePage === "DashboardAdmin" ? "active" : ""}
            onClick={handleDashboardClick}
          >
            Dashboard
          </li>
          <li
            className={activePage === "manageUsers" ? "active" : ""}
            onClick={handleManageUsersClick}
          >
            Quản lý người dùng
          </li>
          <li
            className={activePage === "vehicleApproval" ? "active" : ""}
            onClick={handleVehicleApprovalClick}
          >
            Kiểm duyệt xe
          </li>
          <li className={activePage === "bookingApproval" ? "active" : ""}>
            Kiểm duyệt Booking
          </li>
          <li className={activePage === "customerFeedback" ? "active" : ""}>
            Phản hồi của khách hàng
          </li>
          <li
            className={activePage === "ownerReports" ? "active" : ""}
            onClick={handleOwnerReportsClick}
          >
            Báo cáo của chủ xe
          </li>
          <li
            className={activePage === "reportHistory" ? "active" : ""}
            onClick={handleReportHistoryClick}
          >
            Lịch sử báo cáo
          </li>
          <li className={activePage === "settings" ? "active" : ""}>Cài đặt</li>
        </ul>
      </div>

      <div className="main-content">
        {showDashboard && (
          <>
            <header className="dashboard-header"></header>

            <div className="dashboard-stats">
              <div className="stat-card">
                <h3>Tổng người dùng trên hệ thống</h3>
                <p>{stats.totalUsers}</p>
              </div>
              <div className="stat-card">
                <h3>Tổng xe đang hoạt động cho thuê</h3>
                <p>{stats.totalCars}</p>
              </div>
              <div className="stat-card">
                <h3>Tổng lượt thuê</h3>
                <p>{stats.totalRentals}</p>
              </div>
              <div className="stat-card">
                <h3>Doanh thu</h3>
                <p>{stats.revenue} VND</p>
              </div>
            </div>

            <div className="chart-container">
              <RevenueChart />
            </div>
          </>
        )}

        {showVehicleApproval && <VehicleApprovalPage />}
      </div>
    </div>
  );
};

export default DashboardAdmin;
