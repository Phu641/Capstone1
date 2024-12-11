import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { toast } from "react-toastify";

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
    email: "",
    phoneNumber: "",
    note: "",
    bookingDate: "",
    untilDate: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    phoneNumber: "",
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

    fetchCarDetails();
  }, [carID]);

  useEffect(() => {
    calculatePrice();
  }, [singleCarItem, userInfo.bookingDate, userInfo.untilDate]);

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

        // Kiểm tra xem giá mỗi ngày có hợp lệ không
        const pricePerDay = singleCarItem.overview?.pricePerDay || 0;
        setTotalPrice(days * pricePerDay);
      } else {
        setTotalDays(0);
        setTotalPrice(0);
      }
    }
  };

  const validateField = (field) => {
    const newErrors = { ...errors };
    let isValid = true;

    if (field === "email") {
      if (!userInfo.email.trim()) {
        newErrors.email = "Email không được để trống.";
        isValid = false;
      } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userInfo.email)) {
        newErrors.email = "Email không hợp lệ.";
        isValid = false;
      }
    }

    if (field === "phoneNumber") {
      if (!userInfo.phoneNumber.trim()) {
        newErrors.phoneNumber = "Số điện thoại không được để trống.";
        isValid = false;
      } else if (!/^[0-9]{10,15}$/.test(userInfo.phoneNumber)) {
        newErrors.phoneNumber = "Số điện thoại không hợp lệ";
        isValid = false;
      }
    }

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
      [field]: "", // Xóa lỗi khi người dùng nhập
    }));
  };

  const handleAddressChange = (value) => {
    setAddress(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      address: "", // Xóa lỗi khi người dùng nhập
    }));
  };

  const validateAllFields = () => {
    const newErrors = {};
    let isValid = true;

    // Kiểm tra email
    if (!userInfo.email.trim()) {
      newErrors.email = "Email không được để trống.";
      isValid = false;
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userInfo.email)) {
      newErrors.email = "Email không hợp lệ.";
      isValid = false;
    }

    // Kiểm tra số điện thoại
    if (!userInfo.phoneNumber.trim()) {
      newErrors.phoneNumber = "Số điện thoại không được để trống.";
      isValid = false;
    } else if (!/^[0-9]{10,15}$/.test(userInfo.phoneNumber)) {
      newErrors.phoneNumber = "Số điện thoại không hợp lệ.";
      isValid = false;
    }

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
        toast.error(data.message || "Đặt xe không thành công, vui lòng thử lại.");
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
          <h3 className="mt-5">Thông tin của bạn</h3>
          <Col lg="12">
            <div className="d-flex gap-3">
              <Col lg="6">
                <div className="mt-3">
                  <label htmlFor="userEmail">
                    Email: <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="email"
                    id="userEmail"
                    placeholder="Nhập email"
                    value={userInfo.email}
                    onInput={() => setErrors((prevErrors) => ({ ...prevErrors, email: "" }))}
                    onBlur={() => validateField("email")}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="form-control"
                  />
                  {errors.email && <p style={{ color: "red", marginBottom: "0" }}>{errors.email}</p>}
                </div>
              </Col>
              <Col lg="6">
                <div className="mt-3">
                  <label htmlFor="userPhoneNumber">
                    Số điện thoại: <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="tel"
                    id="userPhoneNumber"
                    placeholder="Nhập số điện thoại"
                    value={userInfo.phoneNumber}
                    onBlur={() => validateField("phoneNumber")}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    className="form-control"
                  />
                  {errors.phoneNumber && <p style={{ color: "red", marginBottom: "0" }}>{errors.phoneNumber}</p>}
                </div>
              </Col>
            </div>
          </Col>
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
            <h3 className="mt-5">Chú ý sử dụng</h3>
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

        <Col lg="12">
          {/* Chi tiết giá thuê */}
          <div className="mt-4">
            <h3>Chi tiết giá thuê:</h3>
            <p style={{ margin: '0 0 2px' }}>Số ngày thuê: <strong>{totalDays}</strong></p>
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
    </section>
  );
};

export default CarDetails;
