// Data
import storeItems from "../data/items.json";
// Bootstrap
import { Col, Row } from "react-bootstrap";
// Components
import { StoreItem } from "../components/StoreItem";

export function Store() {
  return (
    <>
      <Row
        md={2}
        xs={1}
        lg={3}
        className="g-3"
      >
        {storeItems.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}
