import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Sidebar from "../src/components/UI/siderBar";
import CarItem from "../src/components/UI/CarItem";
import SeachBar from "../src/components/SearchBar/SearchBar";

const CarListing = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [filters, setFilters] = useState({
    type: "",
    capacity: 0,
    priceRange: [0, 10000000],
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:3000/searching/cars");
        const data = await response.json();
        setCars(data);
        setFilteredCars(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu xe:", error);
      }
    };

    fetchCars();
  }, []);

  const handleSortChange = (event) => {
    const order = event.target.value;
    setSortOrder(order);

    // Sắp xếp theo giá
    const sortedCars = [...filteredCars].sort((a, b) => {
      if (order === "low") return a.overview.pricePerDay - b.overview.pricePerDay;
      if (order === "high") return b.overview.pricePerDay - a.overview.pricePerDay;
      return 0;
    });

    setFilteredCars(sortedCars);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (filters) => {
    let filtered = [...cars];

    // Lọc theo loại xe
    if (filters.type) {
      filtered = filtered.filter(car => car.overview.type === filters.type);
    }

    // Lọc theo sức chứa
    if (filters.capacity) {
      filtered = filtered.filter(car => car.overview.seats === filters.capacity);
    }

    // Lọc theo giá
    filtered = filtered.filter(
      (car) => car.overview.pricePerDay >= filters.priceRange[0] && car.overview.pricePerDay <= filters.priceRange[1]
    );

    setFilteredCars(filtered);
  };

  return (
    <section>
      <Container>
        <Row className="mb-5">
          <Col lg="12">
            <SeachBar />
          </Col>
        </Row>

        <Row>
          <Col lg="3" md="4" className="sidebar-col">
            <Sidebar onFilterChange={handleFilterChange} />
          </Col>

          <Col lg="9" md="8">
            <div className="d-flex align-items-center gap-3 mb-5">
              <span className="d-flex align-items-center gap-2">
                <i className="ri-sort-asc"></i> Sắp xếp
              </span>
              <select onChange={handleSortChange} value={sortOrder}>
                <option value="">Chọn</option>
                <option value="low">Thấp đến cao</option>
                <option value="high">Cao đến thấp</option>
              </select>
            </div>

            <Row>
              {Array.isArray(filteredCars) ? (
                filteredCars.map((car) => (
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
                ))
              ) : (
                <p>Không có xe nào</p>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CarListing;
