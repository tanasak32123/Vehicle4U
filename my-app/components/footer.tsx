import Link from "next/link";
import Image from "next/image";

//css
import styles from "styles/components/Footer.module.css";
import { Container, Col, Row } from "react-bootstrap";

export default function Footer() {
  return (
    <div className={`${styles.footer}`}>
      <Container className="py-4">
        <Row>
          <Col sm={12} lg={4}>
            <div>
              <h4>
                <b>ศูนย์ความช่วยเหลือ</b>
              </h4>
              <div className={styles.footer_info}>
                <ul style={{ paddingLeft: "20px" }}>
                  <li>
                    <Link
                      href="/helpcenter#a"
                      className={`${styles.link}`}
                      prefetch={false}
                    >
                      <small>สมัครอย่างไร</small>
                    </Link>
                  </li>
                </ul>

                <ul style={{ paddingLeft: "20px" }}>
                  <li>
                    <Link
                      href="/helpcenter#b"
                      className={`${styles.link}`}
                      prefetch={false}
                    >
                      <small>ผู้ปล่อยเช่าต้องเตรียมอะไรบ้าง</small>
                    </Link>
                  </li>
                </ul>

                <ul style={{ paddingLeft: "20px" }}>
                  <li>
                    <Link
                      href="/helpcenter#c"
                      className={`${styles.link}`}
                      prefetch={false}
                    >
                      <small>ช่องทางการชำระเงินใน Vehicle4U</small>
                    </Link>
                  </li>
                </ul>
                <br />
              </div>
            </div>
          </Col>

          <Col sm={12} lg={4}>
            <div style={{ paddingLeft: "15px" }}>
              <h4>
                <b>เกี่ยวกับ </b>
                <b>
                  <span style={{ color: "#545a8b" }}>VEHICLE4U</span>
                </b>
              </h4>
              <div className={styles.footer_info}>
                <ul style={{ paddingLeft: "20px" }}>
                  <li>
                    <Link
                      href="/about"
                      className={`${styles.link}`}
                      prefetch={false}
                    >
                      <small>เกี่ยวกับเรา</small>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <Col sm={12} lg={4}>
            <div style={{ paddingLeft: "15px" }}>
              <h4>
                <b>ติดต่อเรา</b>
              </h4>
              <div className={styles.footer_info}>
                <ul style={{ listStyleType: "none" }} className="p-0">
                  <li>
                    <div className="d-flex align-items-center">
                      <Image
                        src={`/images/phone.webp`}
                        alt="Picture of the author"
                        width={30}
                        height={30}
                      />
                      <small>&nbsp;&nbsp;: 081-831-8928</small>
                    </div>

                    <div className="mt-3">
                      <Link
                        rel="preload"
                        href="/"
                        className="me-3"
                        prefetch={false}
                      >
                        <Image
                          src={`/images/facebook.webp`}
                          alt="Picture of the author"
                          width={42}
                          height={42}
                        />
                      </Link>
                      <Link
                        rel="preload"
                        href="/"
                        className="me-3"
                        prefetch={false}
                      >
                        <Image
                          src={`/images/instragram.webp`}
                          alt="Picture of the author"
                          width={40}
                          height={40}
                        />
                      </Link>

                      <Link rel="preload" href="/" prefetch={false}>
                        <Image
                          src={`/images/line.webp`}
                          alt="Picture of the author"
                          width={43}
                          height={43}
                        />
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
