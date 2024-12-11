import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/UpdateVehiclePage.css";

const UpdateVehiclePage = () => {
  const { carID } = useParams(); // Lấy carID từ URL
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [updatedCar, setUpdatedCar] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]); // State cho ảnh và video được chọn
  const [previewMedia, setPreviewMedia] = useState([]); // State để lưu trữ các ảnh và video đã chọn

  // Lấy token từ localStorage
  const token = localStorage.getItem("token");

  // Lấy dữ liệu xe từ API để chỉnh sửa
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
        console.error("Lỗi khi lấy dữ liệu xe:", error);
      }
    };

    fetchCarData();
  }, [carID, token]);

  // Hàm xử lý thay đổi thông tin trong form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCar((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Hàm xử lý khi chọn ảnh và video
  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles(files);

    // Tạo các URL xem trước cho ảnh và video
    const fileArray = Array.from(files).map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
    }));
    setPreviewMedia(fileArray);
  };

  // Hàm gửi yêu cầu cập nhật thông tin xe
  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append("carID", car.carID);
      formData.append("model", updatedCar.model);
      formData.append("pricePerDay", updatedCar.pricePerDay);
      formData.append("address", updatedCar.address);
      formData.append("description", updatedCar.description);
      if (selectedFiles) {
        for (let i = 0; i < selectedFiles.length; i++) {
          formData.append("images", selectedFiles[i]);
        }
      }

      const response = await fetch(`http://localhost:3000/owner/update-car`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        navigate("/manage-vehicles"); // Điều hướng quay lại trang danh sách xe
      } else {
        console.error("Cập nhật xe không thành công");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin xe:", error);
    }
  };

  if (!car) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="edit-form-container">
      <h3>Chỉnh sửa thông tin xe</h3>
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
          <label>Giá thuê mỗi ngày (VND):</label>
          <input
            type="number"
            name="pricePerDay"
            value={updatedCar.pricePerDay}
            onChange={handleInputChange}
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
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
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
        <button type="button" onClick={handleSaveChanges}>
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
};

export default UpdateVehiclePage;
