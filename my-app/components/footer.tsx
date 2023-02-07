import Link from "next/link";
import styles from "../styles/footer.module.css";
import { Container, Col, Row } from "react-bootstrap";
import Image from "next/image";
import linePic from "../public/line.png";
import instragramPic from "../public/instragram.png";
import facebookPic from "../public/facebook.png";
import phonePic from "../public/phone.png";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <Container className="py-4">
        <Row>
          <Col sm={12} lg={4} style={{ borderRight: "1px solid black" }}>
            <div>
              <h4>
                <b>ศูนย์ความช่วยเหลือ</b>
              </h4>
              <div className={styles.footer_info}>
                <ul style={{ paddingLeft: "20px" }}>
                  <li>
                    <Link href="/" className={`${styles.link}`}>
                      <small>สมัครอย่างไร</small>
                    </Link>
                  </li>
                </ul>

                <ul style={{ paddingLeft: "20px" }}>
                  <li>
                    <Link href="/" className={`${styles.link}`}>
                      <small>ผู้ปล่อยเช่าต้องเตรียมอะไรบ้าง</small>
                    </Link>
                  </li>
                </ul>

                <ul style={{ paddingLeft: "20px" }}>
                  <li>
                    <Link href="/about" className={`${styles.link}`}>
                      <small>ช่องทางการชำระเงินใน Vehicle4U</small>
                    </Link>
                  </li>
                </ul>
                <br />
              </div>
            </div>
          </Col>
          <Col sm={12} lg={4} style={{ borderRight: "1px solid black" }}>
            <h4>
              <b>เกี่ยวกับ </b>
              <b>
                <font color="545a8b">VEHICLE4U</font>
              </b>
            </h4>
            <div className={styles.footer_info}>
              <ul style={{ paddingLeft: "20px" }}>
                <li>
                  <Link href="/about" className={`${styles.link}`}>
                    <small>เกี่ยวกับเรา</small>
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col sm={12} lg={4}>
            <h4>
              <b>ติดต่อเรา</b>
            </h4>
            <div className={styles.footer_info}>
              <ul style={{ listStyleType: "none" }} className="p-0">
                <li>
                  <small>
                    <Image
                      className="me-2"
                      src={phonePic}
                      alt="Picture of the author"
                      width={30}
                      height={30}
                      priority
                    />
                    : 081-831-8928
                  </small>

                  <br />

                  <div className="mt-3">
                    <a href="/">
                      <Image
                        className="me-3"
                        src={facebookPic}
                        alt="Picture of the author"
                        width={42}
                        height={42}
                        priority
                      />
                    </a>
                    <a href="/">
                      <Image
                        className="me-3"
                        src={instragramPic}
                        alt="Picture of the author"
                        width={40}
                        height={40}
                        priority
                      />
                    </a>

                    <a href="/">
                      <Image
                        className="me-3"
                        src={linePic}
                        alt="Picture of the author"
                        width={43}
                        height={43}
                        priority
                      />
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
