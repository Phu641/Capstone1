// import { Container, Row, Col } from "reactstrap";
import { Container, Row, Col } from "reactstrap";
import carData from "../src/assets/data/carData.js";
// import PickupDropbox from "../src/components/UI/pickupAndDropoff";
import Sidebar from "../src/components/UI/siderBar";
import CarItem from "../src/components/UI/CarItem";
import SeachBar from "../src/components/SearchBar/SearchBar";
const CarListing = () => {
  return (
    <section>
      <Container>
        {/* Pickup and Drop-off */}
        <Row className="mb-5">
          <Col lg="12">
            {/* <PickupDropbox />  */}
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
                <i className="ri-sort-asc"></i> Sort By
              </span>
              <select>
                <option>Select</option>
                <option value="low">Low to High</option>
                <option value="high">High to Low</option>
              </select>
            </div>

            <Row>
              {carData.map((item) => (
                <CarItem item={item} key={item.id} />
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CarListing;
