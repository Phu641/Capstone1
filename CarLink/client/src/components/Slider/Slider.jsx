import React from "react";
import styles from "./Slider.module.css";
import SearchBar from "../SearchBar/SearchBar";
import backgroundImage from '/background.png';

const Slider = () => {

  return (
    <section className={styles.sliderWrapper}>
        <div className={styles.sliderContainer}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          height: '800px',
          
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        >

       <div className={styles.paddings}>
          <SearchBar/>
       </div>
    </div>
    </section>
  );
};

export default Slider;