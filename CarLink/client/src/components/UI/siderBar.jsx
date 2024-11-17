import React, { useState } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import "../../../styles/siderBar.css";

const Sidebar = () => {
  const [type, setType] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 10000000]);

  const formatCurrency = (value) => {
    return parseInt(value).toLocaleString("vi-VN");
  };

  return (
    <div className="sidebar">
      <h4>Loại</h4>
      {["sport", "suv", "mpv", "sedan", "coupe", "hatchback"].map((carType) => (
        <FormGroup check key={carType}>
          <Label check>
            <Input
              type="radio"
              name="type"
              value={carType}
              onChange={(e) => setType(e.target.value)}
              checked={type === carType}
            />
            {carType.charAt(0).toUpperCase() + carType.slice(1)}
          </Label>
        </FormGroup>
      ))}

      <h4>Sức chứa</h4>
      {[2, 4, 6, 8].map((cap) => (
        <FormGroup check key={cap}>
          <Label check>
            <Input
              type="radio"
              name="capacity"
              value={cap}
              onChange={() => setCapacity(cap)}
              checked={capacity === cap}
            />
            {cap === 8 ? "8 hoặc hơn" : `${cap} người`}
          </Label>
        </FormGroup>
      ))}

      <h4>Giá</h4>
      <input
        type="range"
        min="0"
        max="10000000"
        value={priceRange[1]}
        onChange={(e) =>
          setPriceRange([priceRange[0], parseInt(e.target.value)])
        }
      />
      <p>
        Giá: {formatCurrency(priceRange[0])} VND - {formatCurrency(priceRange[1])} VND
      </p>
    </div>
  );
};

export default Sidebar;
