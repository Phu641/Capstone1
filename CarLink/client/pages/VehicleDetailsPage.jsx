import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/VehicleDetailsPage.css";

const VehicleDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [customerName, setCustomerName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

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

        const vehicleData = await response.json();
        setVehicle(vehicleData);
        setSelectedMedia(vehicleData.carImages?.[0]?.imageUrl || null);

        // Gọi API để lấy thông tin khách hàng
        const customerResponse = await fetch(
          `http://localhost:3000/admin/user/${vehicleData.customerID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!customerResponse.ok) {
          throw new Error(
            `Không thể lấy thông tin khách hàng. Lỗi HTTP: ${customerResponse.status}`
          );
        }

        const customerData = await customerResponse.json();
        const fullName = `${customerData.firstName} ${customerData.lastName}`;
        setCustomerName(fullName);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleDetails();
  }, [id]);

  const handleThumbnailClick = (mediaUrl) => {
    setSelectedMedia(mediaUrl);
  };

  const handleMediaClick = () => {
    setModalContent(selectedMedia);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const handleBackClick = () => {
    window.location.href = "http://localhost:5173/vehicle-approval";
  };

  if (loading) return <p className="loading">Đang tải thông tin xe...</p>;
  if (error) return <p className="error">Có lỗi xảy ra: {error}</p>;
  if (!vehicle) return <p>Không tìm thấy thông tin xe!</p>;

  return (
    <div className="vehicle-details-page">
      <button className="back-button" onClick={handleBackClick}>
        Trở về
      </button>
      <div className="vehicle-details-info">
        <h2>Thông tin chi tiết xe</h2>
        <p>Tên xe: {vehicle.overview?.model || "Không có"}</p>
        <p>Chủ xe: {customerName || "Đang tải..."}</p>
        <p>Loại xe: {vehicle.overview?.type || "Không có"}</p>
        <p>Số chỗ ngồi: {vehicle.overview?.seats || "Không có"}</p>
        <p>Giá thuê: {vehicle.overview?.pricePerDay || "Không có"} VND / ngày</p>
        <p>Địa chỉ: {vehicle.overview?.address || "Không có"}</p>
        <p>Trạng thái phê duyệt: {vehicle.isAvailable ? "Đã duyệt" : "Chưa duyệt"}</p>
      </div>

      <div className="main-media" onClick={handleMediaClick}>
        {selectedMedia ? (
          selectedMedia.endsWith(".mp4") ? (
            <video controls src={`http://localhost:3000/images/${selectedMedia}`} />
          ) : (
            <img src={`http://localhost:3000/images/${selectedMedia}`} alt="Phương tiện chính" />
          )
        ) : (
          <p>Không có phương tiện để hiển thị</p>
        )}
      </div>

      <div className="vehicle-media">
        {vehicle.carImages && vehicle.carImages.length > 0 ? (
          <div className="media-gallery-thumbnail">
            {vehicle.carImages.map((media, index) => (
              <div
                key={index}
                className="thumbnail-item"
                onClick={() => handleThumbnailClick(media.imageUrl)}
              >
                {media.imageUrl.endsWith(".mp4") ? (
                  <video
                    src={`http://localhost:3000/images/${media.imageUrl}`}
                    className="vehicle-thumbnail"
                    onClick={() => handleThumbnailClick(media.imageUrl)}
                    muted
                  />
                ) : (
                  <img
                    src={`http://localhost:3000/images/${media.imageUrl}`}
                    alt={`Vehicle Media ${index + 1}`}
                    className="vehicle-thumbnail"
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>Không có hình ảnh hoặc video</p>
        )}
      </div>

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {modalContent.endsWith(".mp4") ? (
              <video controls src={modalContent} className="modal-video">
                Your browser does not support the video tag.
              </video>
            ) : (
              <img src={modalContent} alt="Phóng to phương tiện" className="modal-image" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleDetailsPage;