import React, { useState, useEffect } from "react";

const DashboardOwner = () => {
  const [activePage, setActivePage] = useState("dashboard");

  // Khai báo state để lưu dữ liệu từ API
  const [stats, setStats] = useState({
    totalCarOwner: 0,
    totalRentalsOwner: 0,
    revenueOwner: 0,
    balanceOwner: 0,
  });

  const handleDashboardClick = () => {
    setActivePage("dashboard");
  };

  const handleManageVehiclesClick = () => {
    setActivePage("manageVehicles");
  };

  const handleRentalRequestsClick = () => {
    setActivePage("rentalRequests");
  };

  // tính số xe đang cho thuê
  const fetchCarData = async () => {
    try {
      const response = await fetch("http://localhost:3000/searching/cars");
      const carData = await response.json();

      // Tính số lượng xe đang cho thuê (isAvailable = true)
      const totalCars = carData.filter(car => car.isAvailable).length;

      // lưu vào state
      setStats(prevStats => ({
        ...prevStats,
        totalCarOwner: totalCars,
      }));
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu Car:", error);
    }
  };

  // Lấy dữ liệu khi component được render lần đầu
  useEffect(() => {
    fetchCarData();
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
          <li
            className={activePage === "rentalRequests" ? "active" : ""}
            onClick={handleRentalRequestsClick}
          >
            Yêu cầu thuê xe
          </li>
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
              <p>{stats.revenueOwner} VND</p>
            </div>
            <div className="stat-card">
              <h3>Số dư trong ví</h3>
              <p>{stats.balanceOwner} VND</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardOwner;
