import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { toast } from "react-toastify";
import "../styles/CarDetails.css";

const CarDetails = () => {
  const { carID } = useParams();
  const navigate = useNavigate();
  const [singleCarItem, setSingleCarItem] = useState(null);
  const [currentMedia, setCurrentMedia] = useState("");
  const [isAcceptedTerms, setIsAcceptedTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("selfPickUp");
  const [address, setAddress] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userInfo, setUserInfo] = useState({
    bookingDate: "",
    untilDate: "",
    usePoints: 0,
  });
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [errors, setErrors] = useState({
    address: "",
    bookingDate: "",
    untilDate: ""
  });


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

    const fetchLoyaltyPoints = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Vui lòng đăng nhập để lấy điểm thưởng.");
        return;  // Nếu không có token, dừng lại không gửi yêu cầu API
      }
    
      try {
        const response = await fetch(
          "http://localhost:3000/customer/loyal-points",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
    
        if (response.ok) {
          const data = await response.json();
          setLoyaltyPoints(data);
        } else {
          throw new Error("Failed to fetch loyal points");
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchCarDetails();
    fetchLoyaltyPoints();
  }, [carID]);

  useEffect(() => {
    calculatePrice();
  }, [singleCarItem, userInfo.bookingDate, userInfo.untilDate, userInfo.usePoints]);

  const handleMediaClick = (media) => {
    const newMedia = `http://localhost:3000/images/${media || "./default-image.jpg"}`;
    setCurrentMedia(newMedia);
  };

  const calculatePrice = () => {
    if (singleCarItem && userInfo.bookingDate && userInfo.untilDate) {
      const startDate = new Date(userInfo.bookingDate);
      const endDate = new Date(userInfo.untilDate);

      if (startDate <= endDate) {
        const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        setTotalDays(days);

        const pricePerDay = singleCarItem.overview?.pricePerDay || 0;
        let newTotalPrice = days * pricePerDay;

        const pointsDiscount = userInfo.usePoints * 1000;
        newTotalPrice -= pointsDiscount;

        if (newTotalPrice < 0) {
          newTotalPrice = 0;
        }

        setTotalPrice(newTotalPrice);
      } else {
        setTotalDays(0);
        setTotalPrice(0);
      }
    }
  };

  const handlePointsChange = (e) => {
    var points = Math.min(e.target.value, loyaltyPoints);
    if (points > 50) {
      points = 50;
    }
    setUserInfo((prev) => ({
      ...prev,
      usePoints: points,
    }));
  };



  const validateField = (field) => {
    const newErrors = { ...errors };
    let isValid = true;

    if (field === "address" && deliveryOption === "delivery") {
      if (!address.trim()) {
        newErrors.address = "Địa chỉ không được để trống.";
        isValid = false;
      }
    }

    if (field === "bookingDate") {
      if (!userInfo.bookingDate.trim()) {
        newErrors.bookingDate = "Ngày đặt không được để trống.";
        isValid = false;
      }
    }

    if (field === "untilDate") {
      if (!userInfo.untilDate.trim()) {
        newErrors.untilDate = "Ngày kết thúc không được để trống.";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (field, value) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const handleAddressChange = (value) => {
    setAddress(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      address: "",
    }));
  };

  const validateAllFields = () => {
    const newErrors = {};
    let isValid = true;

    // Kiểm tra địa chỉ (nếu chọn giao hàng)
    if (deliveryOption === "delivery" && !address.trim()) {
      newErrors.address = "Địa chỉ không được để trống.";
      isValid = false;
    }

    // Kiểm tra ngày đặt
    if (!userInfo.bookingDate.trim()) {
      newErrors.bookingDate = "Ngày đặt không được để trống.";
      isValid = false;
    }

    // Kiểm tra ngày kết thúc
    if (!userInfo.untilDate.trim()) {
      newErrors.untilDate = "Ngày kết thúc không được để trống.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRentButtonClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Vui lòng đăng nhập để sử dụng chức năng này!");
      return;
    }

    if (!isAcceptedTerms) {
      setErrorMessage("Bạn cần chấp nhận chú ý khi sử dụng trước khi đặt xe.");
      return;
    }

    if (!validateAllFields()) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin trước khi đặt xe.");
      return;
    }

    const bookingData = {
      carID: parseInt(carID, 10),
      bookingDate: userInfo.bookingDate,
      untilDate: userInfo.untilDate,
      address: deliveryOption === "delivery" ? address : "",
      pricePerDay: singleCarItem?.overview?.pricePerDay || 0,
      days: totalDays,
      usePoints: userInfo.usePoints,
    };

    try {
      const bookingResponse = await fetch("http://localhost:3000/customer/book-car", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (!bookingResponse.ok) {
        const data = await bookingResponse.json();
        toast.error(data.message || "Rất tiếc, xe này đã được đặt trước. Hãy thử chọn xe khác");
        return;
      }

      // Gọi API thanh toán
      const paymentAmount = totalPrice * 0.3;
      const paymentResponse = await fetch("http://localhost:3000/customer/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: paymentAmount }),
      });

      if (!paymentResponse.ok) {
        const paymentData = await paymentResponse.json();
        toast.error(paymentData.message || "Không thể tạo yêu cầu thanh toán, vui lòng thử lại.");
        return;
      }

      const paymentData = await paymentResponse.json();
      const { payUrl } = paymentData;

      if (payUrl) {
        toast.success("Đang chuyển hướng đến trang thanh toán...");
        window.location.href = payUrl; // Chuyển hướng đến URL thanh toán
      } else {
        toast.error("Không tìm thấy URL thanh toán, vui lòng thử lại.");
      }
    } catch (error) {
      toast.error("Lỗi kết nối đến máy chủ, vui lòng thử lại sau.");
    }
  };

  if (!singleCarItem) {
    return <p>Loading...</p>;
  }

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

            <p style={{ fontSize: '16px', color: '#333', marginTop: '20px' }}>
              <span style={{ color: '#f00' }}>* lưu ý:</span> Khoảng phí cọc thanh toán trước 30% của tổng tiền thuê xe, số còn lại trả khi nhận xe. Phí này sẽ không được trả khi hoàn lại.
            </p>
          </Col>
        </Row>
        <Row>
          <h3 className="mt-5">Thông tin ngày đặt xe</h3>
          <Col lg="12">
            <div className="d-flex gap-3">
              <Col lg="6">
                <div className="mt-3">
                  <label htmlFor="bookingDate">Ngày đặt <span style={{ color: "red", marginBottom: "0" }}>*</span> :</label>
                  <input
                    type="date"
                    id="bookingDate"
                    className="form-control"
                    value={userInfo.bookingDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => handleInputChange("bookingDate", e.target.value)}
                  />
                  {errors.bookingDate && <p style={{ color: "red" }}>{errors.bookingDate}</p>}
                </div>
              </Col>

              <Col lg="6">
                <div className="mt-3">
                  <label htmlFor="untilDate">Ngày kết thúc <span style={{ color: "red", marginBottom: "0" }}>*</span> :</label>
                  <input
                    type="date"
                    id="untilDate"
                    className="form-control"
                    value={userInfo.untilDate}
                    min={userInfo.bookingDate ? new Date(new Date(userInfo.bookingDate).setDate(new Date(userInfo.bookingDate).getDate() + 1)).toISOString().split("T")[0] : ""}
                    onChange={(e) => handleInputChange("untilDate", e.target.value)}
                  />
                  {errors.untilDate && <p style={{ color: "red", marginBottom: "0" }}>{errors.untilDate}</p>}
                </div>
              </Col>
            </div>
          </Col>

          <div className="mt-3">
            <label htmlFor="note">Ghi chú</label>
            <textarea
              id="note"
              className="form-control"
              value={userInfo.note}
              onChange={(e) => handleInputChange("note", e.target.value)}
              placeholder="Nhập ghi chú của bạn"
            />
          </div>
          <div className="mt-3">
            <h3 className="mb-3">Chọn phương thức nhận xe</h3>
            <select
              id="deliveryOption"
              value={deliveryOption}
              onChange={(e) => setDeliveryOption(e.target.value)}
              className="form-control"
            >
              <option value="selfPickUp">Tự nhận xe</option>
              <option value="delivery">Giao tận nơi</option>
            </select>
            {deliveryOption === "delivery" && (
              <div className="mt-3">
                <label htmlFor="address">
                  Địa chỉ nhận xe: <span style={{ color: "red", marginBottom: "0" }}>*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  placeholder="Nhập địa chỉ nhận xe"
                  value={address}
                  onInput={() => setErrors((prevErrors) => ({ ...prevErrors, address: "" }))}
                  onBlur={() => validateField("address")}
                  onChange={(e) => handleAddressChange(e.target.value)}
                  className="form-control"
                />
                {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}
              </div>
            )}
          </div>


        </Row>

        <Row>
          <Col lg="12">
            <h3 className="mt-5">Giấy tờ thuê xe</h3>
            <p>
              Trước khi nhận xe, bạn cần cung cấp bằng lái xe và một trong những tài liệu sau:
              <b> Căn cước công dân và VNeID</b>.
            </p>
            <div className="d-flex align-items-center mt-3">
              <i className="ri-apps-line" style={{ color: "#f9a826", fontSize: "2rem", marginRight: "10px" }}></i>
              <span>VNeID</span>
            </div>
            <div className="d-flex align-items-center mt-3">
              <i className="ri-file-list-3-line" style={{ color: "#f9a826", fontSize: "2rem", marginRight: "10px" }}></i>
              <span>Căn Cước Công Dân</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg="12">
        <div className="collateral-info mt-4">
          <h4>Tài khoản thế chấp</h4>
          <p>
            Bạn sẽ để lại tài sản thế chấp <b>(tiền mặt/chuyển khoản hoặc xe máy kém cà vẹt gốc)</b> cho chủ xe khi làm thủ tục nhận xe.
          </p>
          <p>
            Chủ xe sẽ gửi lại tài sản thế chấp khi bạn hoàn trả xe theo như nguyên trạng ban đầu lúc nhận xe.
          </p>
        </div>
        </Col>
        </Row>
        <Row>
          <Col lg="12" className="attention-form">
            <div>
              <h3 className="mt-3 attention-title">Chú ý sử dụng</h3>
              <ul>
                <li style={{ marginTop: '30px' }}>Sử dụng xe đúng mục đích.</li>
                <li>Không sử dụng xe thuê vào mục đích phi pháp, trái pháp luật.</li>
                <li>Không sử dụng xe thuê để cầm cố, thế chấp.</li>
                <li>Không hút thuốc, nhả kẹo cao su, xả rác trong xe.</li>
                <li>Không chở hàng quốc cấm dễ cháy nổ.</li>
                <li>Không chở thực phẩm nặng mùi trong xe.</li>
                <li>
                  Khi trả xe, nếu xe bẩn hoặc có mùi trong xe, khách hàng vui lòng vệ sinh xe sạch sẽ
                  hoặc gửi phụ thu phí vệ sinh xe.
                </li>
                <li>
                  <span style={{ color: 'red' }}>Chú ý:</span> Nếu vi phạm sẽ bị phụ thu
                </li>
              </ul>
            </div>
            <div>

              <h3 className="fees-title mt-3">Phụ phí có thể phát sinh</h3>
              <table className="fees-table">
                <thead>
                  <tr>
                    <th>Loại Phí</th>
                    <th>Phí</th>
                    <th>Chú Thích</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Phí vượt giới hạn</td>
                    <td>5,000đ/km</td>
                    <td>Phụ phí phát sinh nếu lộ trình di chuyển vượt quá 350km khi thuê xe 1 ngày</td>
                  </tr>
                  <tr>
                    <td>Phí quá giờ</td>
                    <td>90,000đ/h</td>
                    <td>Phụ phí phát sinh nếu hoàn trả xe trễ giờ. Trường hợp trễ quá 4 giờ, phụ phí thêm 1 ngày thuê</td>
                  </tr>
                  <tr>
                    <td>Phí vệ sinh</td>
                    <td>120,000đ</td>
                    <td>Phụ phí phát sinh khi xe hoàn trả không đảm bảo vệ sinh (nhiều vết bẩn, bùn cát, sình lầy...)</td>
                  </tr>
                  <tr>
                    <td>Phí khử mùi</td>
                    <td>400,000đ</td>
                    <td>Phụ phí phát sinh khi xe hoàn trả bị ám mùi khó chịu (mùi thuốc lá, thực phẩm nặng mùi...)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>
        </Row>

        <Col lg="12">
          {/* Chi tiết giá thuê */}
          <div className="mt-4">
            <h3>Chi tiết giá thuê:</h3>
            <p style={{ margin: '0 0 2px' }}>Số ngày thuê: <strong>{totalDays}</strong></p>
            <div className="mt-3">
              <label htmlFor="usePoints">Sử dụng điểm thưởng: (<span style={{color:'red'}}>*Lưu ý</span>: số điểm thưởng không được nhập lớn hơn 50)</label>
              <input
                type="number"
                id="usePoints"
                value={userInfo.usePoints}
                onChange={handlePointsChange}
                className="form-control"
                min={0}
                max={50}
                placeholder="Nhập số điểm sử dụng"
              />

              <p>Số điểm bạn có: {loyaltyPoints}</p>
            </div>
            <p style={{ margin: '0 0 2px' }}>Tổng chi phí: <strong>{totalPrice.toLocaleString("vi-VN")} VND</strong></p>
            <p style={{ margin: '0 0 2px' }}>
              Số tiền cần cọc <span style={{ color: '#f00' }}>(30%)</span> : <strong>{(totalPrice * 0.3).toLocaleString("vi-VN")} VND</strong>
            </p>

          </div>

        </Col>

        <Row>
          <Col lg="12" style={{ display: "flex", alignItems: "center" }} className="mt-4">
            <label htmlFor="acceptTerms">Tôi đã đọc và đồng ý với chú ý sử dụng</label>
            <input
              type="checkbox"
              id="acceptTerms"
              checked={isAcceptedTerms}
              onChange={() => setIsAcceptedTerms(!isAcceptedTerms)}
              style={{ maxWidth: "20px", marginBottom: "4px" }}
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
    </section >
  );
};

export default CarDetails;
