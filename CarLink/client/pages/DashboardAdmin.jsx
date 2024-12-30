// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/DashboardAdmin.css";
// import RevenueChart from "../src/components/Chart/RevenueChart";
// import VehicleApprovalPage from "./VehicleApprovalPage";

// const DashboardAdmin = () => {
//   const navigate = useNavigate();
//   const [showDashboard, setShowDashboard] = useState(true);
//   const [showVehicleApproval, setShowVehicleApproval] = useState(false);
//   const [activePage, setActivePage] = useState("DashboardAdmin");

//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalCars: 0,
//     totalRentals: 0,
//     revenue: 0,
//   });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         if (!token) {
//           console.error("Không tìm thấy token admin. Vui lòng đăng nhập lại.");
//           return;
//         }

//         const carsResponse = await fetch(
//           "http://localhost:3000/admin/all-cars-availability",
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!carsResponse.ok) {
//           console.error(
//             "Không thể truy cập dữ liệu xe. Vui lòng kiểm tra quyền admin."
//           );
//           return;
//         }

//         const carsData = await carsResponse.json();
//         const totalCars = carsData.length;

//         const usersResponse = await fetch(
//           "http://localhost:3000/admin/all-users",
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!usersResponse.ok) {
//           console.error(
//             "Không thể truy cập dữ liệu người dùng. Vui lòng kiểm tra quyền admin."
//           );
//           return;
//         }

//         const usersData = await usersResponse.json();
//         const totalUsers = usersData.length;

//         setStats((prevStats) => ({
//           ...prevStats,
//           totalCars: totalCars,
//           totalUsers: totalUsers,
//         }));
//       } catch (error) {
//         console.error("Lỗi khi gọi API:", error);
//       }
//     };

//     fetchStats();
//   }, []);

//   const handleManageUsersClick = () => {
//     navigate("/user-list");
//     setActivePage("manageUsers");
//   };

//   const handleDashboardClick = () => {
//     navigate("/DashboardAdmin");
//     setActivePage("DashboardAdmin");
//   };

//   const handleVehicleApprovalClick = () => {
//     navigate("/vehicle-approval");
//     setActivePage("vehicleApproval");
//   };

//   const handleOwnerReportsClick = () => {
//     navigate("/owner-reports");
//     setActivePage("ownerReports");
//   };

//   const handleReportHistoryClick = () => {
//     navigate("/report-history");
//     setActivePage("reportHistory");
//   };

//   const handleWithdrawOwnerClick = () => {
//     navigate("/withdraw-approval");
//     setActivePage("WithdrawOwner");
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="sidebar">
//         <ul>
//           <li
//             className={activePage === "DashboardAdmin" ? "active" : ""}
//             onClick={handleDashboardClick}
//           >
//             Dashboard
//           </li>
//           <li
//             className={activePage === "manageUsers" ? "active" : ""}
//             onClick={handleManageUsersClick}
//           >
//             Quản lý người dùng
//           </li>
//           <li
//             className={activePage === "vehicleApproval" ? "active" : ""}
//             onClick={handleVehicleApprovalClick}
//           >
//             Duyệt xe
//           </li>
//           <li
//             className={activePage === "WithdrawOwner" ? "active" : ""}
//             onClick={handleWithdrawOwnerClick}
//           >
//             Yêu cầu rút tiền
//           </li>
//           <li
//             className={activePage === "ownerReports" ? "active" : ""}
//             onClick={handleOwnerReportsClick}
//           >
//             Báo cáo của chủ xe
//           </li>
//           <li
//             className={activePage === "reportHistory" ? "active" : ""}
//             onClick={handleReportHistoryClick}
//           >
//             Lịch sử báo cáo
//           </li>
//           {/* <li className={activePage === "settings" ? "active" : ""}>Cài đặt</li> */}
//         </ul>
//       </div>

//       <div className="main-content">
//         {showDashboard && (
//           <>
//             <header className="dashboard-header"></header>

//             <div className="dashboard-stats">
//               <div className="stat-card">
//                 <h3>Tổng người dùng trên hệ thống</h3>
//                 <p>{stats.totalUsers}</p>
//               </div>
//               <div className="stat-card">
//                 <h3>Tổng xe đang hoạt động cho thuê</h3>
//                 <p>{stats.totalCars}</p>
//               </div>
//               <div className="stat-card">
//                 <h3>Tổng lượt thuê</h3>
//                 <p>{stats.totalRentals}</p>
//               </div>
//               <div className="stat-card">
//                 <h3>Doanh thu</h3>
//                 <p>{stats.revenue} VND</p>
//               </div>
//             </div>

//             <div className="chart-container">
//               <RevenueChart />
//             </div>
//           </>
//         )}

//         {showVehicleApproval && <VehicleApprovalPage />}
//       </div>
//     </div>
//   );
// };

// export default DashboardAdmin;
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

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCars: 0,
    totalRentals: 0,
    revenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Không tìm thấy token admin. Vui lòng đăng nhập lại.");
          return;
        }

        // Fetch số xe
        const carsResponse = await fetch(
          "http://localhost:3000/admin/all-cars-availability",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
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

        // Fetch số người dùng
        const usersResponse = await fetch(
          "http://localhost:3000/admin/all-users",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
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

        // Fetch doanh thu và tổng lượt thuê
        const bookingsResponse = await fetch(
          "http://localhost:3000/admin/booking-completed",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!bookingsResponse.ok) {
          console.error(
            "Không thể truy cập dữ liệu doanh thu. Vui lòng kiểm tra quyền admin."
          );
          return;
        }

        const bookingsData = await bookingsResponse.json();
        const totalRentals = bookingsData.data.length;
        const revenue = bookingsData.data.reduce(
          (acc, booking) => acc + parseFloat(booking.totalAmount) * 0.1,
          0
        );

        setStats((prevStats) => ({
          ...prevStats,
          totalCars,
          totalUsers,
          totalRentals,
          revenue,
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

  const handleWithdrawOwnerClick = () => {
    navigate("/withdraw-approval");
    setActivePage("WithdrawOwner");
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
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
            Duyệt xe
          </li>
          <li
            className={activePage === "WithdrawOwner" ? "active" : ""}
            onClick={handleWithdrawOwnerClick}
          >
            Yêu cầu rút tiền
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
                <p>{stats.revenue.toLocaleString("vi-VN")} VND</p>
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
