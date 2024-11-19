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
