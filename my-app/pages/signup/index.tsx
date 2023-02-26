import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "@/styles/signup/signup.module.css";
import { Row, Col, Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import { FaArrowAltCircleLeft, FaUserAlt } from "react-icons/fa";
import UserSignUp from "@/interfaces/UserSignUp";
import { useAuth } from "@/components/authContext";
import SucessModal from "@/components/signup/successModal";
import Skeleton from "react-loading-skeleton";
import SelectRoleModal from "@/components/signup/selectRoleModal";

export default function Register() {
  const { authAction, loading }: any = useAuth();

  const router = useRouter();

  const [role, setRole] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [username, setUsername] = useState("");
  const [pw, setPw] = useState("");
  const [tel, setTel] = useState("");
  const [citizenID, setCitizenID] = useState("");
  const [drivenID, setDrivenID] = useState("");
  const [payment, setPayment] = useState("");

  const [invalid_fName, setInvalid_fName] = useState("");
  const [invalid_lName, setInvalid_lName] = useState("");
  const [invalid_username, setInvalid_username] = useState("");
  const [invalid_pw, setInvalid_pw] = useState("");
  const [invalid_tel, setInvalid_tel] = useState("");
  const [invalid_cizitenID, setInvalid_citizenID] = useState("");
  const [invalid_drivenID, setInvalid_drivenID] = useState("");
  const [invalid_payment, setInvalid_payment] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [showSelect, setShowSelect] = useState(false);

  const [waitRole, setWaitRole] = useState(true);

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

  const data: UserSignUp = {
    first_name: fName,
    last_name: lName,
    username,
    password: pw,
    tel,
    citizen_id: citizenID,
    driving_license_id: drivenID,
    payment_channel: payment,
    is_renter: role == "renter",
    is_provider: role == "provider",
  };

  async function handleSubmit(event: Event) {
    event.preventDefault();
    const response = await authAction.signUp(data, role);
    if (!response.success) {
      setInvalid_fName(response.errors.fName);
      setInvalid_lName(response.errors.lName);
      setInvalid_username(response.errors.username);
      setInvalid_pw(response.errors.pw);
      setInvalid_tel(response.errors.tel);
      setInvalid_citizenID(response.errors.citizenID);
      setInvalid_drivenID(response.errors.drivenID);
      setInvalid_payment(response.errors.payment);
    } else {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  }

  useEffect(() => {
    setShowSelect(true);
  });

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
          {!waitRole ? (
            <>
              <h5 className={`p-2 ${styles.role} mb-3 text-center`}>
                {role == "renter" && <b>ผู้เช่า</b>}
                {role == "provider" && <b>ผู้ปล่อยเช่า</b>}
              </h5>
            </>
          ) : (
            <>
              <Skeleton width={180} height={50} />
              <br />
            </>
          )}

          <Row className="text-left">
            <Col sm={12} lg={6}>
              {!waitRole ? (
                <>
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
                      onChange={(event) =>
                        setUsername(event.target.value.trim())
                      }
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
                </>
              ) : (
                <>
                  <h6>ชื่อ</h6>
                  <Skeleton width={`100%`} height={50} />
                  <br />
                  <br />
                  <h6>นามสกุล</h6>
                  <Skeleton width={`100%`} height={50} />
                  <br />
                  <br />
                  <h6>ชื่อผู้ใช้</h6>
                  <Skeleton width={`100%`} height={50} />
                  <br />
                  <br />
                  <h6>รหัสผ่าน</h6>
                  <Skeleton width={`100%`} height={50} />
                  <br />
                </>
              )}
            </Col>

            <Col sm={12} lg={6}>
              {!waitRole ? (
                <>
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
                        <option
                          className={`${styles.option}`}
                          value="promptpay"
                        >
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

                  <SucessModal
                    show={showAlert}
                    onHide={() => {
                      setShowAlert(false);
                      router.push("/");
                    }}
                  />
                </>
              ) : (
                <>
                  <h6>เบอร์โทรศัพท์</h6>
                  <Skeleton width={`100%`} height={50} />
                  <br />
                  <br />
                  <h6>หมายเลขบัตรประชาชน</h6>
                  <Skeleton width={`100%`} height={50} />
                  <br />

                  <SelectRoleModal
                    show={showSelect}
                    onHide={(role: string) => {
                      setRole(role);
                      setShowSelect(false);
                      setWaitRole(false);
                    }}
                  />
                </>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
