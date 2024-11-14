// // import React, { useState } from "react";
// // import styles from "./SearchBar.module.css";
// // import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa"; // Icon
// // import DatePicker from "react-datepicker"; // Import DatePicker
// // import "react-datepicker/dist/react-datepicker.css"; // Import CSS cho DatePicker

// // const SearchBar = () => {
// //   const [place, setPlace] = useState("");
// //   const [startDate, setStartDate] = useState(new Date()); // Khởi tạo ngày mặc định cho startDate
// //   const [endDate, setEndDate] = useState(new Date()); // Khởi tạo ngày mặc định cho endDate

// //   const handlePlaceChange = (e) => {
// //     setPlace(e.target.value);
// //   };

// //   const handleSearch = () => {
// //     console.log(`Searching for ${place} from ${startDate} to ${endDate}`);
// //   };

// //   return (
// //     <section className={styles.sWrapper}>
// //       <div className={styles.searchBar}>
// //         <div className={styles.inputContainer}>
// //           <FaMapMarkerAlt className={styles.icon} />
// //           <input
// //             type="text"
// //             placeholder="Nhập địa chỉ của bạn"
// //             value={place}
// //             onChange={handlePlaceChange}
// //           />
// //         </div>

// //         <div className={styles.inputContainer}>
// //           <FaCalendarAlt className={styles.icon} />
// //           <DatePicker
// //             selected={startDate}
// //             onChange={(date) => setStartDate(date)}
// //             showTimeSelect
// //             dateFormat="Pp"
// //           />
// //         </div>

// //         <div className={styles.inputContainer}>
// //           <FaCalendarAlt className={styles.icon} />
// //           <DatePicker
// //             selected={endDate}
// //             onChange={(date) => setEndDate(date)}
// //             showTimeSelect
// //             dateFormat="Pp"
// //           />
// //         </div>

// //         <button className={styles.searchButton} onClick={handleSearch}>
// //           Tìm kiếm
// //         </button>
// //       </div>
// //     </section>
// //   );
// // };

// // export default SearchBar;

// import React, { useState } from "react";
// import styles from "./SearchBar.module.css";
// import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import locations from "./location.json"; // Đường dẫn đến file locations.json

// const SearchBar = () => {
//   const [place, setPlace] = useState("");
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [suggestions, setSuggestions] = useState([]); // Danh sách gợi ý

//   const handlePlaceChange = (e) => {
//     const value = e.target.value;
//     setPlace(value);

//     // Lọc gợi ý từ danh sách địa điểm dựa trên giá trị người dùng nhập
//     if (value.length > 2) {
//       const filteredSuggestions = locations.filter((location) =>
//         location.name.toLowerCase().includes(value.toLowerCase())
//       );
//       setSuggestions(filteredSuggestions);
//     } else {
//       setSuggestions([]);
//     }
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setPlace(suggestion.name);
//     setSuggestions([]); // Ẩn gợi ý sau khi chọn
//   };

//   const handleSearch = () => {
//     console.log(`Searching for ${place} from ${startDate} to ${endDate}`);
//     // Thực hiện logic tìm kiếm tại đây
//   };

//   return (
//     <section className={styles.sWrapper}>
//       <div className={styles.searchBar}>
//         <div className={styles.inputContainer}>
//           <FaMapMarkerAlt className={styles.icon} />
//           <input
//             type="text"
//             placeholder="Nhập địa chỉ của bạn"
//             value={place}
//             onChange={handlePlaceChange}
//           />
//           {/* Hiển thị danh sách gợi ý */}
//           {suggestions.length > 0 && (
//             <ul className={styles.suggestions}>
//               {suggestions.map((suggestion, index) => (
//                 <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
//                   {suggestion.name}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <div className={styles.inputContainer}>
//           <FaCalendarAlt className={styles.icon} />
//           <DatePicker
//             selected={startDate}
//             onChange={(date) => setStartDate(date)}
//             showTimeSelect
//             dateFormat="Pp"
//           />
//         </div>

//         <div className={styles.inputContainer}>
//           <FaCalendarAlt className={styles.icon} />
//           <DatePicker
//             selected={endDate}
//             onChange={(date) => setEndDate(date)}
//             showTimeSelect
//             dateFormat="Pp"
//           />
//         </div>

//         <button className={styles.searchButton} onClick={handleSearch}>
//           Tìm kiếm
//         </button>
//       </div>
//     </section>
//   );
// };

// export default SearchBar;


import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import locations from "./location.json";

const SearchBar = () => {
  const [place, setPlace] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [suggestions, setSuggestions] = useState([]);

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
          Tìm kiếm
        </button>
      </div>
    </section>
  );
};

export default SearchBar;

