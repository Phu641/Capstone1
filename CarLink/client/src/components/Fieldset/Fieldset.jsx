// import { useState } from "react";
// import "./Fieldset.module.css";

// const Fieldset = () => {
//   const [images, setImages] = useState([null, null, null, null, null]);

//   const handleImageUpload = (e, index) => {
//     const file = e.target.files[0];
//     if (file) {
//       const updatedImages = [...images];
//       updatedImages[index] = URL.createObjectURL(file);
//       setImages(updatedImages);
//     }
//   };

//   return (
//     <fieldset className="uploadFieldset">
//       <legend className="legend">Đăng tải hình ảnh về xe của bạn</legend>
//       <div className="photoUploadContainer">
//         {images.map((image, index) => (
//           <div className="uploadBox" key={index}>
//             {image ? (
//               <img
//                 src={image}
//                 alt={`upload-${index}`}
//                 className="uploadedImage"
//               />
//             ) : (
//               <label className="uploadLabel" htmlFor={`upload-${index}`}>
//                 Thêm ảnh
//                 <input
//                   type="file"
//                   id={`upload-${index}`}
//                   className="fileInput"
//                   onChange={(e) => handleImageUpload(e, index)}
//                   accept="image/*"
//                 />
//               </label>
//             )}
//           </div>
//         ))}
//       </div>
//       <p className="warning">*Bạn phải thêm ít nhất một ảnh</p>
//     </fieldset>
//   );
// };

// export default Fieldset;


import { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import "./Fieldset.module.css";

const Fieldset = ({ onImagesChange }) => {
  const [images, setImages] = useState([null, null, null, null, null]);

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = file; // Store the actual file, not the preview URL
      setImages(updatedImages);
    }
  };

  useEffect(() => {
    // Pass the selected images back to the parent form
    const validImages = images.filter((img) => img !== null);
    onImagesChange(validImages);
  }, [images, onImagesChange]);

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