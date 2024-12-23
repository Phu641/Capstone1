import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import CarItem from "../src/components/UI/CarItem";
import Header from '../src/components/Header/Header.jsx';
import Slider from '../src/components/Slider/Slider.jsx';
import Property from '../src/components/Property/Property.jsx';
//import Footer from '../src/components/Footer/Footer.jsx';
import Services from '../src/components/Servicess/Services.jsx';

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:3000/searching/cars");
        if (response.status === 200) {
          const data = response.data.map((car) => ({
            id: car.carID,
            carName: car.overview.model || "Unknown Model",
            price: car.overview.pricePerDay || "N/A",
            description: car.overview.description || "N/A",
            images: car.carImages?.map((img) => img.imageUrl) || ["./default-image.jpg"],
            seats: car.overview.seats || 0,
            transmission: car.overview.transmission || "N/A",
            fuelType: car.overview.fuelType || "N/A",
            address: car.overview.address || "N/A",
            delivery: car.delivery || false,
            isAvailable: car.isAvailable || false,
            selfPickUp: car.selfPickUp || false,
          }));
          setCars(data);
          setFilteredCars(data.slice(0, 8)); // Lấy 8 xe đầu tiên
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);
  return (
    <div className="App">
      <div>
        <div className="white-gradient" />
        <Slider />
        {/* <PropertyCard/> */}
        <Services />
        <section className="car-listing-section">
          <Container>
            <h2 style={{ color: '#333' }} className="section-title text-center mb-1">Danh sách xe nổi bật</h2>
            <Row>
              <a
                href="/Cars"
                style={{
                  cursor: 'pointer',
                  textAlign: 'end',
                  marginTop: '10px',
                  textDecoration: 'underline',
                  color: '#007bff',
                  fontWeight: 'bold'
                }}
              >
                Xem thêm
              </a>
            </Row>
            <Row className="mt-3">
              {filteredCars.length > 0 ? (
                filteredCars.map((car) => (
                  <Col lg="3" md="6" sm="6" key={car.id}>
                    <CarItem item={car} />
                  </Col>
                ))
              ) : (
                <p style={{ textAlign: "center", width: "100%" }}>Không có xe phù hợp.</p>
              )}
            </Row>
          </Container>
        </section>
        <Property />
        {/* <Footer/> */}
      </div>
      {/* <Companies/>
        <Residences/>
        <Value/>
        <Contact/>
        <GetStarted/> */}
      {/* <Footer/> */}
    </div >
  );

}

export default HomePage;