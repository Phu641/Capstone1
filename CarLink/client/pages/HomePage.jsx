import React from 'react';
import Header from '../src/components/Header/Header.jsx';
import Slider from '../src/components/Slider/Slider.jsx';
import Property from '../src/components/Property/Property.jsx';
//import Footer from '../src/components/Footer/Footer.jsx';

const HomePage = () => {

    return (
    <div className="App">
      <div>
        <div className="white-gradient"/>
        <Slider/>
        {/* <PropertyCard/> */}
        <Property/>
        {/* <Footer/> */}
      </div>
      {/* <Companies/>
      <Residences/>
      <Value/>
      <Contact/>
      <GetStarted/> */}
      {/* <Footer/> */}
    </div>
    );

}

export default HomePage;