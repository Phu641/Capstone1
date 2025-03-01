import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../styles/OwnerReportsPage.css";

const OwnerReportsPage = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePage, setActivePage] = useState("ownerReports");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Không tìm thấy token admin. Vui lòng đăng nhập lại.");
          setError("Không tìm thấy token admin. Vui lòng đăng nhập lại.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          "http://localhost:3000/admin/all-reports",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          setError(".");
          setLoading(false);
          return;
        }

        const data = await response.json();
        setReports(data);
      } catch (error) {
        setError("Lỗi khi gọi API. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleApproveReport = async (reportID) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Không tìm thấy token admin. Vui lòng đăng nhập lại.");
        setError("Không tìm thấy token admin. Vui lòng đăng nhập lại.");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/admin/confirm-report/${reportID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        toast.error("Không thể duyệt báo cáo.");
        return;
      }

      setReports((prevReports) =>
        prevReports.filter((report) => report.reportID !== reportID)
      );
      toast.success(`Báo cáo với ID ${reportID} đã được duyệt thành công.`);
    } catch (error) {
      toast.error("Lỗi khi gọi API duyệt báo cáo. Vui lòng thử lại sau.");
    }
  };

  const handlePageClick = (page) => {
    setActivePage(page);
    switch (page) {
      case "DashboardAdmin":
        navigate("/DashboardAdmin");
        break;
      case "manageUsers":
        navigate("/user-list");
        break;
      case "vehicleApproval":
        navigate("/vehicle-approval");
        break;
      case "WithdrawOwner":
        navigate("/withdraw-approval");
        break;
      case "ownerReports":
        navigate("/owner-reports");
        break;
      case "reportHistory":
        navigate("/report-history");
        break;
      default:
        break;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <ul>
          <li
            className={activePage === "DashboardAdmin" ? "active" : ""}
            onClick={() => handlePageClick("DashboardAdmin")}
          >
            Dashboard
          </li>
          <li
            className={activePage === "manageUsers" ? "active" : ""}
            onClick={() => handlePageClick("manageUsers")}
          >
            Quản lý người dùng
          </li>
          <li
            className={activePage === "vehicleApproval" ? "active" : ""}
            onClick={() => handlePageClick("vehicleApproval")}
          >
            Duyệt xe
          </li>
          <li
            className={activePage === "WithdrawOwner" ? "active" : ""}
            onClick={() => handlePageClick("WithdrawOwner")}
          >
            Yêu cầu rút tiền
          </li>
          <li
            className={activePage === "ownerReports" ? "active" : ""}
            onClick={() => handlePageClick("ownerReports")}
          >
            Báo cáo của chủ xe
          </li>
          <li
            className={activePage === "reportHistory" ? "active" : ""}
            onClick={() => handlePageClick("reportHistory")}
          >
            Lịch sử báo cáo
          </li>
        </ul>
      </div>

      <div className="main-content">
        <h2>Báo cáo của chủ xe</h2>
        {loading ? (
          <div>Đang tải dữ liệu...</div>
        ) : error ? (
          <div>Hiện tại không có báo cáo nào từ chủ xe {error}</div>
        ) : reports.length === 0 ? (
          <p>Không có báo cáo nào.</p>
        ) : (
          <table className="reports-table">
            <thead>
              <tr>
                <th>Mã báo cáo</th>
                <th>Mã đặt xe</th>
                <th>CMND/CCCD</th>
                <th>Ngày trả xe</th>
                <th>Mô tả</th>
                <th>Video hư hại</th>
                <th>Ngày tạo</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
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
                  <td>
                    <button
                      onClick={() => handleApproveReport(report.reportID)}
                      className="approve-button"
                    >
                      Duyệt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default OwnerReportsPage;
