import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons"; // Import biểu tượng
import "react-toastify/dist/ReactToastify.css";
import "../styles/UpdateVehiclePage.css";

const UpdateVehiclePage = () => {
  const { carID } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [updatedCar, setUpdatedCar] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewMedia, setPreviewMedia] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
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
        const carToEdit = carData.find((car) => car.carID === parseInt(carID));
        if (!carToEdit) {
          throw new Error("Không tìm thấy xe với ID này");
        }

        setCar(carToEdit);
        setUpdatedCar({
          model: carToEdit?.overview.model,
          pricePerDay: carToEdit?.overview.pricePerDay,
          address: carToEdit?.overview.address,
          description: carToEdit?.overview.description,
        });
      } catch (error) {
        toast.error("Lỗi khi lấy dữ liệu xe: " + error.message);
      }
    };

    fetchCarData();
  }, [carID, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "pricePerDay") {
      const newPrice = parseFloat(value);
      const originalPrice = car?.overview?.pricePerDay;

      if (newPrice > originalPrice * 1.3) {
        toast.error("Giá thuê không được tăng quá 30% so với giá ban đầu!");
        return;
      }

      if (newPrice < 0) {
        toast.error("Giá thuê mỗi ngày không được phép là số âm!");
        return;
      }
    }

    setUpdatedCar((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const images = files.filter((file) => file.type.startsWith("image"));
    const videos = files.filter((file) => file.type.startsWith("video"));

    if (images.length !== 4 || videos.length !== 1) {
      toast.error("Vui lòng tải lên đủ 4 ảnh và 1 video!");
      return;
    }

    const sortedFiles = [...images, ...videos];
    setSelectedFiles(sortedFiles);

    const fileArray = sortedFiles.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
    }));

    setPreviewMedia(fileArray);
    toast.success("Đã tải lên thành công!");
  };

  const handleSaveChanges = async () => {
    if (selectedFiles.length !== 5) {
      toast.error("Ảnh và video xe yêu cầu 4 ảnh và 1 video!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("carID", car.carID);
      formData.append("model", updatedCar.model);
      formData.append("pricePerDay", updatedCar.pricePerDay);
      formData.append("address", updatedCar.address);
      formData.append("description", updatedCar.description);

      selectedFiles.forEach((file) => formData.append("images", file));

      const response = await fetch(`http://localhost:3000/owner/update-car`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success("Cập nhật xe thành công, tự động trở về sau 2 giây!");
        setTimeout(() => navigate("/manage-vehicles"), 2000);
      } else {
        toast.error("Cập nhật xe không thành công");
      }
    } catch (error) {
      toast.error("Lỗi khi cập nhật thông tin xe: " + error.message);
    }
  };

  const handleCancel = () => {
    navigate("/manage-vehicles"); // Điều hướng về trang quản lý xe
  };

  if (!car) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="edit-form-container">
      <ToastContainer
        closeButton={false}
        position="top-right"
        autoClose={3000}
      />
      <h3>Cập nhật thông tin xe của bạn</h3>
      <form>
        <div>
          <label>Tên xe:</label>
          <input
            type="text"
            name="model"
            value={updatedCar.model}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Giá thuê một ngày (VND):</label>
          <input
            type="number"
            name="pricePerDay"
            value={updatedCar.pricePerDay}
            onChange={handleInputChange}
            min="0"
          />
        </div>
        <div>
          <label>Địa chỉ:</label>
          <input
            type="text"
            name="address"
            value={updatedCar.address}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Mô tả:</label>
          <textarea
            name="description"
            value={updatedCar.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Ảnh và video xe:</label>
          <div>
            <button
              type="button"
              onClick={() => document.getElementById("fileInput").click()}
              className="upload-button"
            >
              <FontAwesomeIcon icon={faUpload} /> Tải lên ảnh và video
            </button>
            <input
              type="file"
              id="fileInput"
              multiple
              accept="image/*,video/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
          <div className="preview-media">
            {previewMedia.map((media, index) =>
              media.type === "image" ? (
                <img
                  key={index}
                  src={media.url}
                  alt={`Preview ${index + 1}`}
                  className="preview-image"
                />
              ) : (
                <video
                  key={index}
                  controls
                  src={media.url}
                  className="preview-video"
                />
              )
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <button type="button" onClick={handleSaveChanges}>
            Lưu thay đổi
          </button>
          <button
            type="button"
            onClick={handleCancel}
            style={{
              backgroundColor: "#dc3545",
              color: "#fff",
              padding: "10px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Hủy bỏ
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateVehiclePage;
