import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import CarItem from "../UI/CarItem";

const Favorite = () => {
    const [favoriteCars, setFavoriteCars] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchFavoriteCars = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            setIsAuthenticated(true);

            try {
                const response = await axios.get(
                    "http://localhost:3000/customer/cars-favorite",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setFavoriteCars(response.data || []);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách xe yêu thích:", error);
                toast.error("Không thể tải danh sách yêu thích!");
            }
        };

        fetchFavoriteCars();
    }, []);

    return (
        <Container>
            <Row>
                <Col lg="12" className="text-center mb-5">
                    <h1>Danh sách xe yêu thích</h1>
                </Col>
            </Row>
            <Row>
                {isAuthenticated ? (
                    favoriteCars.length > 0 ? (
                        favoriteCars.map((car) => {
                            // Kiểm tra nếu carID tồn tại
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
                                // Xử lý trường hợp không có carID
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
                            <Link style={{ textDecoration: "underline"}} to="/login">Đăng Nhập</Link> để xem danh sách xe yêu thích.
                        </p>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default Favorite;
