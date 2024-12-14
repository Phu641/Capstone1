import React from "react";
import Slider from "react-slick";
import styles from "./Slider.module.css";
import SearchBar from "../SearchBar/SearchBar";
import image1 from '/background4.png';
import image2 from '/background1.png';
import image3 from '/background2.png';

const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true, 
    speed: 500, 
    slidesToShow: 1, 
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 2000, 
  };

  return (
    <section className={styles.sliderWrapper}>
      <Slider {...settings}>
        {[image1, image2, image3].map((img, index) => (
          <div key={index} className={styles.sliderItem}>
            <div
              className={styles.sliderContainer}
              style={{
                backgroundImage: `url(${img})`,
                height: '500px',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className={styles.paddings}>
                <SearchBar />
                <br />
                <div
                  className="primaryText"
                  style={{
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  HÀNH TRÌNH CỦA BẠN LUÔN CÓ CARLINK ĐỒNG HÀNH!
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default SliderComponent;
