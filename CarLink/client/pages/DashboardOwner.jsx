// import React, { useState, useEffect } from "react";

// const DashboardOwner = () => {
//   const [activePage, setActivePage] = useState("dashboard");

//   // Khai báo state để lưu dữ liệu từ API
//   const [stats, setStats] = useState({
//     totalCarOwner: 0,
//     totalRentalsOwner: 0,
//     revenueOwner: 0,
//     balanceOwner: 0,
//   });

//   const [cars, setCars] = useState([]); // Thêm state cars để lưu dữ liệu xe

//   const handleDashboardClick = () => {
//     setActivePage("dashboard");
//   };

//   const handleManageVehiclesClick = () => {
//     // Giữ lại, nhưng không hiển thị nội dung nào khi nhấn vào "Quản lý xe"
//     setActivePage("manageVehicles");
//   };

//   const handleRentalRequestsClick = () => {
//     setActivePage("rentalRequests");
//   };

//   // Lấy token từ localStorage hoặc nơi bạn lưu trữ token
//   const token = localStorage.getItem("token");

//   // Lấy dữ liệu xe từ API và tính tổng số xe đang cho thuê
//   const fetchCarData = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/owner/all-cars", {
//         method: "GET",
//         headers: {
//           "Authorization": `Bearer ${token}`, // Gửi token trong header
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Không thể lấy dữ liệu từ server');
//       }

//       const carData = await response.json();

//       if (Array.isArray(carData)) {
//         const totalCars = carData.filter(car => car.isAvailable).length;
//         setStats(prevStats => ({
//           ...prevStats,
//           totalCarOwner: totalCars,
//         }));

//         setCars(carData);
//       } else {
//         console.error("Dữ liệu trả về không phải là mảng:", carData);
//       }

//     } catch (error) {
//       console.error("Lỗi khi lấy dữ liệu Car:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCarData();
//   }, []);

//   return (
//     <div className="dashboard-container">
//       <div className="sidebar">
//         <ul>
//           <li
//             className={activePage === "dashboard" ? "active" : ""}
//             onClick={handleDashboardClick}
//           >
//             Dashboard
//           </li>
//           <li
//             className={activePage === "manageVehicles" ? "active" : ""}
//             onClick={handleManageVehiclesClick}
//           >
//             Quản lý xe
//           </li>
//           <li
//             className={activePage === "rentalRequests" ? "active" : ""}
//             onClick={handleRentalRequestsClick}
//           >
//             Yêu cầu thuê xe
//           </li>
//         </ul>
//       </div>

//       <div className="main-content">
//         {activePage === "dashboard" && (
//           <div className="dashboard-stats">
//             <div className="stat-card">
//               <h3>Tổng số xe đang cho thuê trên CarLink</h3>
//               <p>{stats.totalCarOwner}</p>
//             </div>
//             <div className="stat-card">
//               <h3>Tổng số lượt thuê tháng này</h3>
//               <p>{stats.totalRentalsOwner}</p>
//             </div>
//             <div className="stat-card">
//               <h3>Doanh thu tháng</h3>
//               <p>{stats.revenueOwner} VND</p>
//             </div>
//             <div className="stat-card">
//               <h3>Số dư trong ví</h3>
//               <p>{stats.balanceOwner} VND</p>
//             </div>
//           </div>
//         )}

//         {activePage === "manageVehicles" && (
//           <div className="manage-vehicles">
//             {/* Không hiển thị nội dung gì ở đây */}
//             <h3>Quản lý xe (Chức năng này hiện tại không có nội dung)</h3>
//           </div>
//         )}

//         {activePage === "rentalRequests" && (
//           <div className="rental-requests">
//             <h3>Danh sách yêu cầu thuê xe</h3>
//             {/* Hiển thị danh sách yêu cầu thuê xe tại đây */}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DashboardOwner;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

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
          "Authorization": `Bearer ${token}`, // Gửi token trong header
        },
      });

      if (!response.ok) {
        throw new Error('Không thể lấy dữ liệu từ server');
      }

      const carData = await response.json();

      if (Array.isArray(carData)) {
        const totalCars = carData.filter(car => car.isAvailable).length;
        setStats(prevStats => ({
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

        {activePage === "manageVehicles" && (
          <div className="manage-vehicles">
            {/* Không hiển thị nội dung gì ở đây */}
            <h3>Quản lý xe (Chức năng này hiện tại không có nội dung)</h3>
          </div>
        )}

        {activePage === "rentalRequests" && (
          <div className="rental-requests">
            <h3>Danh sách yêu cầu thuê xe</h3>
            {/* Hiển thị danh sách yêu cầu thuê xe tại đây */}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardOwner;
