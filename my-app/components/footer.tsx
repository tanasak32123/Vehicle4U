import Link from "next/link";
import styles from "../styles/footer.module.css";
import { Container, Col, Row } from "react-bootstrap";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <Container className="py-4">
        <Row>
          <Col sm={12} lg={4} style={{ borderRight: "1px solid black" }}>
            <div>
              <h4>
                <b>VEHICLE4U</b>
              </h4>
              <small className="mb-0">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
                cupiditate?
              </small>
              <br />
              <small>@ Copyright</small>
            </div>
          </Col>
          <Col sm={12} lg={4} style={{ borderRight: "1px solid black" }}>
            <h4>
              <b>เมนู</b>
            </h4>
            <ul style={{ paddingLeft: "20px" }}>
              <li>
                <Link href="#" className={`${styles.link}`}>
                  <small>เกี่ยวกับเรา</small>
                </Link>
              </li>
            </ul>
          </Col>
          <Col sm={12} lg={4}>
            <h4>
              <b>ติดต่อเรา</b>
            </h4>
            <ul style={{ listStyleType: "none" }} className="p-0">
              <li>
                <small>
                  <b>เบอร์โทร</b>: 081-831-8928
                </small>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
