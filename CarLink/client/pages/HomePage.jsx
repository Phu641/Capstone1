import React from 'react';
import Header from '../src/components/Header/Header.jsx';
import Slider from '../src/components/Slider/Slider.jsx';
//import Footer from '../src/components/Footer/Footer.jsx';

const HomePage = () => {

    return (
    <div className="App">
      <div>
        <div className="white-gradient"/>
        <Slider/>
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