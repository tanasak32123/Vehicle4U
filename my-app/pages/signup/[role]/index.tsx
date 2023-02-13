import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "@/styles/signup/signup.module.css";
import { Row, Col, Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import { FaArrowAltCircleLeft, FaUserAlt } from "react-icons/fa";
import defaultOptions from "@/libs/apiDefault";

export default function Register() {
  const router = useRouter();

  const query = router.query;

  let [role, setRole] = useState("");
  let [fName, setFName] = useState("");
  let [lName, setLName] = useState("");
  let [username, setUsername] = useState("");
  let [pw, setPw] = useState("");
  let [tel, setTel] = useState("");
  let [citizenID, setCitizenID] = useState("");
  let [drivenID, setDrivenID] = useState("");
  let [payment, setPayment] = useState("");

  let [invalid_fName, setInvalid_fName] = useState("");
  let [invalid_lName, setInvalid_lName] = useState("");
  let [invalid_username, setInvalid_username] = useState("");
  let [invalid_pw, setInvalid_pw] = useState("");
  let [invalid_tel, setInvalid_tel] = useState("");
  let [invalid_cizitenID, setInvalid_citizenID] = useState("");
  let [invalid_drivenID, setInvalid_drivenID] = useState("");
  let [invalid_payment, setInvalid_payment] = useState("");

  let [loading, setLoading] = useState(false);

  let errors = {
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

    const data = {
      role,
      fName,
      lName,
      username,
      pw,
      tel,
      citizenID,
      drivenID,
      payment,
    };

    setLoading(true);

    console.log(data);
    await fetch("/api/signup", {
      ...defaultOptions,
      method: "POST",
      body: JSON.stringify(data),
    }).then(async (res) => {
      setLoading(false);

      const result = await res.json();

      if (res.status != 201) {
        setInvalid_fName(result.errors.fName);
        setInvalid_lName(result.errors.lName);
        setInvalid_username(result.errors.username);
        setInvalid_pw(result.errors.pw);
        setInvalid_tel(result.errors.tel);
        setInvalid_citizenID(result.errors.citizenID);
        setInvalid_drivenID(result.errors.drivenID);
        setInvalid_payment(result.errors.payment);
      } else {
        router.push("/signup/success", "/signup");
      }
    });
  }

  useEffect(() => {
    if (query.role != "provider" && query.role != "renter") {
      router.push("/signup");
    } else {
      setRole(query.role);
    }
  }, [query.role]);

  return (
    <>
      <Head>
        <title>สมัครสมาชิก - VEHICLE4U</title>
      </Head>

      <div
        className={`${styles.container} px-3 d-flex justify-content-center align-items-center`}
      >
        <div className={`p-4 ${styles.reg_container}`}>
          <button
            onClick={() => router.push("/signup")}
            className={`${styles.back_btn} d-flex align-items-center`}
          >
            <FaArrowAltCircleLeft /> &nbsp;ย้อนกลับ
          </button>
          <h1 className="text-end">สมัครสมาชิก</h1>
          <hr />
          <h5 className={`p-2 ${styles.role} mb-3 text-center`}>
            {role == "renter" && <b>ผู้เช่า</b>}
            {role == "provider" && <b>ผู้ปล่อยเช่า</b>}
          </h5>
          <form>
            <Row className="text-left">
              <Col sm={12} lg={6}>
                <div className="mb-2">
                  <label htmlFor="fName">
                    <h6>ชื่อ</h6>
                  </label>
                  <br />
                  <input
                    type="text"
                    id="fName"
                    name="fName"
                    className={styles.input}
                    value={fName}
                    onChange={(event) => setFName(event.target.value.trim())}
                  />
                  <div className={`${styles.feedback}`}>
                    {errors.invalid_fName}
                  </div>
                </div>

                <div className="mb-2">
                  <label htmlFor="lName">
                    <h6>นามสกุล</h6>
                  </label>
                  <br />
                  <input
                    type="text"
                    id="lName"
                    name="lName"
                    className={styles.input}
                    value={lName}
                    onChange={(event) => setLName(event.target.value.trim())}
                  />
                  <div className={`${styles.feedback}`}>
                    {errors.invalid_lName}
                  </div>
                </div>

                <div className="mb-2">
                  <label htmlFor="username">
                    <h6>ชื่อผู้ใช้</h6>
                  </label>
                  <br />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className={styles.input}
                    value={username}
                    onChange={(event) => setUsername(event.target.value.trim())}
                  />
                  <div className={`${styles.feedback}`}>
                    {errors.invalid_username}
                  </div>
                </div>

                <div className="mb-2">
                  <label htmlFor="password">
                    <h6>รหัสผ่าน</h6>
                  </label>
                  <br />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={styles.input}
                    value={pw}
                    onChange={(event) => setPw(event.target.value.trim())}
                  />
                  <div className={`${styles.feedback}`}>
                    {errors.invalid_pw}
                  </div>
                </div>
              </Col>

              <Col sm={12} lg={6}>
                <div className="mb-2">
                  <label htmlFor="tel">
                    <h6>เบอร์โทรศัพท์</h6>
                  </label>
                  <br />
                  <input
                    type="text"
                    id="tel"
                    name="tel"
                    className={styles.input}
                    value={tel}
                    onChange={(event) =>
                      setTel(event.target.value.trim().replace("-", ""))
                    }
                  />
                  <div className={`${styles.feedback}`}>
                    {errors.invalid_tel}
                  </div>
                </div>

                <div className="mb-2">
                  <label htmlFor="citizenID">
                    <h6>หมายเลขบัตรประชาชน</h6>
                  </label>
                  <br />
                  <input
                    type="text"
                    id="citizenID"
                    name="citizenID"
                    className={styles.input}
                    value={citizenID}
                    onChange={(event) =>
                      setCitizenID(event.target.value.trim().replace("-", ""))
                    }
                  />
                  <div className={`${styles.feedback}`}>
                    {errors.invalid_cizitenID}
                  </div>
                </div>

                {role == "renter" && (
                  <div className="mb-2">
                    <label htmlFor="drivenID">
                      <h6>หมายเลขใบขับขี่</h6>
                    </label>
                    <br />
                    <input
                      type="text"
                      id="drivenID"
                      name="drivenID"
                      className={styles.input}
                      value={drivenID}
                      onChange={(event) =>
                        setDrivenID(event.target.value.trim())
                      }
                    />
                    <div className={`${styles.feedback}`}>
                      {errors.invalid_drivenID}
                    </div>
                  </div>
                )}

                {role == "provider" && (
                  <div className="mb-2">
                    <label htmlFor="payment">
                      <h6>ช่องทางการรับเงิน</h6>
                    </label>
                    <br />
                    <select
                      name="payment"
                      id="payment"
                      className={`${styles.select}`}
                      onChange={(event) =>
                        setPayment(event.target.value.trim())
                      }
                    >
                      <option
                        className={`${styles.select}`}
                        value=""
                        defaultChecked
                      >
                        เลือกช่องทางการชำระเงิน
                      </option>
                      <option className={`${styles.option}`} value="promptpay">
                        พร้อมเพย์
                      </option>
                      <option className={`${styles.option}`} value="credit">
                        บัตรเครดิต
                      </option>
                      <option className={`${styles.option}`} value="cash">
                        เงินสด
                      </option>
                    </select>
                    <div className={`${styles.feedback}`}>
                      {errors.invalid_payment}
                    </div>
                  </div>
                )}

                <div className="mt-4 text-end">
                  <button
                    type="button"
                    onClick={(event: any) => handleSubmit(event)}
                    className={`py-2 me-2 orange_btn`}
                  >
                    {loading && (
                      <>
                        <Spinner
                          className={`${styles.spinner}`}
                          animation="border"
                          variant="primary"
                        />{" "}
                      </>
                    )}
                    <b>
                      สมัครสมาชิก&nbsp;&nbsp;
                      <FaUserAlt />
                    </b>
                  </button>
                </div>
              </Col>
            </Row>
          </form>
        </div>
      </div>
    </>
  );
}
