import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Fieldset.module.css";

const Fieldset = ({ onImagesChange }) => {
  const [images, setImages] = useState([null, null, null, null, null]);

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = file;
      setImages(updatedImages);
    }
  };

  useEffect(() => {
    const validImages = images.filter((img) => img !== null);
    onImagesChange(validImages);
  }, [images, onImagesChange]);

  return (
    <fieldset className={styles.uploadFieldset}>
      <legend className={styles.legend}>Đăng tải hình ảnh về xe của bạn</legend>
      <div className={styles.photoUploadContainer}>
        {images.map((image, index) => (
          <div className={styles.uploadBox} key={index}>
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt={`upload-${index}`}
                className={styles.uploadedImage}
              />
            ) : (
              <label className={styles.uploadLabel} htmlFor={`upload-${index}`}>
                Thêm ảnh
                <input
                  type="file"
                  id={`upload-${index}`}
                  className={styles.fileInput}
                  onChange={(e) => handleImageUpload(e, index)}
                  accept="image/*"
                />
              </label>
            )}
          </div>
        ))}
      </div>
      <p className={styles.warning}>*Bạn phải thêm ít nhất một ảnh và 1 video</p>
    </fieldset>
  );
};

Fieldset.propTypes = {
  onImagesChange: PropTypes.func.isRequired,
};

export default Fieldset;
