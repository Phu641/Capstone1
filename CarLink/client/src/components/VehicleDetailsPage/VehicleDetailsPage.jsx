// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// const VehicleDetailsPage = () => {
//   const { id } = useParams();
//   const [vehicle, setVehicle] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchVehicleDetails = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch(`http://localhost:3000/admin/car/${id}`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error(
//             response.status === 404
//               ? "Xe không tồn tại!"
//               : `Lỗi HTTP! Trạng thái: ${response.status}`
//           );
//         }

//         const data = await response.json();
//         setVehicle(data);
//       } catch (error) {
//         console.error("Lỗi khi gọi API chi tiết xe:", error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVehicleDetails();
//   }, [id]);

//   if (loading) return <p>Đang tải thông tin xe...</p>;
//   if (error) return <p>Có lỗi xảy ra: {error}</p>;
//   if (!vehicle) return <p>Không tìm thấy thông tin xe!</p>;

//   return (
//     <div className="vehicle-details-page">
//       <h2>Thông tin chi tiết xe</h2>
//       <h3>Xe ID: {vehicle.carID}</h3>
//       <p>Khách hàng ID: {vehicle.customerID}</p>
//       <p>Model: {vehicle.overview?.model || "Không có"}</p>
//       <p>Loại xe: {vehicle.overview?.type || "Không có"}</p>
//       <p>Số ghế: {vehicle.overview?.seats || "Không có"}</p>
//       <p>Địa chỉ: {vehicle.overview?.address || "Không có"}</p>
//       <p>Trạng thái: {vehicle.isAvailable ? "Đã duyệt" : "Chưa duyệt"}</p>
//       <p>Màu xe: {vehicle.overview?.color || "Không có"}</p>
//       <p>Biển số: {vehicle.overview?.plateNumber || "Không có"}</p>
//       <p>Ghi chú: {vehicle.notes || "Không có"}</p>
//     </div>
//   );
// };

// export default VehicleDetailsPage;

//2
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";


// const VehicleDetailsPage = () => {
//   const { id } = useParams();
//   const [vehicle, setVehicle] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchVehicleDetails = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch(`http://localhost:3000/admin/car/${id}`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error(
//             response.status === 404
//               ? "Xe không tồn tại!"
//               : `Lỗi HTTP! Trạng thái: ${response.status}`
//           );
//         }

//         const data = await response.json();
//         if (data.isAvailable === false) {
//           setVehicle(data);
//         } else {
//           setVehicle(null);
//         }
//       } catch (error) {
//         console.error("Lỗi khi gọi API chi tiết xe:", error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVehicleDetails();
//   }, [id]);

//   if (loading) return <p>Đang tải thông tin xe...</p>;
//   if (error) return <p>Có lỗi xảy ra: {error}</p>;
//   if (!vehicle) return <p>Chỉ hiển thị xe chưa duyệt. Không tìm thấy thông tin xe phù hợp!</p>;

//   return (
//     <div className="vehicle-details-page">
//       <h2>Thông tin chi tiết xe</h2>
//       <h3>Xe ID: {vehicle.carID}</h3>
//       <p>Khách hàng ID: {vehicle.customerID}</p>
//       <p>Model: {vehicle.overview?.model || "Không có"}</p>
//       <p>Loại xe: {vehicle.overview?.type || "Không có"}</p>
//       <p>Số ghế: {vehicle.overview?.seats || "Không có"}</p>
//       <p>Địa chỉ: {vehicle.overview?.address || "Không có"}</p>
//       <p>Trạng thái: Chưa duyệt</p>
//       <p>Màu xe: {vehicle.overview?.color || "Không có"}</p>
//       <p>Biển số: {vehicle.overview?.plateNumber || "Không có"}</p>
//       <p>Ghi chú: {vehicle.notes || "Không có"}</p>
//     </div>
//   );
// };

// export default VehicleDetailsPage;


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const VehicleDetailsPage = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3000/admin/car/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "Xe không tồn tại!"
              : `Lỗi HTTP! Trạng thái: ${response.status}`
          );
        }

        const data = await response.json();
        setVehicle(data);
      } catch (error) {
        console.error("Lỗi khi gọi API chi tiết xe:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleDetails();
  }, [id]);

  if (loading) return <p>Đang tải thông tin xe...</p>;
  if (error) return <p>Có lỗi xảy ra: {error}</p>;
  if (!vehicle || vehicle.isAvailable !== false)
    return <p>Chỉ hiển thị xe chưa duyệt. Không tìm thấy thông tin xe phù hợp!</p>;

  return (
    <div className="vehicle-details-page">
      <h2>Thông tin chi tiết xe</h2>
      <h3>Xe ID: {vehicle.carID}</h3>
      <p>Khách hàng ID: {vehicle.customerID}</p>
      <p>Model: {vehicle.overview?.model || "Không có"}</p>
      <p>Loại xe: {vehicle.overview?.type || "Không có"}</p>
      <p>Số ghế: {vehicle.overview?.seats || "Không có"}</p>
      <p>Địa chỉ: {vehicle.overview?.address || "Không có"}</p>
      <p>Trạng thái: Chưa duyệt</p>
      <p>Màu xe: {vehicle.overview?.color || "Không có"}</p>
      <p>Biển số: {vehicle.overview?.plateNumber || "Không có"}</p>
      <p>Ghi chú: {vehicle.notes || "Không có"}</p>
    </div>
  );
};

export default VehicleDetailsPage;
