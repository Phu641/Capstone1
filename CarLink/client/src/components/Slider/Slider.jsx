import React from "react";
import "./Slider.css";
import SearchBar from "../SearchBar/SearchBar";
import backgroundImage from '/background.png';

const Slider = () => {

  return (
    <section className="slider-wrapper">
        <div className="slider-container"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          height: '800px',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        >

       <div className="paddings search-component">
          <SearchBar/>
       </div>
    </div>
    </section>
  );
};

export default Slider;