import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../../styles/pickupdropbox.css";

const pickupdropbox = (props) => {
    const locations = [
        "Sân bay Đà Nẵng",
        "Bãi biển Mỹ Khê",
        "Cầu Rồng",
        "Bán đảo Sơn Trà",
        "Sân bay Tân Sơn Nhất",
        "Bến Thành Market",
        "Phố đi bộ Nguyễn Huệ",
        "Nhà thờ Đức Bà",
        "Landmark 81"
      ];
    
      const times = [
        "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", 
        "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", 
        "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
      ];
  return (
    <div className="pickup-dropbox">
    <Col>
        <h3>Diểm đón</h3>
        <div className="input-form">
            <div className="form-row">
                <select className="input-form">
                    <option value="">Vị trí</option>
                    {locations.map((location, index) => (
                        <option key={index} value={location}>{location}</option>
                    ))}
                </select>
                <input 
                            type="date" 
                            className="input-form" 
                            placeholder="Date" // Placeholder for date input
                        />
                <select>
                    <option value="">Giờ</option>
                    {times.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                    ))}
                </select>
            </div>
        </div>
    </Col>
    <Col>
        <h3>Điểm trả</h3>
        <div className="input-form">
            <div className="form-row">
                <select>
                    <option value="">Vị trí</option>
                    {locations.map((location, index) => (
                        <option key={index} value={location}>{location}</option>
                    ))}
                </select>
                <input type="date" className="input-form" />
                <select>
                    <option value="">Giờ</option>
                    {times.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                    ))}
                </select>
            </div>
        </div>
    </Col>
</div>
);
};

export default pickupdropbox;
