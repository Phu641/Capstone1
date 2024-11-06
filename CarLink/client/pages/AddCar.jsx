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
    return null;
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files : type === "checkbox" ? checked : value,
      features:
        type === "checkbox"
          ? { ...prevData.features, [name]: checked }
          : prevData.features,
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
    model: "X5",
    type: "Crossover",
    year: "2022",
    condition: "Used",
    transmission: "Manual Transmission",
    fuelType: "Petrol",
    seats: "1",
    pricePerDay: "",
    address: "",
    description: "",
    photos: [],
    features: {
      acFront: false,
      acRear: false,
      backupCamera: false,
      cruiseControl: false,
      navigation: false,
      powerLocks: false,
      amFmStereo: false,
      cdPlayer: false,
      dvdSystem: false,
      mp3Player: false,
      portableAudio: false,
      premiumAudio: false,
      airbagDriver: false,
      airbagPassenger: false,
      antilockBrakes: false,
      bluetooth: false,
      handsFree: false,
      fogLights: false,
      powerWindows: false,
      windowsDefroster: false,
      rearWindow: false,
      wiperTintedGlass: false,
      sunroof: false,
      towPackage: false,
      bucketSeats: false,
      heatedSeats: false,
      leatherInterior: false,
      memorySeats: false,
      powerSeats: false,
      thirdRowSeats: false,
    },
  };

  const {
    formData,
    error,
    setError,
    validateForm,
    handleChange,
    handleFeaturesChange,
    handleImagesChange,
  } = useCarForm(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quan trọng nhất hàm này : login thì mới có dữ liệu user để check, cơ bản là setup hết rồi
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
        Array.from(formData.photos).forEach((file) =>
          formDataToSend.append("photos", file)
        );
      } else if (key === "features") {
        formDataToSend.append("features", JSON.stringify(formData.features));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User is not authenticated");

      const response = await fetch("http://localhost:3000/owner/add-car", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });

      if (!response.ok)
        throw new Error("Failed to submit car details. Please try again.");
      alert("Car details submitted successfully!");
    } catch (error) {
      setError(
        error.message || "Failed to submit car details. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="add-car-form" onSubmit={handleSubmit}>
      <h2>Thêm thông tin về xe của bạn</h2>
      {error && <p className="error">{error}</p>}
      <div className="grid-container">
        <FormField
          label="Mẫu xe (*)"
          name="model"
          type="text"
          value={formData.model}
          onChange={handleChange}
          required
        />
        <FormSelect
          label="Loại xe (*)"
          name="type"
          value={formData.type}
          onChange={handleChange}
          options={["Crossover", "Sedan", "SUV", "Truck"]}
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
          options={["Manual Transmission", "Automatic Transmission"]}
        />
        <FormSelect
          label="Loại nhiên liệu"
          name="fuelType"
          value={formData.fuelType}
          onChange={handleChange}
          options={["Petrol", "Diesel", "Electric"]}
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
        <div style={{ marginTop: "20px", gridColumn: "span 2" }}>
          <label>Mô tả</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Thêm mô tả về xe của bạn..."
            rows="5"
            style={{ width: "200%" }}
          />
        </div>
      </div>
      <Fieldset onImagesChange={handleImagesChange} />
      <Feature onFeaturesChange={handleFeaturesChange} />
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

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
};

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

FormSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AddCarForm;
