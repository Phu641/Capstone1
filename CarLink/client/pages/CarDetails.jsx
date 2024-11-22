import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Thay useHistory thành useNavigate
import { Container, Row, Col } from "reactstrap";

const CarDetails = () => {
  const { carID } = useParams();
  const navigate = useNavigate();
  const [singleCarItem, setSingleCarItem] = useState(null);
  const [currentMedia, setCurrentMedia] = useState(""); // Changed from currentImage to currentMedia
  const [isAcceptedTerms, setIsAcceptedTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 

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
          const firstMedia = data.carImages?.[0]?.imageUrl || "./default-image.jpg";
          setCurrentMedia(`http://localhost:3000/images/${firstMedia}`);
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

  const handleMediaClick = (media) => {
    const newMedia = `http://localhost:3000/images/${media || "./default-image.jpg"}`;
    setCurrentMedia(newMedia);
  };

  const handleRentButtonClick = () => {
    if (!isAcceptedTerms) {
      setErrorMessage("Bạn phải chấp nhận điều khoản sử dụng trước khi đặt xe.");
      return;
    }
    setErrorMessage(""); // Clear error message if validation passes
    navigate("/booking-form", { state: { carPrice: singleCarItem?.overview?.pricePerDay || 0 } });
  };

  if (!singleCarItem) {
    return <p>Loading...</p>;
  }

  // Determine if the media is a video by its extension (you can adjust this to handle more video formats)
  const isVideo = currentMedia && (currentMedia.endsWith(".mp4") || currentMedia.endsWith(".avi"));

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
            {isVideo ? (
              <video
                src={currentMedia}
                alt="Car Video"
                className="w-100"
                controls
                autoPlay
              />
            ) : (
              <img src={currentMedia} alt={singleCarItem.overview?.model || "Car"} className="w-100" />
            )}
            <div className="image-thumbnails d-flex mt-2">
              {singleCarItem.carImages?.map((img, index) => {
                const mediaUrl = `http://localhost:3000/images/${img.imageUrl}`;
                const isVideoThumbnail = mediaUrl.endsWith(".mp4") || mediaUrl.endsWith(".avi");
                return (
                  <div key={index} onClick={() => handleMediaClick(img.imageUrl)} style={{ cursor: "pointer" }}>
                    {isVideoThumbnail ? (
                      <video
                        src={mediaUrl}
                        className="thumbnail"
                        style={{ width: "100px", marginRight: "10px" }}
                        controls
                      />
                    ) : (
                      <img
                        src={mediaUrl}
                        alt={`Thumbnail ${index}`}
                        className="thumbnail"
                        style={{ width: "100px", marginRight: "10px" }}
                      />
                    )}
                  </div>
                );
              })}
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
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg="12">
            <h3 className="mt-5">Giấy tờ thuê xe</h3>
            <p>
              Trước khi nhận xe, bạn cần cung cấp bằng lái xe và một trong những tài liệu sau:
              <b> Chứng minh nhân dân hoặc hộ chiếu</b>.
            </p>
            <div className="d-flex align-items-center mt-3">
              <i className="ri-file-list-3-line" style={{ color: "#f9a826", fontSize: "2rem", marginRight: "10px" }}></i>
              <span>Bằng lái xe</span>
            </div>
            <div className="d-flex align-items-center mt-3">
              <i className="ri-file-list-3-line" style={{ color: "#f9a826", fontSize: "2rem", marginRight: "10px" }}></i>
              <span>Căn Cước Công Dân</span>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg="12">
            <h3 className="mt-5">Điều khoản sử dụng</h3>
            <ul>
              <li>Sử dụng xe đúng mục đích.</li>
              <li>Không sử dụng xe thuê vào mục đích phi pháp, trái pháp luật.</li>
              <li>Không sử dụng xe thuê để cầm cố, thế chấp.</li>
              <li>Không hút thuốc, nhả kẹo cao su, xả rác trong xe.</li>
              <li>Không chở hàng quốc cấm dễ cháy nổ.</li>
              <li>Không chở thực phẩm nặng mùi trong xe.</li>
              <li>
                Khi trả xe, nếu xe bẩn hoặc có mùi trong xe, khách hàng vui lòng vệ sinh xe sạch sẽ
                hoặc gửi phụ thu phí vệ sinh xe.
              </li>
            </ul>
          </Col>
        </Row>

        <Row>
          <Col lg="12" style={{display:"flex", alignItems: "center"}} className="mt-4">
            <label htmlFor="acceptTerms">Tôi đã đọc và đồng ý với điều khoản sử dụng</label>
            <input
              type="checkbox"
              id="acceptTerms"
              checked={isAcceptedTerms}
              onChange={() => setIsAcceptedTerms(!isAcceptedTerms)}
              style={{maxWidth: "20px", marginBottom: "4px" }}
            />
          </Col>
        </Row>
        {errorMessage && (
          <Row>
            <Col lg="12" className="mt-2">
              <p style={{ color: "red" }}>{errorMessage}</p>
            </Col>
          </Row>
        )}
        <button className="mt-4" onClick={handleRentButtonClick}>
          Đặt ngay
        </button>
      </Container>
    </section>
  );
};

export default CarDetails;
