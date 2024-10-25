import { useState } from "react";
import "./Fieldset.css";

const Fieldset = () => {
  const [images, setImages] = useState([null, null, null, null, null]);

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = URL.createObjectURL(file);
      setImages(updatedImages);
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
                src={image}
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

export default Fieldset;
