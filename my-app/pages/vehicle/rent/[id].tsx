import Head from "next/head";
import { useState } from "react";
import styles from "@/styles/renter.module.css";
import { Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Register() {
  const router = useRouter();

  const [startdate, setStartdate] = useState("");
  const [starttime, setStarttime] = useState("");
  const [enddate, setEnddate] = useState("");
  const [endtime, setEndtime] = useState("");
  const [contact, setContact] = useState("");
  const [info, setInfo] = useState("");
  const [location, setLocation] = useState("");
  const car = router.query;
  const carid = car.id;
  const [accept, setAccept] = useState(false);

  const [errors, setErrors] = useState({
    invalid_datetime: "",
    fill_datetime: "",
    onlynum_contact: "",
    invalid_contact: "",
    fill_contact: "",
    accept: "",
  });

  async function handleSubmit(event: Event) {
    event.preventDefault();
    await fetch("/api/renter_request", {
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
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.errors) {
          return setErrors(res.errors);
        }

        if (!res.success) {
          if (res?.message == "Vehicle is already rented") {
            toast.error("รถคันนี้ถูกแล้วจองในช่วงเวลานี้", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else if (res?.message == "This is your vehicle") {
            toast.error("ไม่สามารถจองได้เนื่องจากคุณเป็นเจ้าของรถคันนี้", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            router.replace("/vehicle");
          } else if (res?.message == "Internal server") {
            return toast.error("ระบบเกิดข้อผิดพลาด", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }

        if (res?.success) {
          toast.success("คุณทำการเช่ารถสำเร็จ", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          router.replace("/vehicle/renter");
        }
      });
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
            type="button"
            onClick={() => router.back()}
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
                  <label htmlFor="fName">วันเวลาในการรับคืนรถ</label>
                  <small className={"red_color"}>(*จำเป็น)</small>
                  <br />

                  <div className={styles.date_time}>
                    <Row>
                      <Col>
                        <label htmlFor="date">วัน-เวลารับรถ</label>
                      </Col>
                      <Col>
                        <div>
                          <input
                            type="date"
                            id="date"
                            name="date"
                            onChange={(event) => {
                              setStartdate(event.target.value.trim());
                            }}
                            className={styles.input_cal}
                          />
                        </div>
                      </Col>
                      <Col>
                        <input
                          aria-label="date"
                          id="time1"
                          type="time"
                          onChange={(event) => {
                            setStarttime(event.target.value.trim());
                          }}
                          className={styles.input_cal}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <label htmlFor="birthday">วัน-เวลาส่งคืนรถ</label>
                      </Col>
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
                          aria-label="birthday"
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
                    {errors.fill_datetime || errors.invalid_datetime}
                  </div>
                </div>

                <div className="mb-2">
                  <label htmlFor="exampleFormControlTextarea2">
                    <h6>รายระเอียดจุดนัดพบ (รับ-คืนรถ)</h6>
                  </label>
                  <br />
                  <textarea
                    className={styles.textarea}
                    id="exampleFormControlTextarea2"
                    onChange={(event) => setInfo(event.target.value.trim())}
                    rows={3}
                  ></textarea>
                </div>
              </>
            </Col>

            <Col sm={12} lg={6}>
              <>
                <div className="mb-2">
                  <label htmlFor="exampleFormControlTextarea1">
                    <h6>รายระเอียดเพิ่มเติมที่ต้องการแจ้งผู้ปล่อยเช่า</h6>
                  </label>
                  <br />
                  <textarea
                    className={styles.textarea}
                    id="exampleFormControlTextarea1"
                    onChange={(event) => {
                      setInfo(event.target.value.trim());
                    }}
                    rows={3}
                  ></textarea>
                </div>

                <div className="mb-2">
                  <label htmlFor="phone">
                    <h6>เบอร์ติดต่อฉุกเฉิน</h6>
                  </label>
                  <small className={"red_color"}>(*จำเป็น)</small>
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
                    {errors.onlynum_contact ||
                      errors.fill_contact ||
                      errors.invalid_contact}
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
                  onChange={(event) => {
                    setAccept(!accept);
                  }}
                  id="defaultCheck1"
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  ยอมรับ
                </label>
                <small className={"red_color"}>(*จำเป็น)</small>
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
              <div className={`${styles.feedback}`}>{errors.accept}</div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
