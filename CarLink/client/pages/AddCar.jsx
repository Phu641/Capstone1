import { useState } from "react";
import "../styles/AddCarForm.css";
import Feature from "../src/components/Feature/Feature";
import Fieldset from "../src/components/Fieldset/Fieldset";
import { Container, Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";


const useCarForm = (initialValues) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      if (name === "selfPickUp" || name === "delivery") {
        if (newErrors.pickupMethod) {
          delete newErrors.pickupMethod;
        }
      }

      if (newErrors[name]) {
        delete newErrors[name];
      }

      return newErrors;
    });

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

  const validateForm = () => {
    const newErrors = {};

    // Kiểm tra các trường còn lại
    if (!formData.model.trim()) newErrors.model = "Mẫu xe không được để trống.";
    if (!formData.type.trim()) newErrors.type = "Loại xe không được để trống.";
    if (!formData.year.trim() || isNaN(formData.year) || parseInt(formData.year) <= 0)
      newErrors.year = "NămSX không hợp lệ (không là số âm hoặc để trống).";
    if (!formData.pricePerDay.trim() || isNaN(formData.pricePerDay) || parseInt(formData.pricePerDay) <= 0)
      newErrors.pricePerDay = "Giá cho thuê không hợp lệ (không thể là số âm hoặc để trống)";
    if (!formData.address.trim())
      newErrors.address = "Địa chỉ không được để trống.";

    // Kiểm tra hình thức nhận xe
    if (!formData.selfPickUp && !formData.delivery) {
      newErrors.pickupMethod = "Bạn phải chọn ít nhất một hình thức nhận xe.";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "Bạn phải đồng ý với các chú ý đăng xe";
    }

    console.log(newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  return {
    formData,
    errors,
    setErrors,
    validateForm,
    handleChange,
    handleFeaturesChange,
    handleImagesChange,
  };
};

const AddCarForm = () => {
  const initialValues = {
    model: "BWN x5",
    type: "Sport",
    year: "2022",
    transmission: "Số sàn",
    fuelType: "Xăng",
    seats: "4",
    pricePerDay: "",
    address: "",
    description: "",
    photos: [],
    selfPickUp: false,
    delivery: false,
    features: {
      acFront: false,
      acRear: false,
      backupCamera: false,
      cruiseControl: false,
      navigation: false,
      powerLocks: false,
    },
    agreeTerms: false,
  };

  const {
    formData,
    errors,
    validateForm,
    handleChange,
    handleFeaturesChange,
    handleImagesChange,
  } = useCarForm(initialValues);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Người dùng chưa được uỷ quyền");

      // Gửi thông tin đăng xe
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

      const response = await fetch("http://localhost:3000/owner/add-car", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });

      if (!response.ok) throw new Error("Gửi thông tin thất bại.");
      toast.success("Thông tin của bạn đã được gửi");

      // Sau khi đăng xe thành công, gọi API tạo thanh toán
      const paymentResponse = await fetch("http://localhost:3000/owner/create-payment", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!paymentResponse.ok) throw new Error("Tạo thanh toán thất bại.");

      const paymentData = await paymentResponse.json();
      if (paymentData.payUrl) {
        toast.success("Đang chuyển hướng tới trang thanh toán...");
        window.location.href = paymentData.payUrl; // Chuyển hướng tới trang thanh toán
      } else {
        throw new Error("Không nhận được URL thanh toán.");
      }

    } catch (error) {
      toast.error(error.message || "Gửi thông tin thất bại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="add-car-form" onSubmit={handleSubmit}>
      <h2>Thêm thông tin về xe của bạn</h2>
      <div className="grid-container">
        <FormField
          label="Mẫu xe (*)"
          name="model"
          type="text"
          value={formData.model}
          onChange={handleChange}
          error={errors.model}
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
          error={errors.year}
        />
        <FormSelect
          label="Hộp số (*)"
          name="transmission"
          value={formData.transmission}
          onChange={handleChange}
          options={["Số sàn", "Số tự động"]}
        />
        <FormSelect
          label="Loại nhiên liệu (*)"
          name="fuelType"
          value={formData.fuelType}
          onChange={handleChange}
          options={["Xăng", "Dầu", "Điện"]}
        />
        <FormSelect
          label="Số ghế (*)"
          name="seats"
          type="text"
          value={formData.seats}
          onChange={handleChange}
          options={[2, 4, 6, 8, 10, 12]}
        />
        <FormField
          label="Giá cho thuê (*)"
          name="pricePerDay"
          type="text"
          value={formData.pricePerDay}
          onChange={handleChange}
          error={errors.pricePerDay}
          placeholder="Nhập giá cho thuê theo ngày"
        />
        <FormField
          label="Địa chỉ (*)"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleChange}
          error={errors.address}
          placeholder="Nhập địa chỉ của xe"
        />
        <div>
          <label>Hình thức nhận xe (*)</label>
          <div className="checkbox-container">
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
            {errors.pickupMethod && <span className="error">{errors.pickupMethod}</span>}
          </div>
        </div>
      </div>
      <div className="mt-3">
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
      <Row>
        <Col lg="12">
          <h3 className="mt-5">Chú ý khi đăng xe</h3>
          <ul>
            <li>Kiểm tra thông tin xe thật chính xác và đầy đủ trước khi đăng.</li>
            <li>Cung cấp các hình ảnh rõ ràng, chất lượng của xe từ nhiều góc độ để khách hàng có thể đánh giá.</li>
            <li>Đảm bảo rằng xe của bạn đã được kiểm tra kỹ về tình trạng hoạt động (máy móc, lốp, đèn, phanh, v.v.) và an toàn trước khi đăng.</li>
            <li>Thông báo rõ ràng về các điều kiện cho thuê, mức phí</li>
            <li>Đảm bảo giấy tờ xe hợp lệ (đăng kiểm, bảo hiểm, v.v.) và có thể cung cấp khi khách yêu cầu.</li>
            <li>Đưa ra các chính sách về việc giao và nhận xe (địa điểm, thời gian, phương thức).</li>
            <li>Đảm bảo bạn sẵn sàng giải quyết các vấn đề phát sinh trong quá trình cho thuê xe nếu có.</li>
            {/* <li>Đọc kỹ các điều khoản và quy định của nền tảng cho thuê xe mà bạn đăng xe lên.</li> */}
            <li>
              <span style={{ color: 'red' }}>Chú ý:</span> Nếu vi phạm sẽ có thể bị khoá tài khoản
            </li>
          </ul>
        </Col>
      </Row>
      <div className="mt-3">
        <label>
          <input style={{ marginBottom: '3px' }}
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
          />
        </label>
        Tôi đã đọc và đồng ý với chú ý sử dụng
      </div>
      <div className={`problem mb-4 ${!errors.agreeTerms ? 'hidden' : ''}`}>
        {errors.agreeTerms && <p className="error mb-4">{errors.agreeTerms}</p>}
      </div>

      <button className="add-car-btn mt-2" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Đang gửi..." : "Gửi thông tin"}
      </button>
      <ToastContainer />
    </form >
  );
};

const FormField = ({ label, name, type, value, onChange, error, ...props }) => (
  <div className="grid-item">
    <label>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      {...props}
    />
    {error && <p className="error">{error}</p>}
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
  error: PropTypes.string,
};

FormSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AddCarForm;


