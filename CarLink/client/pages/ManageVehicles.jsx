// import React, { useState, useEffect } from "react";

// const ManageVehicles = () => {
//   const [cars, setCars] = useState([]);

//   // Lấy dữ liệu xe từ API
//   const fetchCars = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/searching/cars");
//       const data = await response.json();
//       setCars(data);
//     } catch (error) {
//       console.error("Lỗi khi lấy dữ liệu xe:", error);
//     }
//   };

//   // Lấy dữ liệu khi component được render lần đầu
//   useEffect(() => {
//     fetchCars();
//   }, []);

//   return (
//     <div className="manage-vehicles-container">
//       <h2>Danh sách xe</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Tên xe</th>
//             <th>Giá thuê mỗi ngày</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cars.map(car => (
//             <tr key={car.carID}>
//               <td>{car.overview.model}</td>
//               <td>{car.overview.pricePerDay} VND</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ManageVehicles;
import React, { useState, useEffect } from "react";

const ManageVehicles = () => {
  const [cars, setCars] = useState([]);
  const [ownerId, setOwnerId] = useState(2); // Giả sử ownerID là 2, bạn có thể lấy từ sessionStorage hoặc context nếu cần

  // Lấy dữ liệu xe từ API
  const fetchCars = async () => {
    try {
      const response = await fetch("http://localhost:3000/searching/cars");
      const data = await response.json();
      
      // Lọc các xe thuộc về owner hiện tại (dựa trên ownerId)
      const ownerCars = data.filter(car => car.customerID === ownerId);
      
      setCars(ownerCars);  // Lưu lại danh sách xe của owner
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu xe:", error);
    }
  };

  // Lấy dữ liệu khi component được render lần đầu
  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="manage-vehicles-container">
      <h2>Danh sách xe của bạn</h2>
      <table>
        <thead>
          <tr>
            <th>Tên xe</th>
            <th>Giá thuê mỗi ngày</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car.carID}>
              <td>{car.overview.model}</td>
              <td>{car.overview.pricePerDay} VND</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageVehicles;
