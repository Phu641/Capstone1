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
          <div className="primaryText"
            style={{
              color: "white",
              textAlign: "center"
            }}
          >Hành trình của bạn luôn có CarLink đồng hành!</div>
        </div>
      </div>
    </section>
  );
};

export default Slider;
