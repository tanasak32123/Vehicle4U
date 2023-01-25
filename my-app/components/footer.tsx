import styles from "../styles/footer.module.css";
import { Container, Col, Row } from "react-bootstrap";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <Container className="py-4">
        <Row>
          <Col sm={12} lg={4}>
            <div>
              <h4 className="mb-0">VEHICLE4U</h4>
              <small className="mb-0">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
                cupiditate?
              </small>
              <br />
              <small>@ Copyright</small>
            </div>
          </Col>
          <Col sm={12} lg={4}>
            <h5>Menu</h5>
          </Col>
          <Col sm={12} lg={4}>
            <h5>Contact Us</h5>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
