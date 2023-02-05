import Link from "next/link";
import styles from "../styles/footer.module.css";
import { Container, Col, Row } from "react-bootstrap";
import Image from "next/image";
import linePic from "../img/line.png";
import instragramPic from "../img/instragram.png";
import facebookPic from "../img/facebook.png";
import phonePic from "../img/phone.png";

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

              <Link href="/" className={`${styles.link}`}>
                <small>สมัครอย่างไร</small>
              </Link>
              <br />
              <Link href="/" className={`${styles.link}`}>
                <small>ผู้ปล่อยเช่าต้องเตรียมอะไรบ้าง</small>
              </Link>
              <br />
              <Link href="/" className={`${styles.link}`}>
                <small>ช่องทางการชำระเงินใน Vehicle4U</small>
              </Link>
              <br />
            </div>
          </Col>
          <Col sm={12} lg={4} style={{ borderRight: "1px solid black" }}>
            <h4>
              <b>เกี่ยวกับ </b>
              <b>
                <font color="545a8b">VEHICLE4U</font>
              </b>
            </h4>
            <ul style={{ paddingLeft: "20px" }}>
              <li>
                <Link href="/about" className={`${styles.link}`}>
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
                  <Image
                    src={phonePic}
                    alt="Picture of the author"
                    width={30}
                    height={30}
                    priority
                  />
                  : 081-831-8928
                </small>
                <br />
                <br />
                <div>
                  <a href="/">
                    <Image
                      src={facebookPic}
                      alt="Picture of the author"
                      width={42}
                      height={42}
                      priority
                    />
                  </a>
                  <a href="/">
                    <Image
                      src={instragramPic}
                      alt="Picture of the author"
                      width={40}
                      height={40}
                      priority
                    />
                  </a>

                  <a className="pl-4" href="/">
                    <Image
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
          </Col>
        </Row>
      </Container>
    </div>
  );
}
