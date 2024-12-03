import React, { useState, useEffect } from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../../../styles/car-item.css";

const CarItem = (props) => {
  const { id, images, model, carName, transmission, price, seats, address, delivery, isAvailable, selfPickUp } = props.item;
  console.log(delivery)
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchFavoriteCars = async () => {
      const token = localStorage.getItem("token"); // Kiểm tra token
      if (!token) return; // Nếu không có token, thoát hàm

      try {
        const response = await axios.get("http://localhost:3000/customer/cars-favorite", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          const favoriteCars = response.data.map((car) => car.carID);
          localStorage.setItem("likedCars", JSON.stringify(favoriteCars)); // Cập nhật localStorage
          setIsLiked(favoriteCars.includes(id)); // Kiểm tra trạng thái yêu thích
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách xe yêu thích:", error);
        toast.error("Không thể tải danh sách yêu thích!");
      }
    };

    fetchFavoriteCars();
  }, [id]);

  const handleLike = async () => {
    const token = localStorage.getItem("token"); // Lấy token
    if (!token) {
      toast.error("Vui lòng đăng nhập để sử dụng chức năng này!");
      return;
    }

    try {
      setIsLiked((prevState) => !prevState);

      const response = await axios.post(
        `http://localhost:3000/customer/add-favorite/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        const likedCars = JSON.parse(localStorage.getItem("likedCars")) || [];
        if (isLiked) {
          const updatedCars = likedCars.filter((carId) => carId !== id);
          localStorage.setItem("likedCars", JSON.stringify(updatedCars));
          toast.error("Đã xóa xe khỏi danh sách yêu thích!");
        } else {
          likedCars.push(id);
          localStorage.setItem("likedCars", JSON.stringify(likedCars));
          toast.success("Đã thêm xe vào danh sách yêu thích!");
        }
      } else {
        toast.error("Có lỗi xảy ra, vui lòng thử lại!");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi thêm/xóa vào danh sách yêu thích!");
      console.error(error);
    }
  };


  const carImage = images && images.length > 0 ? `http://localhost:3000/images/${images[0]}` : "./default-image.jpg";
  const isVideo = carImage && (carImage.endsWith(".mp4") || carImage.endsWith(".webm") || carImage.endsWith(".ogg"));

  return (
    <Col lg="4" md="4" sm="6" className="mb-5" style={{ width: "100%" }}>

      <div className="car__item">
        <div className="like__icon" onClick={handleLike}>
          <i className={isLiked ? "ri-heart-fill liked" : "ri-heart-line"}></i>
        </div>
        <Link to={`/cars/${id}`} className="car-card">
          <div className="car__img">
            {isVideo ? (
              <video
                src={carImage}
                alt={carName || model}
                className="w-100"
                controls
                autoPlay
                muted
              />
            ) : (
              <img src={carImage} alt={carName || model} className="w-100" />
            )}
          </div>

          <div className="car__item-content mt-4">
            <h4 className="section__title text-center">{carName || model}</h4>
            <h6 className="rent__price text-center">
              {Number(price).toLocaleString("vi-VN")} VND <span>/ Ngày</span>
            </h6>

            <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-3">
              <span className="d-flex align-items-center gap-1">
                <i className="ri-car-line"></i> {model}
              </span>
              <span className="d-flex align-items-center gap-1">
                <i className="ri-settings-2-line"></i> {transmission}
              </span>
              <span className="d-flex align-items-center gap-1">
                <i className="ri-user-fill"></i> {seats}
              </span>
            </div>

            <div className="car__item-status d-flex align-items-center justify-content-between">
              {delivery && (
                <span className="d-flex align-items-center gap-1 car__item-status-delivery">
                  <i className="ri-truck-line"></i> Giao tận nơi
                </span>
              )}
              {selfPickUp && (
                <span className="d-flex align-items-center gap-1 car__item-status-selfpickup">
                  <i className="ri-user-location-line"></i> Tự lấy xe
                </span>
              )}
            </div>

            <div className="location-container">
              <i className="ri-map-pin-line"></i>
              <span>{address.split(",")[0]}</span>
            </div>

            <button className="car__item-btn car__btn-rent mb-1">
              <Link to={`/cars/${id}`}>Chi tiết</Link>
            </button>
          </div>
        </Link>
      </div>
    </Col>
  );
};

export default CarItem;
