import { useState } from "react";
import "./Fieldset.module.css";

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
    <fieldset className="uploadFieldset">
      <legend className="legend">Đăng tải hình ảnh về xe của bạn</legend>
      <div className="photoUploadContainer">
        {images.map((image, index) => (
          <div className="uploadBox" key={index}>
            {image ? (
              <img
                src={image}
                alt={`upload-${index}`}
                className="uploadedImage"
              />
            ) : (
              <label className="uploadLabel" htmlFor={`upload-${index}`}>
                Thêm ảnh
                <input
                  type="file"
                  id={`upload-${index}`}
                  className="fileInput"
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
