// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify"; // Import React-Toastify
// import "../styles/ManageVehiclesPage.css";

// const ManageVehiclesPage = () => {
//   const [activePage, setActivePage] = useState("manageVehicles"); // Đặt trang hiện tại là "manageVehicles"

//   const [cars, setCars] = useState([]); // Thêm state cars để lưu dữ liệu xe
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   // Hàm lấy danh sách xe
//   const fetchCarData = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/owner/all-cars", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Không thể lấy dữ liệu từ server");
//       }

//       const carData = await response.json();
//       if (Array.isArray(carData)) {
//         const availableCars = carData.filter((car) => car.isAvailable);
//         setCars(availableCars);
//       } else {
//         console.error("Dữ liệu trả về không phải là mảng:", carData);
//       }
//     } catch (error) {
//       console.error("Lỗi khi lấy dữ liệu xe:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCarData();
//   }, [token]);

//   // Hàm thay đổi trạng thái của toggle switch và gọi API PUT
//   const handleToggleChange = async (carID, bookedStatus) => {
//     const apiUrl = bookedStatus
//       ? "http://localhost:3000/owner/start-service" // Chuyển xe sang trạng thái sẵn sàng
//       : "http://localhost:3000/owner/stop-service"; // Chuyển xe sang trạng thái không sẵn sàng

//     try {
//       const response = await fetch(apiUrl, {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ carID }), // Gửi carID lên server
//       });

//       if (!response.ok) {
//         throw new Error("Không thể cập nhật trạng thái dịch vụ");
//       }

//       // Thông báo trạng thái bằng Toastify
//       if (bookedStatus) {
//         toast.success("Đã sẵn sàng cho thuê xe");
//       } else {
//         toast.info("Đã tắt trạng thái sẵn sàng cho thuê xe");
//       }

//       // Sau khi gọi API thành công, gọi lại API để lấy dữ liệu xe mới
//       fetchCarData(); // Cập nhật lại danh sách xe
//     } catch (error) {
//       console.error("Lỗi khi gọi API:", error);
//       toast.error("Không thể thay đổi trạng thái");
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="sidebar">
//         <ul>
//           <li
//             className={activePage === "dashboard" ? "active" : ""}
//             onClick={() => navigate("/DashboardOwner")}
//           >
//             Dashboard
//           </li>
//           <li
//             className={activePage === "manageVehicles" ? "active" : ""}
//             onClick={() => navigate("/manage-vehicles")}
//           >
//             Quản lý xe
//           </li>
//         </ul>
//       </div>

//       <div className="main-content">
//         <div className="manage-vehicles-container">
//           <table className="manage-vehicles-table">
//             <thead>
//               <tr>
//                 <th colSpan="7">
//                   <h2>Danh sách xe có sẵn của bạn</h2>
//                 </th>
//               </tr>
//               <tr>
//                 <th>ID xe</th>
//                 <th>Tên xe</th>
//                 <th>Giá thuê xe mỗi ngày</th>
//                 <th>Địa chỉ</th>
//                 <th>Mô tả chi tiết xe</th>
//                 <th>Phương tiện</th>
//                 <th>Câp nhật</th>
//                 <th>Trạng thái</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cars.length > 0 ? (
//                 cars.map((car) => (
//                   <tr key={car.carID}>
//                     <td>{car.carID}</td>
//                     <td>{car.overview.model}</td>
//                     <td>{car.overview.pricePerDay} VND</td>
//                     <td>{car.overview.address}</td>
//                     <td>{car.overview.description}</td>
//                     <td>
//                       {car.carImages && car.carImages.length > 0 ? (
//                         car.carImages[0].imageUrl
//                           .toLowerCase()
//                           .endsWith(".mp4") ? (
//                           <video
//                             controls
//                             src={`http://localhost:3000/videos/${car.carImages[0].imageUrl}`}
//                             style={{
//                               width: "100px",
//                               height: "100px",
//                               marginRight: "10px",
//                             }}
//                           />
//                         ) : (
//                           <img
//                             src={`http://localhost:3000/images/${car.carImages[0].imageUrl}`}
//                             alt="Car Media"
//                             style={{
//                               width: "100px",
//                               height: "100px",
//                               marginRight: "10px",
//                             }}
//                           />
//                         )
//                       ) : (
//                         <span>Chưa có phương tiện</span>
//                       )}
//                     </td>
//                     <td>
//                       <button
//                         className="update-button"
//                         onClick={() => navigate(`/update-vehicle/${car.carID}`)}
//                       >
//                         Cập nhật thông tin
//                       </button>
//                     </td>
//                     <td>
//                       <label className="switch">
//                         <input
//                           type="checkbox"
//                           checked={!car.booked}
//                           onChange={() =>
//                             handleToggleChange(car.carID, car.booked)
//                           }
//                         />
//                         <span className="slider"></span>
//                       </label>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="8">Chưa có xe nào có sẵn.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManageVehiclesPage;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import React-Toastify
import "../styles/ManageVehiclesPage.css";

const ManageVehiclesPage = () => {
  const [activePage, setActivePage] = useState("manageVehicles"); // Đặt trang hiện tại là "manageVehicles"

  const [cars, setCars] = useState([]); // Thêm state cars để lưu dữ liệu xe
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Hàm lấy danh sách xe
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
      if (Array.isArray(carData)) {
        const availableCars = carData.filter((car) => car.isAvailable);
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
  }, [token]);

  // Hàm thay đổi trạng thái của toggle switch và gọi API PUT
  const handleToggleChange = async (carID, bookedStatus) => {
    const apiUrl = bookedStatus
      ? "http://localhost:3000/owner/start-service" // Chuyển xe sang trạng thái sẵn sàng
      : "http://localhost:3000/owner/stop-service"; // Chuyển xe sang trạng thái không sẵn sàng

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ carID }), // Gửi carID lên server
      });

      if (!response.ok) {
        throw new Error("Không thể cập nhật trạng thái dịch vụ");
      }

      // Thông báo trạng thái bằng Toastify
      if (bookedStatus) {
        toast.success("Đã sẵn sàng cho thuê xe");
      } else {
        toast.info("Đã tắt trạng thái sẵn sàng cho thuê xe");
      }

      // Sau khi gọi API thành công, gọi lại API để lấy dữ liệu xe mới
      fetchCarData(); // Cập nhật lại danh sách xe
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      toast.error("Không thể thay đổi trạng thái");
    }
  };

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
          <li onClick={() => navigate("/browse-rentals")}>Duyệt thuê xe</li>
          <li onClick={() => navigate("/rental-history")}>Lịch sử thuê xe</li>
        </ul>
      </div>

      <div className="main-content">
        <div className="manage-vehicles-container">
          <table className="manage-vehicles-table">
            <thead>
              <tr>
                <th colSpan="7">
                  <h2>Danh sách xe có sẵn của bạn</h2>
                </th>
              </tr>
              <tr>
                <th>ID xe</th>
                <th>Tên xe</th>
                <th>Giá thuê xe mỗi ngày</th>
                <th>Địa chỉ</th>
                <th>Mô tả chi tiết xe</th>
                <th>Phương tiện</th>
                <th>Câp nhật</th>
                <th>Trạng thái</th>
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
                        car.carImages[0].imageUrl
                          .toLowerCase()
                          .endsWith(".mp4") ? (
                          <video
                            controls
                            src={`http://localhost:3000/videos/${car.carImages[0].imageUrl}`}
                            style={{
                              width: "100px",
                              height: "100px",
                              marginRight: "10px",
                            }}
                          />
                        ) : (
                          <img
                            src={`http://localhost:3000/images/${car.carImages[0].imageUrl}`}
                            alt="Car Media"
                            style={{
                              width: "100px",
                              height: "100px",
                              marginRight: "10px",
                            }}
                          />
                        )
                      ) : (
                        <span>Chưa có phương tiện</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="update-button"
                        onClick={() => navigate(`/update-vehicle/${car.carID}`)}
                      >
                        Cập nhật thông tin
                      </button>
                    </td>
                    <td>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={!car.booked}
                          onChange={() =>
                            handleToggleChange(car.carID, car.booked)
                          }
                        />
                        <span className="slider"></span>
                      </label>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">Chưa có xe nào có sẵn.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageVehiclesPage;
