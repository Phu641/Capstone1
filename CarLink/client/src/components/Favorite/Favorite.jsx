import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import CarItem from "../UI/CarItem";
import Sidebar from "../UI/siderBar"; // Import Sidebar

const Favorite = () => {
  const [favoriteCars, setFavoriteCars] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filters, setFilters] = useState({ type: "", capacity: 0, priceRange: [0, 10000000] });
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const fetchFavoriteCars = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      setIsAuthenticated(true);

      try {
        const response = await axios.get("http://localhost:3000/customer/cars-favorite", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavoriteCars(response.data || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách xe yêu thích:", error);
        toast.error("Không thể tải danh sách yêu thích!");
      }
    };

    fetchFavoriteCars();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);

    let filtered = [...favoriteCars];
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

    setFavoriteCars(filtered);
  };

  const handleSortChange = (event) => {
    const order = event.target.value;
    setSortOrder(order);

    const sorted = [...favoriteCars].sort((a, b) =>
      order === "low"
        ? a.overview.pricePerDay - b.overview.pricePerDay
        : b.overview.pricePerDay - a.overview.pricePerDay
    );

    setFavoriteCars(sorted);
  };

  return (
    <Container>
      <Row>
        <Col lg="12" className="text-center mb-5">
          <h1>Danh sách xe yêu thích</h1>
        </Col>
      </Row>

      <Row>
        <Col lg="3" md="4">
          {/* Thêm Sidebar */}
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
            {isAuthenticated ? (
              favoriteCars.length > 0 ? (
                favoriteCars.map((car) => {
                  return car.carID ? (
                    <Col lg="4" md="6" sm="6" key={car.carID}>
                      <CarItem
                        item={{
                          id: car.carID,
                          carName: car.overview.model,
                          price: car.overview.pricePerDay,
                          description: car.overview.description,
                          images: car.carImages.map((image) => image.imageUrl),
                          seats: car.overview.seats,
                          transmission: car.overview.transmission,
                          fuelType: car.overview.fuelType,
                          address: car.overview.address,
                        }}
                      />
                    </Col>
                  ) : (
                    <p key={Math.random()} style={{ textAlign: "center", width: "100%" }}>
                      Không tìm thấy thông tin xe.
                    </p>
                  );
                })
              ) : (
                <Col lg="12" className="text-center">
                  <p>Không có xe nào trong danh sách yêu thích.</p>
                </Col>
              )
            ) : (
              <Col lg="12" className="text-center">
                <p>
                  Vui lòng{" "}
                  <Link style={{ textDecoration: "underline" }} to="/login">
                    Đăng Nhập
                  </Link>{" "}
                  để xem danh sách xe yêu thích.
                </p>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Favorite;
