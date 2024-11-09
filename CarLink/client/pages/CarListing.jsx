  import React, { useEffect, useState } from "react";
  import { Container, Row, Col } from "reactstrap";
  import Sidebar from "../src/components/UI/siderBar";
  import CarItem from "../src/components/UI/CarItem";
  import SeachBar from "../src/components/SearchBar/SearchBar";

  const CarListing = () => {
      const [cars, setCars] = useState([]);

      // Gọi API để lấy dữ liệu xe
      useEffect(() => {
          const fetchCars = async () => {
              try {
                  const response = await fetch("http://localhost:3000/searching/cars");
                  const data = await response.json();
                  setCars(data);
              } catch (error) {
                  console.error("Lỗi khi lấy dữ liệu xe:", error);
              }
          };

          fetchCars();
      }, []);
      return (
          <section>
            <Container>
              {/* Pickup and Drop-off */}
              <Row className="mb-5">
                <Col lg="12">
                  <SeachBar />
                </Col>
              </Row>
      
              <Row>
                {/* Sidebar ở bên trái */}
                <Col lg="3" md="4" className="sidebar-col">
                  <Sidebar />
                </Col>
      
                {/* Phần còn lại cho các CarItem */}
                <Col lg="9" md="8">
                  <div className="d-flex align-items-center gap-3 mb-5">
                    <span className="d-flex align-items-center gap-2">
                      <i className="ri-sort-asc"></i> Sắp xếp
                    </span>
                    <select>
                      <option>Chọn</option>
                      <option value="low">Thấp đến cao</option>
                      <option value="high">Cao đến thấp</option>
                    </select>
                  </div>
      
                  <Row>
                    {cars.map((car) => (
                      <Col lg="4" md="6" sm="6" key={car.carID}>
                        <CarItem
                          item={{
                            id: car.carID,
                            carName: car.overview.model,
                            price: car.overview.pricePerDay,
                            description: car.overview.description,
                            images: car.carImages.map(image => image.imageUrl),
                            seats: car.overview.seats,
                            transmission: car.overview.transmission,
                            fuelType: car.overview.fuelType,
                            address: car.overview.address,
                          }}
                        />
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
      );
  };

  export default CarListing;
