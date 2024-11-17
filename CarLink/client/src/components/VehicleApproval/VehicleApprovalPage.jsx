// import React, { useState, useEffect } from "react";
// import "./VehicleApprovalPage.css";

// const VehicleApprovalPage = () => {
//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedVehicle, setSelectedVehicle] = useState(null);

//   useEffect(() => {
//     const fetchVehicles = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch("http://localhost:3000/admin/all-cars", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error(
//             response.status === 403
//               ? "Bạn không có quyền truy cập vào tài nguyên này."
//               : `Lỗi HTTP! Trạng thái: ${response.status}`
//           );
//         }

//         const data = await response.json();
//         setVehicles(data);
//       } catch (error) {
//         console.error("Lỗi khi gọi API:", error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVehicles();
//   }, []);

//   const handleApprove = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("Không có token xác thực!");

//       const response = await fetch(`http://localhost:3000/admin/car/${id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ isAvailable: true }),
//       });

//       if (!response.ok) {
//         throw new Error(
//           response.status === 404
//             ? "Xe không tồn tại!"
//             : response.status === 403
//             ? "Bạn không có quyền thực hiện thao tác này!"
//             : `Lỗi khi cập nhật trạng thái xe! Trạng thái: ${response.status}`
//         );
//       }

//       setVehicles((prevVehicles) =>
//         prevVehicles.filter((vehicle) => vehicle.carID !== id)
//       );

//       alert("Duyệt xe thành công!");
//     } catch (error) {
//       console.error("Lỗi khi duyệt xe:", error);
//       setError(error.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       if (!window.confirm("Bạn có chắc chắn muốn từ chối xe này không?")) {
//         return;
//       }

//       const token = localStorage.getItem("token");
//       const response = await fetch(`http://localhost:3000/admin/car/${id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`Lỗi khi từ chối xe! Trạng thái: ${response.status}`);
//       }

//       setVehicles((prevVehicles) =>
//         prevVehicles.filter((vehicle) => vehicle.carID !== id)
//       );

//       alert("Từ chối xe thành công!");
//     } catch (error) {
//       console.error("Lỗi khi từ chối xe:", error);
//     }
//   };

//   const handleShowDetails = (vehicle) => {
//     setSelectedVehicle(vehicle);
//   };

//   const handleCloseModal = () => {
//     setSelectedVehicle(null);
//   };

//   if (loading) return <p>Đang tải dữ liệu...</p>;
//   if (error) return <p>Có lỗi xảy ra: {error}</p>;

//   return (
//     <div className="vehicle-approval-page">
//       <h2>Kiểm duyệt xe</h2>
//       {vehicles.length === 0 ? (
//         <p>Hiện tại không có xe nào cần duyệt</p>
//       ) : (
//         <div className="vehicle-list">
//           {vehicles.map((vehicle) => (
//             <div key={vehicle.carID} className="vehicle-card">
//               <h3>Xe ID: {vehicle.carID}</h3>
//               <p>Khách hàng ID: {vehicle.customerID}</p>
//               <p>Model: {vehicle.overview?.model || "Không có"}</p>
//               <p>Loại xe: {vehicle.overview?.type || "Không có"}</p>
//               <p>Số ghế: {vehicle.overview?.seats || "Không có"}</p>
//               <p>Địa chỉ: {vehicle.overview?.address || "Không có"}</p>
//               <p>Trạng thái: {vehicle.isAvailable ? "Đã duyệt" : "Chưa duyệt"}</p>
//               <div className="vehicle-actions">
//                 <button
//                   onClick={() => handleApprove(vehicle.carID)}
//                   disabled={vehicle.isAvailable}
//                 >
//                   Đồng ý
//                 </button>
//                 <button onClick={() => handleShowDetails(vehicle)}>Chi tiết</button>
//                 <button onClick={() => handleDelete(vehicle.carID)}>Từ chối</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default VehicleApprovalPage;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./VehicleApprovalPage.css";

const VehicleApprovalPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/admin/all-cars", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            response.status === 403
              ? "Bạn không có quyền truy cập vào tài nguyên này."
              : `Lỗi HTTP! Trạng thái: ${response.status}`
          );
        }

        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Không có token xác thực!");

      const response = await fetch(`http://localhost:3000/admin/car/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isAvailable: true }),
      });

      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? "Xe không tồn tại!"
            : response.status === 403
            ? "Bạn không có quyền thực hiện thao tác này!"
            : `Lỗi khi cập nhật trạng thái xe! Trạng thái: ${response.status}`
        );
      }

      setVehicles((prevVehicles) =>
        prevVehicles.filter((vehicle) => vehicle.carID !== id)
      );

      alert("Duyệt xe thành công!");
    } catch (error) {
      console.error("Lỗi khi duyệt xe:", error);
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Bạn có chắc chắn muốn từ chối xe này không?")) {
        return;
      }

      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/admin/car/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Lỗi khi từ chối xe! Trạng thái: ${response.status}`);
      }

      setVehicles((prevVehicles) =>
        prevVehicles.filter((vehicle) => vehicle.carID !== id)
      );

      alert("Từ chối xe thành công!");
    } catch (error) {
      console.error("Lỗi khi từ chối xe:", error);
    }
  };

  const handleShowDetails = (id) => {
    navigate(`/vehicle/${id}`);
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Có lỗi xảy ra: {error}</p>;

  return (
    <div className="vehicle-approval-page">
      <h2>Kiểm duyệt xe</h2>
      {vehicles.length === 0 ? (
        <p>Hiện tại không có xe nào cần duyệt</p>
      ) : (
        <div className="vehicle-list">
          {vehicles.map((vehicle) => (
            <div key={vehicle.carID} className="vehicle-card">
              <h3>Xe ID: {vehicle.carID}</h3>
              <p>Khách hàng ID: {vehicle.customerID}</p>
              <p>Model: {vehicle.overview?.model || "Không có"}</p>
              <p>Loại xe: {vehicle.overview?.type || "Không có"}</p>
              <p>Số ghế: {vehicle.overview?.seats || "Không có"}</p>
              <p>Địa chỉ: {vehicle.overview?.address || "Không có"}</p>
              <p>Trạng thái: {vehicle.isAvailable ? "Đã duyệt" : "Chưa duyệt"}</p>
              <div className="vehicle-actions">
                <button
                  onClick={() => handleApprove(vehicle.carID)}
                  disabled={vehicle.isAvailable}
                >
                  Đồng ý
                </button>
                <button onClick={() => handleShowDetails(vehicle.carID)}>Chi tiết</button>
                <button onClick={() => handleDelete(vehicle.carID)}>Từ chối</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleApprovalPage;
