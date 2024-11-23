import { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import "./Fieldset.module.css";

const Fieldset = ({ onImagesChange }) => {
  const [images, setImages] = useState([null, null, null, null, null]);

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = file;
      setImages(updatedImages);
      
      const validImages = updatedImages.filter(img => img !== null);
      onImagesChange(validImages);
    }
  };

  return (
    <fieldset className="upload-fieldset">
      <legend>Đăng tải hình ảnh về xe của bạn</legend>
      <div className="photo-upload-container">
        {images.map((image, index) => (
          <div className="upload-box" key={index}>
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt={`upload-${index}`}
                className="uploaded-image"
              />
            ) : (
              <label className="upload-label" htmlFor={`upload-${index}`}>
                Thêm ảnh
                <input
                  type="file"
                  id={`upload-${index}`}
                  className="file-input"
                  onChange={(e) => handleImageUpload(e, index)}
                  accept="image/*"
                  name="images"
                />
              </label>
            )}
          </div>
        ))}
      </div>
      <p className="warning">*Bạn phải thêm ít nhất một ảnh</p>
    </fieldset>
  );
};

// PropTypes validation
Fieldset.propTypes = {
  onImagesChange: PropTypes.func.isRequired, // Ensures onImagesChange is a required function
};

export default Fieldset;