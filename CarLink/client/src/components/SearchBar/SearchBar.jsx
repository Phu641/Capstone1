import React, { useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import locations from "./location.json";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const [place, setPlace] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handlePlaceChange = (e) => {
    const value = e.target.value;
    setPlace(value);

    if (value.length > 2) {
      const filteredSuggestions = locations.filter((location) =>
        location.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setPlace(suggestion.name);
    setSuggestions([]);
  };

  const handleSearch = () => {
    // Chuyển hướng tới CarListing với query parameters
    navigate(`/cars?location=${place}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
  };

  return (
    <section className={styles.sWrapper}>
      <div className={styles.searchBar}>
        <div className={styles.inputContainer}>
          <FaMapMarkerAlt className={styles.icon} />
          <input
            type="text"
            placeholder="Nhập địa chỉ của bạn"
            value={place}
            onChange={handlePlaceChange}
          />
          {suggestions.length > 0 && (
            <ul className={styles.suggestions}>
              {suggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                  <FaMapMarkerAlt className={styles.locationIcon} />
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.inputContainer}>
          <FaCalendarAlt className={styles.icon} />
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            dateFormat="Pp"
          />
        </div>

        <div className={styles.inputContainer}>
          <FaCalendarAlt className={styles.icon} />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            dateFormat="Pp"
          />
        </div>

        <button className={styles.searchButton} onClick={handleSearch}>
          Tìm Kiếm
        </button>
      </div>
    </section>
  );
};

export default SearchBar;
