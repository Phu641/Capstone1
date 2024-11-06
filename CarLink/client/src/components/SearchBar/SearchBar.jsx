import React, { useState } from "react";
import styles from "./SearchBar.module.css";
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
          Tìm kiếm
        </button>
      </div>
    </section>
  );
};

export default SearchBar;
