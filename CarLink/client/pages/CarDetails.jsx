import { useEffect, useState } from "react";

import carData from "../src/assets/data/carData.js";
import { Container, Row, Col } from "reactstrap";
// import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import BookingForm from "../src/components/UI/BookingForm";
import PaymentMethod from "../src/components/UI/PaymentMethod";
import PickupDropbox from "../src/components/UI/pickupAndDropoff";

const CarDetails = () => {
  const { slug } = useParams();
  const singleCarItem = carData.find((item) => item.carName === slug);

  const [currentImage, setCurrentImage] = useState(singleCarItem?.imgUrl);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [singleCarItem]);

  const handleImageClick = (img) => {
    setCurrentImage(img);
  };

  return (
    <section>
      <Container>
        <Row className="mb-5">
          <Col lg="12">
            <PickupDropbox />
          </Col>
        </Row>
        <Row>
          <Col lg="6">
            <img
              src={currentImage}
              alt={singleCarItem.carName}
              className="w-100"
            />
            <div className="image-thumbnails d-flex mt-2">
              {[singleCarItem.imgUrl, ...(singleCarItem.images || [])].map(
                (img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index}`}
                    className="thumbnail"
                    onClick={() => handleImageClick(img)}
                    style={{
                      cursor: "pointer",
                      width: "100px",
                      marginRight: "10px",
                    }}
                  />
                )
              )}
            </div>
          </Col>

          <Col lg="6">
            <div className="car__info">
              <h2 className="section__title">{singleCarItem.carName}</h2>
              <div className="d-flex align-items-center gap-5 mb-4 mt-3">
                <h6 className="rent__price fw-bold fs-4">
                  ${singleCarItem.price}.00 / Day
                </h6>
                <span className="d-flex align-items-center gap-2">
                  <span style={{ color: "#f9a826" }}>
                    <i className="ri-star-s-fill"></i>
                    <i className="ri-star-s-fill"></i>
                    <i className="ri-star-s-fill"></i>
                    <i className="ri-star-s-fill"></i>
                    <i className="ri-star-s-fill"></i>
                  </span>
                  ({singleCarItem.rating} ratings)
                </span>
              </div>

              <p className="section__description">
                {singleCarItem.description}
              </p>

              <div
                className="d-flex align-items-center mt-3"
                style={{ columnGap: "4rem" }}
              >
                <span className="d-flex align-items-center gap-1 section__description">
                  <i
                    className="ri-roadster-line"
                    style={{ color: "#f9a826" }}
                  ></i>{" "}
                  {singleCarItem.model}
                </span>
                <span className="d-flex align-items-center gap-1 section__description">
                  <i
                    className="ri-settings-2-line"
                    style={{ color: "#f9a826" }}
                  ></i>{" "}
                  {singleCarItem.automatic}
                </span>
                <span className="d-flex align-items-center gap-1 section__description">
                  <i
                    className="ri-timer-flash-line"
                    style={{ color: "#f9a826" }}
                  ></i>{" "}
                  {singleCarItem.speed}
                </span>
              </div>

              <div
                className="d-flex align-items-center mt-3"
                style={{ columnGap: "2.8rem" }}
              >
                <span className="d-flex align-items-center gap-1 section__description">
                  <i
                    className="ri-map-pin-line"
                    style={{ color: "#f9a826" }}
                  ></i>{" "}
                  {singleCarItem.gps}
                </span>
                <span className="d-flex align-items-center gap-1 section__description">
                  <i
                    className="ri-wheelchair-line"
                    style={{ color: "#f9a826" }}
                  ></i>{" "}
                  {singleCarItem.seatType}
                </span>
                <span className="d-flex align-items-center gap-1 section__description">
                  <i
                    className="ri-building-2-line"
                    style={{ color: "#f9a826" }}
                  ></i>{" "}
                  {singleCarItem.brand}
                </span>
              </div>
            </div>
          </Col>

          <Col lg="7" className="mt-1">
            <div className="booking-info mt-5">
              <h5 className="mb-4 fw-bold">Booking Information</h5>
              <BookingForm />
            </div>
          </Col>

          <Col lg="5" className="mt-1">
            <div className="payment__info mt-5">
              <h5 className="mb-4 fw-bold">Payment Information</h5>
              <PaymentMethod />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CarDetails;
