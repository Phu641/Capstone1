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
      <h2>Select Listing Features</h2>
      <div className="feature-grid">
        <div className="feature-section">
          <h3>Request Price Label</h3>
          <label>
            <input
              type="checkbox"
              name="A/C: Front"
              onChange={handleCheckboxChange}
            />
            A/C: Front
          </label>
          <label>
            <input
              type="checkbox"
              name="A/C: Rear"
              onChange={handleCheckboxChange}
            />
            A/C: Rear
          </label>
          <label>
            <input
              type="checkbox"
              name="Backup Camera"
              onChange={handleCheckboxChange}
            />
            Backup Camera
          </label>
          <label>
            <input
              type="checkbox"
              name="Cruise Control"
              onChange={handleCheckboxChange}
            />
            Cruise Control
          </label>
          <label>
            <input
              type="checkbox"
              name="Navigation"
              onChange={handleCheckboxChange}
            />
            Navigation
          </label>
          <label>
            <input
              type="checkbox"
              name="Power Locks"
              onChange={handleCheckboxChange}
            />
            Power Locks
          </label>
        </div>

        <div className="feature-section">
          <h3>Entertainment</h3>
          <label>
            <input
              type="checkbox"
              name="AM/FM Stereo"
              onChange={handleCheckboxChange}
            />
            AM/FM Stereo
          </label>
          <label>
            <input
              type="checkbox"
              name="CD Player"
              onChange={handleCheckboxChange}
            />
            CD Player
          </label>
          <label>
            <input
              type="checkbox"
              name="DVD System"
              onChange={handleCheckboxChange}
            />
            DVD System
          </label>
          <label>
            <input
              type="checkbox"
              name="MP3 Player"
              onChange={handleCheckboxChange}
            />
            MP3 Player
          </label>
          <label>
            <input
              type="checkbox"
              name="Portable Audio"
              onChange={handleCheckboxChange}
            />
            Portable Audio
          </label>
          <label>
            <input
              type="checkbox"
              name="Premium Audio"
              onChange={handleCheckboxChange}
            />
            Premium Audio
          </label>
        </div>

        <div className="feature-section">
          <h3>Safety</h3>
          <label>
            <input
              type="checkbox"
              name="Airbag: Driver"
              onChange={handleCheckboxChange}
            />
            Airbag: Driver
          </label>
          <label>
            <input
              type="checkbox"
              name="Airbag: Passenger"
              onChange={handleCheckboxChange}
            />
            Airbag: Passenger
          </label>
          <label>
            <input
              type="checkbox"
              name="Antilock Brakes"
              onChange={handleCheckboxChange}
            />
            Antilock Brakes
          </label>
          <label>
            <input
              type="checkbox"
              name="Bluetooth"
              onChange={handleCheckboxChange}
            />
            Bluetooth
          </label>
          <label>
            <input
              type="checkbox"
              name="Hands-Free"
              onChange={handleCheckboxChange}
            />
            Hands-Free
          </label>
          <label>
            <input
              type="checkbox"
              name="Fog Lights"
              onChange={handleCheckboxChange}
            />
            Fog Lights
          </label>
        </div>

        <div className="feature-section">
          <h3>Windows</h3>
          <label>
            <input
              type="checkbox"
              name="Power Windows"
              onChange={handleCheckboxChange}
            />
            Power Windows
          </label>
          <label>
            <input
              type="checkbox"
              name="Windows Defroster"
              onChange={handleCheckboxChange}
            />
            Windows Defroster
          </label>
          <label>
            <input
              type="checkbox"
              name="Rear Window"
              onChange={handleCheckboxChange}
            />
            Rear Window
          </label>
          <label>
            <input
              type="checkbox"
              name="Wiper Tinted Glass"
              onChange={handleCheckboxChange}
            />
            Wiper Tinted Glass
          </label>
          <label>
            <input
              type="checkbox"
              name="Sunroof"
              onChange={handleCheckboxChange}
            />
            Sunroof
          </label>
          <label>
            <input
              type="checkbox"
              name="Tow Package"
              onChange={handleCheckboxChange}
            />
            Tow Package
          </label>
        </div>

        <div className="feature-section">
          <h3>Seats</h3>
          <label>
            <input
              type="checkbox"
              name="Bucket Seats"
              onChange={handleCheckboxChange}
            />
            Bucket Seats
          </label>
          <label>
            <input
              type="checkbox"
              name="Heated Seats"
              onChange={handleCheckboxChange}
            />
            Heated Seats
          </label>
          <label>
            <input
              type="checkbox"
              name="Leather Interior"
              onChange={handleCheckboxChange}
            />
            Leather Interior
          </label>
          <label>
            <input
              type="checkbox"
              name="Memory Seats"
              onChange={handleCheckboxChange}
            />
            Memory Seats
          </label>
          <label>
            <input
              type="checkbox"
              name="Power Seats"
              onChange={handleCheckboxChange}
            />
            Power Seats
          </label>
          <label>
            <input
              type="checkbox"
              name="Third Row Seats"
              onChange={handleCheckboxChange}
            />
            Third Row Seats
          </label>
        </div>
      </div>
    </div>
  );
};

export default Feature;
