import React, { useState } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import "../../../styles/siderBar.css";

const Sidebar = ({ onFilterChange }) => {
  const [type, setType] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 10000000]);

  // Hàm định dạng tiền tệ
  const formatCurrency = (value) => {
    if (isNaN(value)) return "";  // Nếu không phải số, trả về chuỗi rỗng
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setType(selectedType);
    onFilterChange({ type: selectedType, capacity, priceRange });
  };

  const handleCapacityChange = (e) => {
    const selectedCapacity = parseInt(e.target.value);
    setCapacity(selectedCapacity);
    onFilterChange({ type, capacity: selectedCapacity, priceRange });
  };

  const handlePriceRangeChange = (e) => {
    const newPrice = [priceRange[0], parseInt(e.target.value)];
    setPriceRange(newPrice);
    onFilterChange({ type, capacity, priceRange: newPrice });
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
              onChange={handleTypeChange}
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
              onChange={handleCapacityChange}
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
        onChange={handlePriceRangeChange}
      />
      <p>
        Giá: {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
      </p>
    </div>
  );
};

export default Sidebar;
