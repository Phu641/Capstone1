import React from "react";
import styles from "./Slider.module.css";
import SearchBar from "../SearchBar/SearchBar";
import backgroundImage from '/background4.png';

const Slider = () => {
  return (
    <section className={styles.sliderWrapper}>
      <div
        className={styles.sliderContainer}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          height: '500px',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className={styles.paddings}>
          <SearchBar />
          <br />
          <div className="primaryText"
            style={{
              color: "white",
              textAlign: "center"
            }}
          >HÀNH TRÌNH CỦA BẠN LUÔN CÓ CARLINK ĐỒNG HÀNH!</div>
        </div>
      </div>
    </section>
  );
};

export default Slider;
