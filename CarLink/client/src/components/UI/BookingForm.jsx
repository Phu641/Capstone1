import React from "react";
import "../../../styles/booking-form.css";
import { Form, FormGroup } from "reactstrap";

const BookingForm = () => {
  const submitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <Form onSubmit={submitHandler}>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="text" placeholder="Họ và tên lót" />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input type="text" placeholder="Tên" />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="email" placeholder="Email" />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input type="number" placeholder="Số diện thoại" />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="text" placeholder="Địa chỉ đi từ" />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input type="text" placeholder="Địa chỉ đến" />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <select name="" id="">
          <option value="1 person">1 Người</option>
          <option value="2 person">2 Người</option>
          <option value="3 person">3 Người</option>
          <option value="4 person">4 Người</option>
          <option value="5+ person">5+ Người</option>
        </select>
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <select name="" id="">
          <option value="1 luggage">1 hành lí</option>
          <option value="2 luggage">2 hành lí</option>
          <option value="3 luggage">3 hành lí</option>
          <option value="4 luggage">4 hành lí</option>
          <option value="5+ luggage">5+ hành lí</option>
        </select>
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="date" placeholder="" />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        
        <div className="booking__form-JTiem">
        <input
          type="time"
          placeholder="Giờ"
          className="time__picker"
        />
        </div>
      </FormGroup>

      <FormGroup>
        <textarea
          rows={5}
          type="textarea"
          className="textarea"
          placeholder="Chú thích"
        ></textarea>
      </FormGroup>
    </Form>
  );
};

export default BookingForm;
