import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Sidebar from "../src/components/UI/siderBar";
import CarItem from "../src/components/UI/CarItem";
import SearchBar from "../src/components/SearchBar/SearchBar";
import { useLocation } from "react-router-dom";

const CarListing = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filters, setFilters] = useState({ type: "", capacity: 0, priceRange: [0, 10000000] });
  const [sortOrder, setSortOrder] = useState("");
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const place = queryParams.get("location");  
    const startDate = queryParams.get("startDate");
    const endDate = queryParams.get("endDate");
    
    const fetchCars = async () => {
      try {
        const url = place
          ? "http://localhost:3000/searching/cars-by-location"
          : "http://localhost:3000/searching/cars";

        const options = place
          ? {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ address: place, startDate, endDate }),
            }
          : { method: "GET" };

        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }

        const data = await response.json();

        // Nếu dữ liệu trả về trực tiếp là mảng
        const carsData = Array.isArray(data) ? data : data.data || [];
        const validCars = carsData.filter((car) => car && car.carID && car.overview);

        setCars(validCars);
        setFilteredCars(validCars);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu xe:", error);
        setFilteredCars([]); // Xóa danh sách xe nếu lỗi
      }
    };

    fetchCars();
  }, [location.search])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);

    let filtered = [...cars];

    if (newFilters.type) {
      filtered = filtered.filter(car => car.overview.type === newFilters.type);
    }

    if (newFilters.capacity) {
      filtered = filtered.filter(car => car.overview.seats >= newFilters.capacity);
    }

    if (newFilters.priceRange) {
      const [min, max] = newFilters.priceRange;
      filtered = filtered.filter(
        (car) => parseFloat(car.overview.pricePerDay) >= min && parseFloat(car.overview.pricePerDay) <= max
      );
    }

    setFilteredCars(filtered);
  };


  const handleSortChange = (event) => {
    const order = event.target.value;
    setSortOrder(order);

    const sorted = [...filteredCars].sort((a, b) => {
      const priceA = parseFloat(a.overview.pricePerDay);
      const priceB = parseFloat(b.overview.pricePerDay);

      if (isNaN(priceA) || isNaN(priceB)) return 0;  

      return order === "low"
        ? priceA - priceB
        : priceB - priceA;
    });

    setFilteredCars(sorted);
  };

  return (
    <section>
      <Container>
        <Row className="mb-5">
          <Col lg="12">
            <SearchBar onSearch={(data) => setFilteredCars(data)} />
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
                <option value="low">Giá: Từ thấp đến cao</option>
                <option value="high">Giá: Từ cao đến thấp</option>
              </select>
            </div>

            <Row>
              {filteredCars.length > 0 ? (
                filteredCars.map((car) => (
                  car.carID ? (
                    <Col lg="3" md="6" sm="6" key={car.carID}>
                      <CarItem
                        item={{
                          id: car.carID,
                          carName: car.overview.model,
                          price: parseFloat(car.overview.pricePerDay),
                          description: car.overview.description,
                          images: car.carImages.map((img) => img.imageUrl),
                          seats: car.overview.seats,
                          transmission: car.overview.transmission,
                          fuelType: car.overview.fuelType,
                          address: car.overview.address,
                          delivery: car.delivery,
                          isAvailable: car.isAvailable,
                          selfPickUp: car.selfPickUp,
                        }}
                      />
                    </Col>
                  ) : (
                    <p key={Math.random()} style={{ textAlign: "center", width: "100%" }}>
                      Không tìm thấy thông tin xe
                    </p>
                  )
                ))
              ) : (
                <p style={{ textAlign: "center", width: "100%" }}>Không có xe được tìm thấy</p>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CarListing;
