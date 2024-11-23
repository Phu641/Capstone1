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
    const startDate = new Date(queryParams.get("startDate"));
    const endDate = new Date(queryParams.get("endDate"));

    const fetchCars = async () => {
      try {
        let url = "http://localhost:3000/searching/cars";
        if (place) {
          url = "http://localhost:3000/searching/cars-by-location";
        }

        const response = await fetch(url, {
          method: place ? "POST" : "GET",
          headers: { "Content-Type": "application/json" },
          body: place ? JSON.stringify({ address: place }) : undefined,
        });

        if (!response.ok) {
          setFilteredCars([]);
          return;
        }

        const data = await response.json();
        setCars(data);
        setFilteredCars(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu xe:", error);
      }
    };

    fetchCars();
  }, [location.search]);  // Chạy lại khi có thay đổi ở location.search (tìm kiếm)

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);

    let filtered = [...cars];  // Sử dụng danh sách tất cả các xe để lọc
    if (newFilters.type) {
      filtered = filtered.filter((car) => car.overview.type === newFilters.type);
    }

    if (newFilters.capacity) {
      filtered = filtered.filter((car) => car.overview.seats >= newFilters.capacity);
    }

    if (newFilters.priceRange) {
      const [min, max] = newFilters.priceRange;
      filtered = filtered.filter(
        (car) => car.overview.pricePerDay >= min && car.overview.pricePerDay <= max
      );
    }

    setFilteredCars(filtered);
  };

  const handleSortChange = (event) => {
    const order = event.target.value;
    setSortOrder(order);

    const sorted = [...filteredCars].sort((a, b) =>
      order === "low"
        ? a.overview.pricePerDay - b.overview.pricePerDay
        : b.overview.pricePerDay - a.overview.pricePerDay
    );

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
                <option value="low">Thấp đến cao</option>
                <option value="high">Cao đến thấp</option>
              </select>
            </div>

            <Row>
              {filteredCars.length > 0 ? (
                filteredCars.map((car) => (
                  // Kiểm tra nếu carID tồn tại
                  car.carID ? (
                    <Col lg="4" md="6" sm="6" key={car.carID}>
                      <CarItem
                        item={{
                          id: car.carID,
                          carName: car.overview.model,
                          price: car.overview.pricePerDay,
                          description: car.overview.description,
                          images: car.carImages.map((img) => img.imageUrl),
                          seats: car.overview.seats,
                          transmission: car.overview.transmission,
                          fuelType: car.overview.fuelType,
                          address: car.overview.address,
                        }}
                      />
                    </Col>
                  ) : (
                    // Xử lý trường hợp không có carID
                    <p key={Math.random()} style={{ textAlign: "center", width: "100%" }}>
                      Không tìm thấy thông tin xe.
                    </p>
                  )
                ))
              ) : (
                <p style={{ textAlign: "center", width: "100%" }}>Không tìm thấy xe phù hợp.</p>
              )}
            </Row>

          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CarListing;
