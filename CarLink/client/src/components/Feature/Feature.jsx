import { useState } from "react";
import "./Feature.css";

const Feature = () => {
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedFeatures([...selectedFeatures, name]);
    } else {
      setSelectedFeatures(
        selectedFeatures.filter((feature) => feature !== name)
      );
    }
  };

  return (
    <div className="feature-container">
      <h2>Các tiện nghi khác</h2>
      <div className="feature-grid">
        <div className="feature-section">
          <label>
            <input type="checkbox" name="map" onChange={handleCheckboxChange} />
            Bản đồ
          </label>
          <label>
            <input
              type="checkbox"
              name="A/C: Rear"
              onChange={handleCheckboxChange}
            />
            Camera hành trình
          </label>
          <label>
            <input
              type="checkbox"
              name="Backup Camera"
              onChange={handleCheckboxChange}
            />
            Cảnh báo tốc độ
          </label>
          <label>
            <input
              type="checkbox"
              name="Navigation"
              onChange={handleCheckboxChange}
            />
            Lốp dự phòng
          </label>
        </div>

        <div className="feature-section">
          <label>
            <input
              type="checkbox"
              name="AM/FM Stereo"
              onChange={handleCheckboxChange}
            />
            Bluetooth
          </label>
          <label>
            <input
              type="checkbox"
              name="CD Player"
              onChange={handleCheckboxChange}
            />
            Camera lùi
          </label>
          <label>
            <input
              type="checkbox"
              name="DVD System"
              onChange={handleCheckboxChange}
            />
            Cửa sổ trời
          </label>
          <label>
            <input
              type="checkbox"
              name="MP3 Player"
              onChange={handleCheckboxChange}
            />
            Màn hình DVD
          </label>
        </div>

        <div className="feature-section">
          <label>
            <input
              type="checkbox"
              name="Airbag: Driver"
              onChange={handleCheckboxChange}
            />
            Camera 360
          </label>
          <label>
            <input
              type="checkbox"
              name="Airbag: Passenger"
              onChange={handleCheckboxChange}
            />
            Cảm biến lốp
          </label>
          <label>
            <input
              type="checkbox"
              name="Antilock Brakes"
              onChange={handleCheckboxChange}
            />
            Định vị GPS
          </label>
        </div>

        <div className="feature-section">
          <label>
            <input
              type="checkbox"
              name="Power Windows"
              onChange={handleCheckboxChange}
            />
            Cửa sổ điện
          </label>

          <label>
            <input
              type="checkbox"
              name="Sunroof"
              onChange={handleCheckboxChange}
            />
            Cửa sổ trời
          </label>
        </div>

        <div className="feature-section">
          <label>
            <input
              type="checkbox"
              name="Heated Seats"
              onChange={handleCheckboxChange}
            />
            Ghế sưởi
          </label>
          <label>
            <input
              type="checkbox"
              name="Leather Interior"
              onChange={handleCheckboxChange}
            />
            Ghế da
          </label>
          <label>
            <input
              type="checkbox"
              name="Power Seats"
              onChange={handleCheckboxChange}
            />
            Ghế chỉnh điện
          </label>
        </div>
      </div>
    </div>
  );
};

export default Feature;
