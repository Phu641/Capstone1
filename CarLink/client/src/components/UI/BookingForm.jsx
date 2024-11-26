import React, { useState, useEffect } from "react";
import "../../../styles/booking-form.css";
import { Form, FormGroup } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";

const BookingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const carPrice = location.state?.carPrice || 0;

  const [formData, setFormData] = useState({
    surname: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    date: "",
    time: "",
    note: "",
    deliveryOption: "selfPickUp",
    deliveryAddress: "",
  });

  const [errors, setErrors] = useState({
    surname: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    date: "",
    time: "",
    deliveryAddress: "",
  });

  const [totalPrice, setTotalPrice] = useState(carPrice);

  useEffect(() => {
    setTotalPrice(carPrice);
  }, [carPrice]);

  const currentDate = new Date().toISOString().split('T')[0]; // Lấy ngày hiện tại theo định dạng YYYY-MM-DD
  const currentTime = new Date(); // Lấy giờ hiện tại
  currentTime.setMinutes(currentTime.getMinutes() - currentTime.getMinutes() % 5); // Làm tròn giờ hiện tại xuống phút gần nhất chia hết cho 5
  const formattedTime = currentTime.toISOString().split('T')[1].slice(0, 5); // Lấy giờ và phút hiện tại đã làm tròn

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Kiểm tra nếu là trường 'time' và ngày được chọn là ngày hiện tại
    if (name === "time" && formData.date === currentDate) {
      const [enteredHour, enteredMinute] = value.split(":").map(Number);
      const [currentHour, currentMinute] = formattedTime.split(":").map(Number);

      if (enteredHour < currentHour || (enteredHour === currentHour && enteredMinute < currentMinute)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          time: "Giờ không thể bé hơn hoặc bằng giờ hiện tại.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          time: "",
        }));
      }
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    validateForm(name);
  };

  const validateForm = (fieldName) => {
    const newErrors = { ...errors };
    let isValid = true;

    if (!fieldName || fieldName === "surname") {
      if (!formData.surname.trim()) {
        newErrors.surname = "Họ và tên lót không được để trống.";
        isValid = false;
      }
    }

    if (!fieldName || fieldName === "lastName") {
      if (!formData.lastName.trim()) {
        newErrors.lastName = "Tên không được để trống.";
        isValid = false;
      }
    }

    if (!fieldName || fieldName === "email") {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!formData.email.trim() || !emailPattern.test(formData.email)) {
        newErrors.email = "Email không hợp lệ.";
        isValid = false;
      }
    }

    if (!fieldName || fieldName === "phoneNumber") {
      if (!formData.phoneNumber.trim() || formData.phoneNumber.length < 10) {
        newErrors.phoneNumber = "Số điện thoại không hợp lệ.";
        isValid = false;
      }
    }

    if (!fieldName || fieldName === "date") {
      if (!formData.date.trim()) {
        newErrors.date = "Ngày không được để trống.";
        isValid = false;
      }
    }

    if (!fieldName || fieldName === "time") {
      if (!formData.time.trim()) {
        newErrors.time = "Giờ không được để trống.";
        isValid = false;
      }
    }

    if (formData.deliveryOption === "delivery" && (!formData.deliveryAddress.trim())) {
      newErrors.deliveryAddress = "Địa chỉ giao xe không được để trống.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      console.log("Form submitted", formData);
      navigate("/payment");
    } else {
      console.log("Form has errors, please fix them before submitting.");
    }
  };

  return (
    <div className="booking-form-container">
      <h1 className="booking-heading">Thông Tin Đặt Xe</h1>
      <Form onSubmit={submitHandler}>
        <div className="booking-section">
          <h2 className="section-heading mb-4">Thông Tin Của Bạn</h2>
          <FormGroup className="booking__form d-inline-block me-4 mb-4">
            <input
              type="text"
              name="surname"
              value={formData.surname}
              placeholder="Họ và tên lót"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.surname && <p className="error">{errors.surname}</p>}
          </FormGroup>
          <FormGroup className="booking__form d-inline-block ms-1 mb-4">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              placeholder="Tên"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.lastName && <p className="error">{errors.lastName}</p>}
          </FormGroup>
          <FormGroup className="booking__form d-inline-block me-4 mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </FormGroup>
          <FormGroup className="booking__form d-inline-block ms-1 mb-4">
            <input
              type="number"
              name="phoneNumber"
              value={formData.phoneNumber}
              placeholder="Số điện thoại"
              className="number-input"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
          </FormGroup>
          <FormGroup className="booking__form d-inline-block me-4 mb-4">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              onBlur={handleBlur}
              min={currentDate} // Giới hạn ngày không được nhỏ hơn ngày hiện tại
            />
            {errors.date && <p className="error">{errors.date}</p>}
          </FormGroup>
          <FormGroup className="booking__form d-inline-block ms-1 mb-4">
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              onBlur={handleBlur}
              min={formData.date === currentDate ? formattedTime : "00:00"} // Giới hạn giờ không được nhỏ hơn giờ hiện tại nếu là ngày hiện tại
            />
            {errors.time && <p className="error">{errors.time}</p>}
          </FormGroup>
          <FormGroup>
            <textarea
              rows={5}
              name="note"
              value={formData.note}
              onChange={handleChange}
              className="textarea"
              placeholder="Chú thích"
            ></textarea>
          </FormGroup>
        </div>
        <div className="booking-section">
          <h2 className="section-heading mb-4">Chi Tiết Giao Xe</h2>
          <FormGroup className="mb-4">
            <label>
              <input
                type="radio"
                name="deliveryOption"
                value="selfPickUp"
                checked={formData.deliveryOption === "selfPickUp"}
                onChange={handleChange}
              />
              Tự nhận xe
            </label>
            <label className="ms-4">
              <input
                type="radio"
                name="deliveryOption"
                value="delivery"
                checked={formData.deliveryOption === "delivery"}
                onChange={handleChange}
              />
              Giao xe tận nơi
            </label>
          </FormGroup>
          {formData.deliveryOption === "delivery" && (
            <FormGroup className="booking__form mb-4">
              <input
                type="text"
                name="deliveryAddress"
                value={formData.deliveryAddress}
                placeholder="Địa chỉ giao xe"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.deliveryAddress && <p className="error">{errors.deliveryAddress}</p>}
            </FormGroup>
          )}
        </div>
        <div className="total-price">
          <h2 className="section-heading mb-4">Chi Tiết Giá</h2>
          <FormGroup className="booking__form d-inline-block mb-4">
            <label>Giá thuê xe</label>
            <input
              type="text"
              value={`${Number(carPrice).toLocaleString("vi-VN")} VND`}
              disabled
            />
          </FormGroup>
          <FormGroup className="booking__form d-inline-block mb-4">
            <label>Loyal Point</label>
            <input
              type="text"
              value='Loyal Point'
              disabled
            />
          </FormGroup>
          <h4>Tổng giá tiền: {Number(totalPrice).toLocaleString("vi-VN")} VND</h4>
        </div>
        <button type="submit" className="mt-4">
          Tiến hành thanh toán
        </button>
      </Form>
    </div>
  );
};

export default BookingForm;
