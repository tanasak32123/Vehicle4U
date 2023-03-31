import Link from "next/link";
import Image from "next/image";

//css
import styles from "styles/components/Footer.module.css";
import { Container, Col, Row } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaLine, FaPhoneAlt } from "react-icons/fa";

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
                <ul className={`${styles.ul}`}>
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

                <ul className={`${styles.ul}`}>
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

                <ul className={`${styles.ul}`}>
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
            <div className={`${styles.col}`}>
              <h4>
                <b>เกี่ยวกับ </b>
                <b>
                  <span className={`${styles.brand_title}`}>VEHICLE4U</span>
                </b>
              </h4>
              <div className={styles.footer_info}>
                <ul className={`${styles.ul}`}>
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
            <div className={`${styles.col}`}>
              <h4>
                <b>ติดต่อเรา</b>
              </h4>
              <div className={styles.footer_info}>
                <ul className={`${styles.ul_list} p-0`}>
                  <li>
                    <div className="d-flex align-items-center">
                      <FaPhoneAlt size={18} />
                      <small>&nbsp;&nbsp;: 081-831-8928</small>
                    </div>

                    <div className="mt-3">
                      <Link href="/" className={`me-3`}>
                        <FaFacebook size={40} />
                      </Link>
                      <Link href="/" className={`me-3 ${styles.ig}`}>
                        <FaInstagram size={40} />
                      </Link>
                      <Link href="/" className={`${styles.line}`}>
                        <FaLine size={40} />
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
