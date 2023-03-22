import Head from "next/head";
import { useState } from "react";
import styles from "@/styles/renter.module.css";
import { Row, Col } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { FaArrowAltCircleLeft, FaUserAlt } from "react-icons/fa";
import { useAuth } from "@/components/authContext";

export default function Register() {
  const { authAction, loading }: any = useAuth();

  const router = useRouter();

  const [startdate, setStartdate] = useState("");
  const [starttime, setStarttime] = useState("");
  const [enddate, setEnddate] = useState("");
  const [endtime, setEndtime] = useState("");
  const [contact, setContact] = useState("");
  const [info, setInfo] = useState("");
  const [location, setLocation] = useState("");
  const [carid, setCarid] = useState(1);
  const [accept, setAccept] = useState("");

  const [invalid_fName, setInvalid_fName] = useState("");
  const [invalid_lName, setInvalid_lName] = useState("");
  const [invalid_username, setInvalid_username] = useState("");
  const [invalid_pw, setInvalid_pw] = useState("");
  const [invalid_tel, setInvalid_tel] = useState("");
  const [invalid_cizitenID, setInvalid_citizenID] = useState("");
  const [invalid_drivenID, setInvalid_drivenID] = useState("");
  const [invalid_payment, setInvalid_payment] = useState("");

  const errors = {
    invalid_fName,
    invalid_lName,
    invalid_username,
    invalid_pw,
    invalid_tel,
    invalid_cizitenID,
    invalid_drivenID,
    invalid_payment,
  };

  async function handleSubmit(event: Event) {
    event.preventDefault();
    const response = await fetch("/api/renter_request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startdate,
        starttime,
        enddate,
        endtime,
        contact,
        info,
        location,
        carid,
        accept,
      }),
    });
    // setLoading(false);
    if (!response.ok) {
      const data = await response.json();
      return;
    }
    router.push("/car/payment");
  }

  return (
    <>
      <Head>
        <title>กรอกข้อมูลสำหรับเช่ารถ - VEHICLE4U</title>
      </Head>

      <div
        className={`${styles.container} px-3 d-flex justify-content-center align-items-center`}
      >
        <div className={`p-4 ${styles.reg_container}`}>
          <button
            onClick={() => router.push("/car/info")}
            className={`${styles.back_btn} d-flex align-items-center`}
          >
            <FaArrowAltCircleLeft /> &nbsp;ย้อนกลับ
          </button>
          <h1 className="text-end">กรุณากรอกข้อมูลเพิ่มเติมเพิ่อทำการเช่า</h1>
          <hr />

          <Row className="text-left">
            <Col sm={12} lg={6}>
              <>
                <div className="mb-2">
                  <label htmlFor="fName">
                    <h6>วันเวลาในการรับคืนรถ</h6>
                  </label>
                  <br />

                  <div className={styles.date_time}>
                    <Row>
                      <Col>วัน-เวลารับรถ</Col>
                      <Col>
                        <input
                          type="date"
                          id="birthday"
                          name="birthday"
                          onChange={(event) => {
                            console.log(event.target.value.split("-"));
                            setStartdate(event.target.value.trim());
                          }}
                          className={styles.input_cal}
                        />
                      </Col>
                      <Col>
                        <input
                          type="time"
                          onChange={(event) => {
                            console.log(event.target.value.split(":"));
                            setStarttime(event.target.value.trim());
                          }}
                          className={styles.input_cal}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>วัน-เวลาส่งคืนรถ</Col>
                      <Col>
                        <input
                          type="date"
                          id="birthday"
                          name="birthday"
                          onChange={(event) =>
                            setEnddate(event.target.value.trim())
                          }
                          className={styles.input_cal}
                        />
                      </Col>
                      <Col>
                        <input
                          type="time"
                          onChange={(event) =>
                            setEndtime(event.target.value.trim())
                          }
                          className={styles.input_cal}
                        />
                      </Col>
                    </Row>
                  </div>

                  <div className={`${styles.feedback}`}>
                    {errors.invalid_fName}
                  </div>
                </div>

                <div className="mb-2">
                  <label htmlFor="exampleFormControlTextarea1">
                    <h6>รายระเอียดจุดนัดพบ (รับ-คืนรถ)</h6>
                  </label>
                  <br />
                  <textarea
                    className={styles.textarea}
                    id="exampleFormControlTextarea1"
                    onChange={(event) => setInfo(event.target.value.trim())}
                    rows={3}
                  ></textarea>
                  <div className={`${styles.feedback}`}>
                    {errors.invalid_lName}
                  </div>
                </div>
              </>
            </Col>

            <Col sm={12} lg={6}>
              <>
                <div className="mb-2">
                  <label htmlFor="tel">
                    <h6>รายระเอียดเพิ่มเติมที่ต้องการแจ้งผู้ปล่อยเช่า</h6>
                  </label>
                  <br />
                  <textarea
                    className={styles.textarea}
                    id="exampleFormControlTextarea1"
                    onChange={(event) => {
                      console.log(event.target.value);
                      setInfo(event.target.value.trim());
                    }}
                    rows={3}
                  ></textarea>
                  <div className={`${styles.feedback}`}>
                    {errors.invalid_tel}
                  </div>
                </div>

                <div className="mb-2">
                  <label htmlFor="citizenID">
                    <h6>เบอร์ติดต่อฉุกเฉิน</h6>
                  </label>
                  <br />

                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={styles.input_tel}
                    onChange={(event) => setContact(event.target.value.trim())}
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    required
                  />

                  <div className={`${styles.feedback}`}>
                    {errors.invalid_cizitenID}
                  </div>
                </div>
              </>
            </Col>
            <Col lg={12}>
              <div>
                <p>
                  ท่านได้ยอมรับข้อกำหนดทั่วไปและเงื่อนไขของกรมธรรม์ของเรา
                  รวมถึงข้อกำหนดด้านการเช่าของ VEHICLE4U
                </p>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={(event) => console.log(event.target.value)}
                  value="accept"
                  id="defaultCheck1"
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  ยอมรับ
                </label>
              </div>
            </Col>
            <Col lg={12}>
              <button
                className={styles.submit_btn}
                onClick={(event: any) => {
                  handleSubmit(event);
                }}
              >
                ยืนยันการเช่า
              </button>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
