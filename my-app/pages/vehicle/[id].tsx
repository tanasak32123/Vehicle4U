import styles from "@/styles/carInformation.module.css";
import router from "next/router";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { BsCheckAll } from "react-icons/bs";

export default function CarInformation() {
  return (
    <div
      className={`${styles.container} px-3 d-flex justify-content-center align-items-center`}
    >
      <div className={`p-4 ${styles.reg_container}`}>
        <button
          onClick={() => router.back()}
          className={`${styles.back_btn} d-flex align-items-center`}
        >
          <FaArrowAltCircleLeft /> &nbsp;ย้อนกลับ
        </button>
        <div
          className={`${styles.head_info} px-3 d-flex justify-content-center align-items-center`}
        >
          รายละเอียด
        </div>

        <Row>
          <Col>
            <div className={styles.image_container}></div>
            <div className={styles.provider_detail}>
              <p className={styles.topic}>ข้อมูลผู้ปล่อยเช่า</p>
              <div className={styles.details}>
                {/* ชื่อผู้ปล่อยเช่า */}
                <p>&bull; นายวิศวะ ซอฟแวร์</p>
                {/* เบอร์โทรศัพท์ */}
                <p>&bull; เบอร์โทรติดต่อ 0811111111</p>
              </div>
            </div>
          </Col>
          <Col md={3}>
            {/* ชื่อรถ */}
            <p className={styles.topic}>Toyota Altis (สีขาวมุก)</p>
            {/* จังหวัด*/}
            <div className={styles.details}>
              <p>
                <BsCheckAll size={"28px"} />
                &nbsp; จังหวัด
              </p>
              {/* เลขทะเบียนรถ */}
              <p>
                <BsCheckAll size={"28px"} />
                &nbsp; เลขทะเบียนรถ
              </p>
              {/* จำนวนที่นั่ง */}
              <p>
                <BsCheckAll size={"28px"} />
                &nbsp; จำนวนที่นั่ง
              </p>
            </div>
          </Col>
          <Col>
            <div className={styles.image_container}></div>
          </Col>
        </Row>
      </div>
      <button
        className={styles.rent_btn}
        onClick={() => router.push("/car/renter")}
      >
        เช่า
      </button>
    </div>
  );
}
