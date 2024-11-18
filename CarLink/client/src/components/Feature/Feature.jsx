// import { useState } from "react";
// import styles from "./Feature.module.css";

// const Feature = () => {
//   const [selectedFeatures, setSelectedFeatures] = useState([]);

//   const handleCheckboxChange = (event) => {
//     const { name, checked } = event.target;
//     if (checked) {
//       setSelectedFeatures([...selectedFeatures, name]);
//     } else {
//       setSelectedFeatures(
//         selectedFeatures.filter((feature) => feature !== name)
//       );
//     }
//   };

//   return (
//     <div className={styles.featureContainer}>
//       <h2>Các tiện nghi khác</h2>
//       <div className={styles.featureGrid}>
//         <div className={styles.featureSection}>
//           <label>
//             <input
//               type="checkbox"
//               name="map"
//               onChange={handleCheckboxChange}
//             />
//             Bản đồ
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="A/C: Rear"
//               onChange={handleCheckboxChange}
//             />
//             Camera hành trình
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="Backup Camera"
//               onChange={handleCheckboxChange}
//             />
//             Cảnh báo tốc độ
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="Navigation"
//               onChange={handleCheckboxChange}
//             />
//             Lốp dự phòng
//           </label>
//         </div>

//         <div className={styles.featureSection}>
//           <label>
//             <input
//               type="checkbox"
//               name="AM/FM Stereo"
//               onChange={handleCheckboxChange}
//             />
//             Bluetooth
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="CD Player"
//               onChange={handleCheckboxChange}
//             />
//             Camera lùi
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="DVD System"
//               onChange={handleCheckboxChange}
//             />
//             Cửa sổ trời
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="MP3 Player"
//               onChange={handleCheckboxChange}
//             />
//             Màn hình DVD
//           </label>
//         </div>

//         <div className={styles.featureSection}>
//           <label>
//             <input
//               type="checkbox"
//               name="Airbag: Driver"
//               onChange={handleCheckboxChange}
//             />
//             Camera 360
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="Airbag: Passenger"
//               onChange={handleCheckboxChange}
//             />
//             Cảm biến lốp
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="Antilock Brakes"
//               onChange={handleCheckboxChange}
//             />
//             Định vị GPS
//           </label>

//           <label>
//             <input
//               type="checkbox"
//               name="Hands-Free"
//               onChange={handleCheckboxChange}
//             />
//             Hands-Free
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="Fog Lights"
//               onChange={handleCheckboxChange}
//             />
//             Fog Lights
//           </label>
//         </div>

//         <div className={styles.featureSection}>
//           <h3>Windows</h3>
//           <label>
//             <input
//               type="checkbox"
//               name="Power Windows"
//               onChange={handleCheckboxChange}
//             />
//             Power Windows
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="Windows Defroster"
//               onChange={handleCheckboxChange}
//             />
//             Windows Defroster
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="Rear Window"
//               onChange={handleCheckboxChange}
//             />
//             Rear Window
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="Wiper Tinted Glass"
//               onChange={handleCheckboxChange}
//             />
//             Wiper Tinted Glass
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="Sunroof"
//               onChange={handleCheckboxChange}
//             />
//             Sunroof
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="Tow Package"
//               onChange={handleCheckboxChange}
//             />
//             Tow Package
//           </label>
//         </div>

//         <div className={styles.featureSection}>
//           <h3>Seats</h3>
//           <label>
//             <input
//               type="checkbox"
//               name="Bucket Seats"
//               onChange={handleCheckboxChange}
//             />
//             Bucket Seats
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="Heated Seats"
//               onChange={handleCheckboxChange}
//             />
//             Heated Seats
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="Leather Interior"
//               onChange={handleCheckboxChange}
//             />
//             Leather Interior
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="Memory Seats"
//               onChange={handleCheckboxChange}
//             />
//             Memory Seats
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="Power Seats"
//               onChange={handleCheckboxChange}
//             />
//             Power Seats
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="Third Row Seats"
//               onChange={handleCheckboxChange}
//             />
//             Third Row Seats
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Feature;

import styles from "./Feature.module.css";

const Feature = () => {
  const categories = {
    "Tính năng": [
      "Điều hòa: Phía trước",
      "Điều hòa: Phía Sau",
      "Camera lùi",
      "Theo dõi hành trình",
      "Định vị GPS",
      "Khóa cửa điện",
    ],
    "Giải trí": [
      "Radio",
      "Đầu đọc CD",
      "Hệ thống DVD",
      "Đầu đọc MP3",
      "Âm thanh di động",
      "Âm thanh cao cấp",
    ],
    "An toàn": [
      "Túi khí: Tài xế",
      "Túi khí: Hành khách",
      "Hệ thống phanh ABS",
      "Bluetooth",
      "Đàm thoại rảnh tay",
      "Đèn sương mù",
    ],
    "Cửa sổ": [
      "Cửa sổ điện",
      "Hệ thống sấy kính",
      "Kính sau",
      "Cần gạt nước",
      "Kính tối màu",
      "Cửa sổ trời",
    ],
    Ghế: [
      "Ghế đơn",
      "Ghế sưởi",
      "Ghế bọc da",
      "Ghế nhớ vị trí",
      "Ghế điều chỉnh điện",
      "Ghế hàng thứ 3",
    ],
  };

  return (
    <div className={styles.featureContainer}>
      <h2 className={styles.featureTitle}>Các tiện ích khác</h2>
      <div className={styles.featureGrid}>
        {Object.keys(categories).map((category, index) => (
          <div key={index} className={styles.featureCategory}>
            <h3>{category}</h3>
            <ul>
              {categories[category].map((item, idx) => (
                <li key={idx}>
                  <label>
                    <input type="checkbox" /> {item}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feature;
