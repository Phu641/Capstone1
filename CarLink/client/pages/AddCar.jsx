import { useState } from "react";
import "../styles/AddCarForm.css";
import Feature from "../src/components/Feature/Feature";
import Fieldset from "../src/components/Fieldset/Fieldset";

import PropTypes from "prop-types";

const useCarForm = (initialValues) => {
  const [formData, setFormData] = useState(initialValues);
  const [error, setError] = useState(null);

  const validateForm = () => {
    if (!formData.model) return "Mẫu xe là bắt buộc.";
    if (
      !formData.year ||
      isNaN(formData.year) ||
      formData.year < 1900 ||
      formData.year > new Date().getFullYear()
    )
      return "Năm sản xuất không hợp lệ.";
    if (
      !formData.pricePerDay ||
      isNaN(formData.pricePerDay) ||
      formData.pricePerDay <= 0
    )
      return "Giá cho thuê phải là một số dương.";
    if (!formData.address) return "Địa chỉ là bắt buộc.";
    if (formData.photos.length === 0) return "Bạn phải thêm ít nhất một ảnh và 1 video.";
    return null;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFeaturesChange = (features) => {
    setFormData((prevData) => ({ ...prevData, features }));
  };

  const handleImagesChange = (images) => {
    setFormData((prevData) => ({ ...prevData, photos: images }));
  };
  return {
    formData,
    error,
    setError,
    validateForm,
    handleChange,
    handleFeaturesChange,
    handleImagesChange,
  };
};

const AddCarForm = () => {
  const initialValues = {
    listingTitle: "BMW",
    model: "",
    type: "Sport",
    year: "2022",
    condition: "Used",
    transmission: "Số sàn",
    fuelType: "Xăng",
    seats: "4",
    pricePerDay: "",
    address: "",
    description: "",
    photos: [],
    selfPickUp: false, // Mặc định là false
    delivery: false, // Mặc định là false
    features: {
      acFront: false,
      acRear: false,
      backupCamera: false,
      cruiseControl: false,
      navigation: false,
      powerLocks: false,
    },
  };

  const {
    formData,
    // error,
    setError,
    validateForm,
    handleChange,
    handleFeaturesChange,
    handleImagesChange,
  } = useCarForm(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "photos") {
        formData.photos.forEach((file) =>
          formDataToSend.append("images", file)
        );
      } else if (key === "features") {
        formDataToSend.append("features", JSON.stringify(formData.features));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Người dùng chưa được uỷ quyền");

      const response = await fetch("http://localhost:3000/owner/add-car", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });

      if (!response.ok) throw new Error("Gửi thông tin thất bại!.");
      alert("Thông tin của bạn đã được gửi!!");
      console.log("Loại xe gửi đi:", formData.type);

    } catch (error) {
      setError(error.message || "Gửi thông tin thất bại!.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="add-car-form" onSubmit={handleSubmit}>
      <h2>Thêm thông tin về xe của bạn</h2>
      {/* {error && <p className="error">{error}</p>} */}
      <div className="grid-container">
        <FormField
          label="Mẫu xe (*)"
          name="model"
          type="text"
          value={formData.model}
          onChange={handleChange}
           placeholder="Nhập tên xe + model ví dụ : BWM X5"
          required
        />
        <FormSelect
          label="Loại xe (*)"
          name="type"
          value={formData.type}
          onChange={handleChange}
          options={["Sport", "Suv", "Mpv", "Sedan", "Coupe", "Hatchback"]}
        />
        <FormField
          label="Năm sản xuất (*)"
          name="year"
          type="number"
          value={formData.year}
          onChange={handleChange}
          required
        />
        <FormSelect
          label="Hộp số"
          name="transmission"
          value={formData.transmission}
          onChange={handleChange}
          options={["Số sàn", "Số tự động"]}
        />
        <FormSelect
          label="Loại nhiên liệu"
          name="fuelType"
          value={formData.fuelType}
          onChange={handleChange}
          options={["Xăng", "Dầu", "Điện"]}
        />
        <FormField
          label="Số ghế"
          name="seats"
          type="text"
          value={formData.seats}
          onChange={handleChange}
        />
        <FormField
          label="Giá cho thuê"
          name="pricePerDay"
          type="text"
          value={formData.pricePerDay}
          onChange={handleChange}
          placeholder="Nhập giá cho thuê theo ngày"
        />
        <FormField
          label="Địa chỉ"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleChange}
          placeholder="Nhập địa chỉ của xe"
        />
        <div>
          <label>Hình thức nhận xe</label>
          <br />
          <label>
            <input
              type="checkbox"
              name="selfPickUp"
              checked={formData.selfPickUp}
              onChange={handleChange}
            />
            Tự đến nhận xe
          </label>

          <label>
            <input
              type="checkbox"
              name="delivery"
              checked={formData.delivery}
              onChange={handleChange}
            />
            Giao xe tận nơi
          </label>
        </div>
      </div>
      <div>
        <label>Mô tả</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Thêm mô tả về xe của bạn..."
          rows="5"
          style={{ width: "100%" }}
        />
      </div>
      <Fieldset onImagesChange={handleImagesChange} />
      <Feature onFeaturesChange={handleFeaturesChange} />
      <br />
      <button className="add-car-btn" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Đang gửi..." : "Gửi thông tin đến CarLink"}
      </button>
    </form>
  );
};

const FormField = ({ label, name, type, value, onChange, ...props }) => (
  <div className="grid-item">
    <label>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      {...props}
    />
  </div>
);

const FormSelect = ({ label, name, value, onChange, options }) => (
  <div className="grid-item">
    <label>{label}</label>
    <select name={name} value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
};

FormSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AddCarForm;
