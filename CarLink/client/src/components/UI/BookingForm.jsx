import React, { useState } from "react";
import "../../../styles/booking-form.css";
import { Form, FormGroup } from "reactstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const BookingForm = () => {
  const navigate = useNavigate(); // Khởi tạo navigate

  const [formData, setFormData] = useState({
    fullName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    departureAddress: "",
    arrivalAddress: "",
    passengers: "1 person",
    luggage: "1 luggage",
    date: "",
    time: "",
    note: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    departureAddress: "",
    arrivalAddress: "",
    date: "",
    time: "",
  });

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
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    validateForm(name);
  };

  const validateForm = (fieldName) => {
    const newErrors = { ...errors };
    let isValid = true;

    if (!fieldName || fieldName === "fullName") {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Họ và tên không được để trống.";
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

    if (!fieldName || fieldName === "departureAddress") {
      if (!formData.departureAddress.trim()) {
        newErrors.departureAddress = "Địa chỉ đi từ không được để trống.";
        isValid = false;
      }
    }

    if (!fieldName || fieldName === "arrivalAddress") {
      if (!formData.arrivalAddress.trim()) {
        newErrors.arrivalAddress = "Địa chỉ đến không được để trống.";
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

  const submitHandler = (event) => {
    event.preventDefault();

    const isValid = validateForm(); // Validate toàn bộ form khi submit

    if (isValid) {
      // Chỉ chuyển hướng khi form hợp lệ
      console.log("Form submitted", formData);
      navigate("/payment"); // Điều hướng đến trang Payment
    } else {
      console.log("Form has errors, please fix them before submitting.");
    }
  };

  return (
    <div className="booking-form-container">
      <h1 className="booking-heading">Thông Tin Đặt Xe</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            placeholder="Họ và tên lót"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.fullName && <p className="error">{errors.fullName}</p>}
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
            type="text"
            name="departureAddress"
            value={formData.departureAddress}
            placeholder="Địa chỉ đi từ"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.departureAddress && <p className="error">{errors.departureAddress}</p>}
        </FormGroup>
        <FormGroup className="booking__form d-inline-block ms-1 mb-4">
          <input
            type="text"
            name="arrivalAddress"
            value={formData.arrivalAddress}
            placeholder="Địa chỉ đến"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.arrivalAddress && <p className="error">{errors.arrivalAddress}</p>}
        </FormGroup>

        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <select
            name="passengers"
            value={formData.passengers}
            onChange={handleChange}
          >
            <option value="1 person">1 Người</option>
            <option value="2 person">2 Người</option>
            <option value="3 person">3 Người</option>
            <option value="4 person">4 Người</option>
            <option value="5+ person">5+ Người</option>
          </select>
        </FormGroup>
        <FormGroup className="booking__form d-inline-block ms-1 mb-4">
          <select
            name="luggage"
            value={formData.luggage}
            onChange={handleChange}
          >
            <option value="1 luggage">1 hành lí</option>
            <option value="2 luggage">2 hành lí</option>
            <option value="3 luggage">3 hành lí</option>
            <option value="4 luggage">4 hành lí</option>
            <option value="5+ luggage">5+ hành lí</option>
          </select>
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

        <button type="submit" className="booking-form-submit">
          Đặt xe
        </button>
      </Form>
    </div>
  );
};

export default BookingForm;
