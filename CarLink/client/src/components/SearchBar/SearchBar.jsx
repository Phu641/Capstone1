import React, { useState } from "react";
import "./SearchBar.css";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa"; // Icon
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import CSS cho DatePicker

const SearchBar = () => {
  const [place, setPlace] = useState("");
  const [startDate, setStartDate] = useState(new Date()); // Khởi tạo ngày mặc định cho startDate
  const [endDate, setEndDate] = useState(new Date()); // Khởi tạo ngày mặc định cho endDate

  const handlePlaceChange = (e) => {
    setPlace(e.target.value);
  };

  const handleSearch = () => {
    console.log(`Searching for ${place} from ${startDate} to ${endDate}`);
  };

  return (
    <section className="s-wapper">
      <div className="search-bar">
        <div className="input-container">
          <FaMapMarkerAlt className="icon" />
          <input
            type="text"
            placeholder="Enter place"
            value={place}
            onChange={handlePlaceChange}
          />
        </div>

        <div className="input-container">
          <FaCalendarAlt className="icon" />
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            dateFormat="Pp"
          />
        </div>

        <div className="input-container">
          <FaCalendarAlt className="icon" />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            dateFormat="Pp"
          />
        </div>

        <button className="search-button button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </section>
  );
};

export default SearchBar;
