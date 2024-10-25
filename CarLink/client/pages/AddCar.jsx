import { useState } from "react";
import "../styles/AddCarForm.css";
import Feature from "../src/components/Feature/Feature";
import Fieldset from "../src/components/Fieldset/Fieldset";

const AddCarForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    listingTitle: "BMV",
    model: "X5",
    type: "Crossover",
    year: "2022",
    condition: "Used",
    stockNumber: "",
    vinNumber: "",
    mileage: "",
    transmission: "Manual Transmission",
    driverType: "FWD",
    engineSize: "",
    cylinders: "1",
    fuelType: "Petrol",
    doors: "4",
    color: "Black",
    seats: "1",
    cityMPG: "18",
    highwayMPG: "28",
    description: "",
    regularPrice: "",
    photos: [null, null, null, null, null],
    address: "",
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
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        features: {
          ...formData.features,
          [name]: checked,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form className="add-car-form" onSubmit={handleSubmit}>
      <h2>Thêm thông tin về xe của bạn</h2>
      <div className="grid-container">
        {/* <div className="grid-item">
          <label>Listing Title (*)</label>
          <input
            type="text"
            name="listingTitle"
            value={formData.listingTitle}
            onChange={handleChange}
            placeholder="Enter title here"
            required
          />
        </div> */}
        <div className="grid-item">
          <label>Mẫu xe (*)</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid-item">
          <label>Loại xe (*)</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="Crossover">Crossover</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Truck">Truck</option>
          </select>
        </div>
        <div className="grid-item">
          <label>Năm sản xuất (*)</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>
        {/* <div className="grid-item">
          <label>Tình trạng</label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
          >
            <option value="Used">Qua sử dụng</option>
            <option value="New">Mới</option>
          </select>
        </div> */}
        {/* <div className="grid-item">
          <label>Stock Number</label>
          <input
            type="text"
            name="stockNumber"
            value={formData.stockNumber}
            onChange={handleChange}
          />
        </div> */}
        {/* <div className="grid-item">
          <label>VIN Number</label>
          <input
            type="text"
            name="vinNumber"
            value={formData.vinNumber}
            onChange={handleChange}
          />
        </div> */}
        {/* <div className="grid-item">
          <label>Quãng đường đã đi</label>
          <input
            type="text"
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
          />
        </div> */}
        <div className="grid-item">
          <label>Hộp số</label>
          <select
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
          >
            <option value="Manual Transmission">Hộp số sàn</option>
            <option value="Automatic Transmission">
              Hộp số tự động
            </option>
          </select>
        </div>
        {/* <div className="grid-item">
          <label> Driver Type (*)</label>
          <select
            name="driverType"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="FWD">FWD</option>
            <option value="2WD">2WD</option>
            <option value="3WD">3WD</option>
            <option value="3WD">3WD</option>
            <option value="4WD">4WD</option>
            <option value="WD">WD</option>
          </select>
        </div> */}
        {/* <div className="grid-item">
          <label>Engine Size</label>
          <input
            type="text"
            name="engineSize"
            value={formData.engineSize}
            onChange={handleChange}
          />
        </div> */}
        {/* <div className="grid-item">
          <label>Cylinders</label>
          <input
            type="number"
            name="cylinders"
            value={formData.cylinders}
            onChange={handleChange}
          />
        </div> */}

        <div className="grid-item">
          <label> Loại nhiên liệu</label>
          <select name="FuelType" value={formData.type} onChange={handleChange}>
            <option value="Petro">Xăng</option>
            <option value="Diesel">Dầu Diesel</option>
            <option value="Electric">Điện</option>
          </select>
        </div>
        {/* <div className="grid-item">
          <label> Doors (*)</label>
          <select name="doors" value={formData.type} onChange={handleChange}>
            <option value="4">4</option>
            <option value="2">2</option>
          </select>
        </div> */}
        {/* <div className="grid-item">
          <label>Color</label>
          <select name="color" value={formData.color} onChange={handleChange}>
            <option value="Black">Black</option>
            <option value="White">White</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Silver">Silver</option>
          </select>
        </div> */}
        <div className="grid-item">
          <label>Số ghế</label>
          <input
            type="text"
            name="seats"
            value={formData.seats}
            onChange={handleChange}
          />
        </div>
        {/* <div className="grid-item">
          <label>City MPG</label>
          <input
            type="number"
            name="cityMPG"
            value={formData.cityMPG}
            onChange={handleChange}
          />
        </div> */}
        {/* <div className="grid-item">
          <label>Highway MPG</label>
          <input
            type="number"
            name="highwayMPG"
            value={formData.highwayMPG}
            onChange={handleChange}
          />
        </div> */}
        <div>
          <label>Giá cho thuê</label>
          <input
            type="text"
            name="salePrice"
            value={formData.salePrice}
            onChange={handleChange}
            placeholder="Nhập giá cho thuê theo ngày"
          />
        </div>  
        <div>
          <label>Địa chỉ</label>
          <input
            type="text"
            name="address"
            value={formData.salePrice}
            onChange={handleChange}
            placeholder="Nhập địa chỉ của xe"
          />
        </div>
        <div style={{ marginTop: "20px", gridColumn: "span 2" }}>
          <label>Mô tả</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Thêm mô tả về xe của bạn ( ví dụ như tình trạng xe của bạn hiện tại khác so với ảnh trên website như gãy kính, trầy xướt,...)"
            rows="5"
            style={{ width: "200%" }}
          />
        </div>
      </div>
      <Fieldset />
      <Feature />
      <div>
        <button className="add-car-btn" onClick={handleSubmit}>
          Gửi thông tin đến CarLink
        </button>
      </div>
    </form>
  );
};

export default AddCarForm;
