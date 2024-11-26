// import React, { useState, useEffect } from "react";
// import "../styles/BookingApprovalPage.css";

// const BookingApprovalPage = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         if (!token) {
//           console.error("Không tìm thấy token admin. Vui lòng đăng nhập lại.");
//           return;
//         }

//         const response = await fetch("http://localhost:3000/admin/all-pending-bookings", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           console.error("Không thể truy cập dữ liệu bookings. Vui lòng kiểm tra quyền admin.");
//           return;
//         }

//         const data = await response.json();
//         setBookings(data);

//         // Tự động loại bỏ booking nếu quá 15 phút chưa thanh toán
//         const currentTime = new Date();
//         setBookings((prevBookings) =>
//           prevBookings.filter((booking) => {
//             const bookingTime = new Date(booking.createdAt);
//             const diffMinutes = (currentTime - bookingTime) / (1000 * 60);
//             if (booking.bookingStatus === "pending" && diffMinutes > 12) {
//               handleRejectAndDelete(booking.bookingID);
//               return false;
//             }
//             return true;
//           })
//         );
//       } catch (error) {
//         console.error("Lỗi khi gọi API:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, []);

//   const handleApprove = async (bookingID) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.error("Không tìm thấy token admin. Vui lòng đăng nhập lại.");
//         return;
//       }

//       const response = await fetch(`http://localhost:3000/admin/approve-booking/${bookingID}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         console.error("Không thể duyệt booking. Vui lòng thử lại.");
//         return;
//       }

//       // Cập nhật danh sách bookings sau khi duyệt thành công
//       setBookings((prevBookings) => prevBookings.filter((booking) => booking.bookingID !== bookingID));
//     } catch (error) {
//       console.error("Lỗi khi duyệt booking:", error);
//     }
//   };

//   const handleRejectAndDelete = async (bookingID) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.error("Không tìm thấy token admin. Vui lòng đăng nhập lại.");
//         return;
//       }

//       const response = await fetch(`http://localhost:3000/admin/delete-booking/${bookingID}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         console.error("Không thể xóa booking. Vui lòng thử lại.");
//         return;
//       }

//       // Cập nhật danh sách bookings sau khi loại bỏ thành công
//       setBookings((prevBookings) => prevBookings.filter((booking) => booking.bookingID !== bookingID));
//     } catch (error) {
//       console.error("Lỗi khi xóa booking:", error);
//     }
//   };

//   if (loading) {
//     return <div>Đang tải dữ liệu...</div>;
//   }

//   return (
//     <div className="booking-approval-container">
//       <h2>Kiểm duyệt Booking</h2>
//       {bookings.length === 0 ? (
//         <p>Không có booking nào cần kiểm duyệt.</p>
//       ) : (
//         <table className="booking-table">
//           <thead>
//             <tr>
//               <th>ID Booking</th>
//               <th>ID Xe</th>
//               <th>ID Khách hàng</th>
//               <th>Ngày bắt đầu</th>
//               <th>Ngày kết thúc</th>
//               <th>Tổng số tiền</th>
//               <th>Trạng thái</th>
//               <th>Hành động</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((booking) => (
//               <tr key={booking.bookingID}>
//                 <td>{booking.bookingID}</td>
//                 <td>{booking.carID}</td>
//                 <td>{booking.customerID}</td>
//                 <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
//                 <td>{new Date(booking.untilDate).toLocaleDateString()}</td>
//                 <td>{Number(booking.totalAmount).toLocaleString('vi-VN')} VND</td>
//                 <td>{booking.bookingStatus === "pending" ? "Chưa thanh toán" : "Đã thanh toán"}</td>
//                 <td>
//                   {booking.bookingStatus !== 'pending' && <button onClick={() => handleApprove(booking.bookingID)}>Duyệt</button>}
//                   <button onClick={() => handleReject(booking.bookingID)} disabled={booking.bookingStatus === 'pending'}>Loại bỏ</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default BookingApprovalPage;
import React, { useState, useEffect } from "react";
import "../styles/BookingApprovalPage.css";

const BookingApprovalPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Không tìm thấy token admin. Vui lòng đăng nhập lại.");
          return;
        }

        const response = await fetch("http://localhost:3000/admin/all-pending-bookings", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error("Không thể truy cập dữ liệu bookings. Vui lòng kiểm tra quyền admin.");
          return;
        }

        const data = await response.json();
        setBookings(data);

        // Tự động loại bỏ booking nếu quá 15 phút chưa thanh toán
        const currentTime = new Date();
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => {
            const bookingTime = new Date(booking.createdAt);
            const diffMinutes = (currentTime - bookingTime) / (1000 * 60);
            if (booking.bookingStatus === "pending" && diffMinutes > 15) {
              handleRejectAndDelete(booking.bookingID);
              return false;
            }
            return true;
          })
        );
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleApprove = async (bookingID) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Không tìm thấy token admin. Vui lòng đăng nhập lại.");
        return;
      }

      const response = await fetch(`http://localhost:3000/admin/approve-booking/${bookingID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Không thể duyệt booking. Vui lòng thử lại.");
        return;
      }

      // Cập nhật danh sách bookings sau khi duyệt thành công
      setBookings((prevBookings) => prevBookings.filter((booking) => booking.bookingID !== bookingID));
    } catch (error) {
      console.error("Lỗi khi duyệt booking:", error);
    }
  };

  const handleRejectAndDelete = async (bookingID) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Không tìm thấy token admin. Vui lòng đăng nhập lại.");
        return;
      }

      const response = await fetch(`http://localhost:3000/admin/delete-booking/${bookingID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Không thể xóa booking. Vui lòng thử lại.");
        return;
      }

      // Cập nhật danh sách bookings sau khi loại bỏ thành công
      setBookings((prevBookings) => prevBookings.filter((booking) => booking.bookingID !== bookingID));
    } catch (error) {
      console.error("Lỗi khi xóa booking:", error);
    }
  };

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="booking-approval-container">
      <h2>Kiểm duyệt Booking</h2>
      {bookings.length === 0 ? (
        <p>Không có booking nào cần kiểm duyệt.</p>
      ) : (
        <table className="booking-table">
          <thead>
            <tr>
              <th>ID Booking</th>
              <th>ID Xe</th>
              <th>ID Khách hàng</th>
              <th>Ngày bắt đầu</th>
              <th>Ngày kết thúc</th>
              <th>Tổng số tiền</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.bookingID}>
                <td>{booking.bookingID}</td>
                <td>{booking.carID}</td>
                <td>{booking.customerID}</td>
                <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                <td>{new Date(booking.untilDate).toLocaleDateString()}</td>
                <td>{Number(booking.totalAmount).toLocaleString('vi-VN')} VND</td>
                <td>{booking.bookingStatus === "pending" ? "Chưa thanh toán" : "Đã thanh toán"}</td>
                <td>
                  {booking.bookingStatus !== 'pending' && <button onClick={() => handleApprove(booking.bookingID)}>Duyệt</button>}
                  <button onClick={() => handleReject(booking.bookingID)} disabled={booking.bookingStatus === 'pending'}>Loại bỏ</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookingApprovalPage;
