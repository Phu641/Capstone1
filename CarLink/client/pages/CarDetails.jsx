import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Thay useHistory thành useNavigate
import { Container, Row, Col } from "reactstrap";
import SeachBar from "../src/components/SearchBar/SearchBar";
import { text } from "@fortawesome/fontawesome-svg-core";

const CarDetails = () => {
  const { carID } = useParams();
  const navigate = useNavigate(); // Sử dụng useNavigate thay cho useHistory
  const [singleCarItem, setSingleCarItem] = useState(null);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    const fetchCarDetails = async () => {
      const cleanedCarID = carID.split(":").pop();

      if (!cleanedCarID) {
        console.error("Car ID không có sẵn.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/searching/car/${cleanedCarID}`);
        if (!response.ok) {
          throw new Error("Không thể lấy thông tin chi tiết xe.");
        }

        const data = await response.json();
        if (data) {
          setSingleCarItem(data);
          setCurrentImage(`http://localhost:3000/images/${data.carImages?.[0]?.imageUrl || "./default-image.jpg"}`);
        } else {
          console.error("Dữ liệu xe bị thiếu hoặc không đầy đủ.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin chi tiết xe:", error.message);
      }
    };

    fetchCarDetails();
    window.scrollTo(0, 0);
  }, [carID]);

  const handleImageClick = (img) => {
    setCurrentImage(`http://localhost:3000/images/${img || "./default-image.jpg"}`);
  };

  const handleRentButtonClick = () => {
    // Điều hướng đến trang Booking Form khi nhấn nút
    navigate("/booking-form"); // Sử dụng navigate thay cho history.push
  };

  if (!singleCarItem) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <Container>
        <Row className="mb-5">
          <Col lg="12">
            <h1 style={{ textAlign: "center" }}>Thông tin chi tiết xe</h1>
          </Col>
        </Row>
        <Row>
          <Col lg="6">
            <img src={currentImage} alt={singleCarItem.overview?.model || "Car"} className="w-100" />
            <div className="image-thumbnails d-flex mt-2">
              {singleCarItem.carImages?.map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:3000/images/${img.imageUrl}`}
                  alt={`Thumbnail ${index}`}
                  className="thumbnail"
                  onClick={() => handleImageClick(img.imageUrl)}
                  style={{ cursor: "pointer", width: "100px", marginRight: "10px" }}
                />
              ))}
            </div>
          </Col>

          <Col lg="6">
            <div className="car__info">
              <h2 className="section__title">{singleCarItem.overview?.model}</h2>
              <div className="d-flex align-items-center gap-5 mb-4 mt-3">
                <h6 className="rent__price fw-bold fs-4">
                  {singleCarItem.overview?.pricePerDay
                    ? Number(singleCarItem.overview?.pricePerDay).toLocaleString("vi-VN")
                    : "0"} VND / ngày
                </h6>
                <span className="d-flex align-items-center gap-2">
                  <span style={{ color: "#f9a826" }}>
                    <i className="ri-star-s-fill"></i>
                    <i className="ri-star-s-fill"></i>
                    <i className="ri-star-s-fill"></i>
                    <i className="ri-star-s-fill"></i>
                    <i className="ri-star-s-fill"></i>
                  </span>
                  ({singleCarItem.rating || 0} đánh giá)
                </span>
              </div>

              <p className="section__description">{singleCarItem.overview?.description}</p>

              <div className="d-flex align-items-center mt-3" style={{ columnGap: "4rem" }}>
                <span className="d-flex align-items-center gap-1 section__description">
                  <i className="ri-roadster-line" style={{ color: "#f9a826" }}></i> {singleCarItem.overview?.model}
                </span>
                <span className="d-flex align-items-center gap-1 section__description">
                  <i className="ri-settings-2-line" style={{ color: "#f9a826" }}></i> {singleCarItem.overview?.transmission}
                </span>
                <span className="d-flex align-items-center gap-1 section__description">
                  <i className="ri-user-fill" style={{ color: "#f9a826" }}></i> {singleCarItem.overview?.seats}
                </span>
                <span className="d-flex align-items-center gap-1 section__description">
                  <i className="ri-gas-station-line" style={{ color: "#f9a826" }}></i> {singleCarItem.overview?.fuelType}
                </span>
              </div>

              <div className="d-flex align-items-center mt-3" style={{ columnGap: "2.8rem" }}>
                <span className="d-flex align-items-center gap-1 section__description">
                  <i className="ri-map-pin-line" style={{ color: "#f9a826" }}></i> {singleCarItem.overview?.address}
                </span>
                <span className="d-flex align-items-center gap-1 section__description">
                  <i className="ri-building-2-line" style={{ color: "#f9a826" }}></i> {singleCarItem.brand}
                </span>
              </div>

              {/* Nút Đặt Xe */}
              <button className="mt-4" onClick={handleRentButtonClick}>
                Đặt ngay
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CarDetails;
