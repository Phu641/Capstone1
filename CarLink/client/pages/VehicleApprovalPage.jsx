import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/VehicleApprovalPage.css";

const VehicleApprovalPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("vehicleApproval");
  const [rejectionReason, setRejectionReason] = useState({});

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

        if (!response.ok && response.status !== 400) {
          throw new Error(
            response.status === 403
              ? "Bạn không có quyền truy cập vào tài nguyên này."
              : `Lỗi HTTP! Trạng thái: ${response.status}`
          );
        }

        if (response.status === 400) {
          setVehicles([]);
        } else {
          const data = await response.json();
          setVehicles(data);
        }
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
        body: JSON.stringify({
          reason: rejectionReason[id] || "Không có lý do cụ thể",
        }),
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
      alert("Lỗi khi từ chối xe: " + error.message);
    }
  };

  const handleShowDetails = (id) => {
    navigate(`/vehicle/${id}`);
  };

  const handleDashboardClick = () => {
    navigate("/dashboardAdmin");
    setActivePage("dashboardAdmin");
  };

  const handleManageUsersClick = () => {
    navigate("/user-list");
    setActivePage("manageUsers");
  };

  const handleVehicleApprovalClick = () => {
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

  const handleRejectionReasonChange = (id, value) => {
    setRejectionReason((prevReasons) => ({ ...prevReasons, [id]: value }));
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Có lỗi xảy ra: {error}</p>;

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <ul>
          <li
            className={activePage === "dashboardAdmin" ? "active" : ""}
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
                <p>
                  Trạng thái: {vehicle.isAvailable ? "Đã duyệt" : "Chưa duyệt"}
                </p>
                <textarea
                  placeholder="Nhập lý do từ chối"
                  value={rejectionReason[vehicle.carID] || ""}
                  onChange={(e) =>
                    handleRejectionReasonChange(vehicle.carID, e.target.value)
                  }
                />
                <div className="vehicle-actions">
                  <button
                    onClick={() => handleApprove(vehicle.carID)}
                    disabled={vehicle.isAvailable}
                  >
                    Đồng ý
                  </button>
                  <button onClick={() => handleShowDetails(vehicle.carID)}>
                    Chi tiết
                  </button>
                  <button onClick={() => handleDelete(vehicle.carID)}>
                    Từ chối
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleApprovalPage;
