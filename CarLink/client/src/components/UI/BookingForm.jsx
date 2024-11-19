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
    discountCode: "",
  });

  const [errors, setErrors] = useState({
    surname: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    date: "",
    time: "",
  });

  const [totalPrice, setTotalPrice] = useState(carPrice);

  useEffect(() => {
    // Cập nhật lại giá khi carPrice thay đổi
    setTotalPrice(carPrice);
  }, [carPrice]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Xóa lỗi khi người dùng thay đổi giá trị
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    if (name === "discountCode") {
      handleDiscount(value); // Kiểm tra mã giảm giá khi thay đổi
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

    setErrors(newErrors);
    return isValid;
  };

  const handleDiscount = (code) => {
    if (code === "DISCOUNT10") {
      setTotalPrice(carPrice * 0.9); // Giảm 10% giá
    } else {
      setTotalPrice(carPrice); // Nếu mã giảm giá không hợp lệ, giữ nguyên giá
    }
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
          <h2 className="section-heading mb-4">Chi Tiết Giá</h2>
          <FormGroup className="booking__form d-inline-block mb-4">
            <label>Giá thuê xe</label>
            <input
              type="text"
              value={carPrice ? `${carPrice} VND` : "Chưa có giá"}
              disabled
            />
          </FormGroup>
          <FormGroup className="booking__form d-inline-block mb-4">
            <label>Mã giảm giá</label>
            <input
              type="text"
              name="discountCode"
              value={formData.discountCode}
              onChange={handleChange}
              placeholder="Nhập mã giảm giá"
            />
          </FormGroup>
          <FormGroup className="booking__form d-inline-block mb-4">
            <label>Tổng tiền</label>
            <input
              type="text"
              value={`${totalPrice} VND`}
              disabled
            />
          </FormGroup>
        </div>
        <button type="submit" className="booking-form-submit">
          Đặt xe
        </button>
      </Form>
    </div>
  );
};

export default BookingForm;
