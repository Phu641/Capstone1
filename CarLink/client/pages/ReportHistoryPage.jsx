// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/ReportHistoryPage.css"; // Đảm bảo bạn có file CSS

// const ReportHistoryPage = () => {
//   const navigate = useNavigate();

//   const [reports, setReports] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   // Gọi API để lấy dữ liệu báo cáo
//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         if (!token) {
//           console.error("Không tìm thấy token admin.");
//           return;
//         }

//         const response = await fetch(
//           "http://localhost:3000/admin/all-reports-complete",
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           console.error("Không thể truy cập dữ liệu báo cáo.");
//           return;
//         }

//         const data = await response.json();
//         setReports(data);
//       } catch (error) {
//         console.error("Lỗi khi gọi API:", error);
//       }
//     };

//     fetchReports();
//   }, []);

//   // Hàm để xử lý thay đổi trong ô tìm kiếm
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   // Lọc báo cáo theo reportID
//   const filteredReports = reports.filter((report) =>
//     report.reportID.toString().includes(searchQuery)
//   );

//   return (
//     <div className="main-content">
//       <header className="report-header">
//         <h1>Lịch sử báo cáo</h1>
//         <input
//           type="text"
//           placeholder="Tìm kiếm theo Report ID..."
//           value={searchQuery}
//           onChange={handleSearchChange}
//           className="search-input"
//         />
//       </header>

//       <div className="report-table">
//         <table>
//           <thead>
//             <tr>
//               <th>Report ID</th>
//               <th>Booking ID</th>
//               <th>ID Card</th>
//               <th>Return Date</th>
//               <th>Description</th>
//               <th>Damage Video</th>
//               <th>Created At</th>
//               <th>Updated At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredReports.length > 0 ? (
//               filteredReports.map((report) => (
//                 <tr key={report.reportID}>
//                   <td>{report.reportID}</td>
//                   <td>{report.bookingID}</td>
//                   <td>{report.idCard}</td>
//                   <td>{new Date(report.returnDate).toLocaleString()}</td>
//                   <td>{report.description}</td>
//                   <td>
//                     {report.damageVideo ? (
//                       <a
//                         href={`http://localhost:3000/images/${report.damageVideo}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         Xem video
//                       </a>
//                     ) : (
//                       "Không có video"
//                     )}
//                   </td>
//                   <td>{new Date(report.createdAt).toLocaleString()}</td>
//                   <td>{new Date(report.updatedAt).toLocaleString()}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="8">Không có báo cáo nào.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ReportHistoryPage;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ReportHistoryPage.css"; // Đảm bảo bạn có file CSS

const ReportHistoryPage = () => {
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState("reportHistory");

  // Gọi API để lấy dữ liệu báo cáo
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Không tìm thấy token admin.");
          return;
        }

        const response = await fetch(
          "http://localhost:3000/admin/all-reports-complete",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          console.error("Không thể truy cập dữ liệu báo cáo.");
          return;
        }

        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchReports();
  }, []);

  // Hàm để xử lý thay đổi trong ô tìm kiếm
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Lọc báo cáo theo reportID
  const filteredReports = reports.filter((report) =>
    report.reportID.toString().includes(searchQuery)
  );

  // Các hàm xử lý chuyển trang khi chọn menu sidebar
  const handleDashboardClick = () => {
    navigate("/DashboardAdmin");
    setActivePage("DashboardAdmin");
  };

  const handleManageUsersClick = () => {
    navigate("/user-list");
    setActivePage("manageUsers");
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
        <header className="report-header">
          <h1>Lịch sử báo cáo</h1>
          <input
            type="text"
            placeholder="Tìm kiếm theo Report ID..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </header>

        <div className="report-table">
          <table>
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Booking ID</th>
                <th>ID Card</th>
                <th>Return Date</th>
                <th>Description</th>
                <th>Damage Video</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <tr key={report.reportID}>
                    <td>{report.reportID}</td>
                    <td>{report.bookingID}</td>
                    <td>{report.idCard}</td>
                    <td>{new Date(report.returnDate).toLocaleString()}</td>
                    <td>{report.description}</td>
                    <td>
                      {report.damageVideo ? (
                        <a
                          href={`http://localhost:3000/images/${report.damageVideo}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Xem video
                        </a>
                      ) : (
                        "Không có video"
                      )}
                    </td>
                    <td>{new Date(report.createdAt).toLocaleString()}</td>
                    <td>{new Date(report.updatedAt).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">Không có báo cáo nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportHistoryPage;
