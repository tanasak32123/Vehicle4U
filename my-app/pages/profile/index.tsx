import styles from "@/styles/editProfile.module.css";
import Head from "next/head";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { useRouter } from "next/router";
import { Row, Col, Container, Modal, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import defaultOptions from "@/libs/apiDefault";
import UserProfile from "@/interfaces/UserProfile";
import { getCookie } from "cookies-next";

export default function EditProfile() {
  const router = useRouter();

  const [nmShow, setNmShow] = useState(false);
  const [unShow, setUnShow] = useState(false);
  const [passShow, setPassShow] = useState(false);
  const [telShow, setTelShow] = useState(false);
  const [ciShow, setCiShow] = useState(false);
  const [DlicenseShow, setDlicenseShow] = useState(false);
  const [paymentShow, setPaymentShow] = useState(false);

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [cid, setCid] = useState("");
  const [dlicense, setDlicense] = useState("");
  const [payment, setPayment] = useState("");
  const [isRenter, setIsRenter] = useState(false);
  const [isProvider, setIsProvider] = useState(false);

  const [data, setData] = useState({} as UserProfile);

  let [invalid_fName, setInvalid_fName] = useState("");
  let [invalid_lName, setInvalid_lName] = useState("");
  let [invalid_username, setInvalid_username] = useState("");
  let [invalid_pw, setInvalid_pw] = useState("");
  let [invalid_tel, setInvalid_tel] = useState("");
  let [invalid_cizitenID, setInvalid_citizenID] = useState("");
  let [invalid_drivenID, setInvalid_drivenID] = useState("");
  let [invalid_payment, setInvalid_payment] = useState("");

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

  useEffect(() => {
    const getUser = async () => {
      const cookies: string = getCookie("user") as string;
      const obj = JSON.parse(cookies);

      const response = await fetch(`http://localhost:3000/user/${obj.id}`, {
        ...defaultOptions,
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.token}`,
        },
      });
      const json = await response.json();

      setData({
        username: json.username,
        last_name: json.last_name,
        first_name: json.first_name,
        tel: json.tel,
        citizen_id: json.citizen_id,
        driving_license_id: json.driving_license_id,
        payment_channel: json.payment_channel,
        is_provider: json.is_provider,
        is_renter: json.is_renter,
      } as UserProfile);
    };
    getUser();
  }, []);

  async function handleUpdateProfile(type: String, ...values: String[]) {
    const profile: UserProfile = {
      username: username || data.username,
      password: password || data.password,
      first_name: fName || data.first_name,
      last_name: lName || data.last_name,
      tel: tel || data.tel,
      citizen_id: cid || data.citizen_id,
      payment_channel: payment || data.payment_channel,
      driving_license_id: dlicense || data.driving_license_id,
      is_renter: isRenter,
      is_provider: isProvider,
    };
    // console.log(profile);

    const body = {
      values,
      type,
      profile,
    };

    await fetch("/api/update_profile", {
      ...defaultOptions,
      method: "POST",
      body: JSON.stringify(body),
    }).then(async (res) => {
      const result = await res.json();
      if (res.status != 200) {
        setInvalid_fName(result.errors.fName);
        setInvalid_lName(result.errors.lName);
        setInvalid_username(result.errors.username);
        setInvalid_pw(result.errors.pw);
        setInvalid_tel(result.errors.tel);
        setInvalid_citizenID(result.errors.citizenID);
        setInvalid_drivenID(result.errors.drivenID);
        setInvalid_payment(result.errors.payment);
      }
      // console.log(result);
    });
  }

  return (
    <>
      <Head>
        <title>การตั้งค่า-VEHICLE4U</title>
      </Head>

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
          <h1 className="text-end">การตั้งค่า</h1>
          <hr />
          <br />

          {/* name and last name */}
          <Container>
            <div className="mb-2">
              <Row>
                <label htmlFor="fName">
                  <h6 className={styles.text}>ชื่อ-นามสกุล</h6>
                </label>
              </Row>
              <Row>
                <Col>
                  {/* name and last name */}
                  <p>
                    {data.first_name} {data.last_name}
                  </p>
                </Col>
                <Col>
                  <button
                    className={`${styles.edit_button}`}
                    onClick={() => setNmShow(true)}
                  >
                    <FiEdit2 /> &nbsp; แก้ไข
                  </button>
                  <Modal
                    size="lg"
                    show={nmShow}
                    onHide={() => setNmShow(false)}
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>ชื่อ-นามสกุล</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group>
                          <Row>
                            <Col>
                              <Form.Label className="mb-3">ชื่อ</Form.Label>
                              <Form.Control
                                name="fname"
                                className={`${styles.input} mb-3`}
                                type="text"
                                defaultValue={data.first_name}
                                autoFocus
                                onChange={(event) =>
                                  setFName(event.target.value)
                                }
                              />
                              <div className={styles.feedback}>
                                {errors.invalid_fName}
                              </div>
                            </Col>
                            <Col>
                              <Form.Label className="mb-3">นามสกุล</Form.Label>
                              <Form.Control
                                name="lname"
                                className={`${styles.input} mb-3`}
                                type="text"
                                defaultValue={data.last_name}
                                autoFocus
                                onChange={(event) =>
                                  setLName(event.target.value)
                                }
                              />
                              <div className={styles.feedback}>
                                {errors.invalid_lName}
                              </div>
                            </Col>
                          </Row>
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        className={`${styles.close_btn} mx-2`}
                        onClick={() => setNmShow(false)}
                      >
                        ปิด
                      </Button>
                      <Button
                        className={`${styles.save_btn} mx-2`}
                        onClick={() => {
                          handleUpdateProfile("name", fName, lName);
                        }}
                      >
                        แก้ไข
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Col>
                <br />
              </Row>
            </div>
          </Container>
          <br />

          {/* username */}
          <Container>
            <div className="mb-2">
              <Row>
                <label htmlFor="username">
                  <h6 className={styles.text}>ชื่อผู้ใช้</h6>
                </label>
                <br />
              </Row>
              <Row>
                <Col>
                  {/* username */}
                  <p>{data.username}</p>
                </Col>
                <Col>
                  <button
                    className={styles.edit_button}
                    onClick={() => setUnShow(true)}
                  >
                    <FiEdit2 /> &nbsp; แก้ไข
                  </button>
                  <Modal
                    size="lg"
                    show={unShow}
                    onHide={() => setUnShow(false)}
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>ชื่อผู้ใช้</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group>
                          <Form.Label className="mb-3">ชื่อผู้ใช้</Form.Label>
                          <Form.Control
                            className={`${styles.input} mb-3`}
                            type="text"
                            defaultValue={data.username}
                            autoFocus
                            onChange={(event) => {
                              setUsername(event.target.value);
                            }}
                          />
                          <div className={styles.feedback}>
                            {errors.invalid_username}
                          </div>
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        className={`${styles.close_btn} mx-2`}
                        onClick={() => setUnShow(false)}
                      >
                        ปิด
                      </Button>
                      <Button
                        className={`${styles.save_btn} mx-2`}
                        onClick={() => {
                          handleUpdateProfile("username", username);
                        }}
                      >
                        แก้ไข
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Col>
                <br />
              </Row>
            </div>
          </Container>
          <br />

          {/* password */}
          <Container>
            <div className="mb-2">
              <Row>
                <label htmlFor="password">
                  <h6 className={styles.text}>รหัสผ่าน</h6>
                </label>
                <br />
              </Row>
              <Row>
                <Col>
                  <input
                    type="password"
                    value="*******"
                    className={`${styles.infor}`}
                    disabled
                  />
                </Col>
                <Col>
                  <button
                    className={styles.edit_button}
                    onClick={() => setPassShow(true)}
                  >
                    <FiEdit2 /> &nbsp; แก้ไข
                  </button>
                  <Modal
                    size="lg"
                    show={passShow}
                    onHide={() => setPassShow(false)}
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>รหัสผ่าน</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group>
                          <Form.Label className="mb-3">รหัสผ่าน</Form.Label>
                          <Form.Control
                            className={`${styles.input} mb-3`}
                            type="text"
                            autoFocus
                            onChange={(event) => {
                              setPassword(event.target.value);
                            }}
                          />
                        </Form.Group>
                        <div className={styles.feedback}>
                          {errors.invalid_pw}
                        </div>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        className={`${styles.close_btn} mx-2`}
                        onClick={() => setPassShow(false)}
                      >
                        ปิด
                      </Button>
                      <Button
                        className={`${styles.save_btn} mx-2`}
                        onClick={() => {
                          handleUpdateProfile("password", password);
                        }}
                      >
                        แก้ไข
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Col>
                <br />
              </Row>
            </div>
          </Container>
          <br />

          {/* Tel. */}
          <Container>
            <div className="mb-2">
              <Row>
                <label htmlFor="tel">
                  <h6 className={styles.text}>เบอร์โทรศัพท์</h6>
                </label>
                <br />
              </Row>
              <Row>
                <Col>
                  {/* telephone */}
                  <p>{data.tel}</p>
                </Col>
                <Col>
                  <button
                    className={styles.edit_button}
                    onClick={() => setTelShow(true)}
                  >
                    <FiEdit2 /> &nbsp; แก้ไข
                  </button>
                  <Modal
                    size="lg"
                    show={telShow}
                    onHide={() => setTelShow(false)}
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>เบอร์โทรศัพท์</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group>
                          <Form.Label className="mb-3">
                            เบอร์โทรศัพท์
                          </Form.Label>
                          <Form.Control
                            className={`${styles.input} mb-3`}
                            type="text"
                            defaultValue={data.tel}
                            autoFocus
                            onChange={(event) => {
                              setTel(event.target.value);
                            }}
                          />
                          <div className={styles.feedback}>
                            {errors.invalid_tel}
                          </div>
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        className={`${styles.close_btn} mx-2`}
                        onClick={() => setTelShow(false)}
                      >
                        ปิด
                      </Button>
                      <Button
                        className={`${styles.save_btn} mx-2`}
                        onClick={() => {
                          handleUpdateProfile("tel", tel);
                        }}
                      >
                        แก้ไข
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Col>
                <br />
              </Row>
            </div>
          </Container>
          <br />

          {/* Citizen ID */}
          <Container>
            <div className="mb-2">
              <Row>
                <label htmlFor="citizenID">
                  <h6 className={styles.text}>หมายเลขบัตรประชาชน</h6>
                </label>
                <br />
              </Row>
              <Row>
                <Col>
                  {/* citizen id */}
                  <p>{data.citizen_id}</p>
                </Col>
                <Col>
                  <button
                    className={styles.edit_button}
                    onClick={() => setCiShow(true)}
                  >
                    <FiEdit2 /> &nbsp; แก้ไข
                  </button>
                  <Modal
                    size="lg"
                    show={ciShow}
                    onHide={() => setCiShow(false)}
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>หมายเลขบัตรประชาชน</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group>
                          <Form.Label className="mb-3">
                            หมายเลขบัตรประชาชน
                          </Form.Label>
                          <Form.Control
                            className={`${styles.input} mb-3`}
                            type="text"
                            defaultValue={data.citizen_id}
                            autoFocus
                            onChange={(event) => {
                              setCid(event.target.value);
                            }}
                          />
                          <div className={styles.feedback}>
                            {errors.invalid_cizitenID}
                          </div>
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        className={`${styles.close_btn} mx-2`}
                        onClick={() => setCiShow(false)}
                      >
                        ปิด
                      </Button>
                      <Button
                        className={`${styles.save_btn} mx-2`}
                        onClick={() => {
                          handleUpdateProfile("cid", cid);
                        }}
                      >
                        แก้ไข
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Col>
                <br />
              </Row>
            </div>
          </Container>
          <br />

          {/* Driven id */}
          {isRenter && (
            <>
              <Container>
                <div className="mb-2">
                  <Row>
                    <label htmlFor="citizenID">
                      <h6 className={styles.text}>หมายเลขใบขับขี่</h6>
                    </label>
                    <br />
                  </Row>
                  <Row>
                    <Col>
                      {/* Driven id */}
                      {!dlicense && <p>-</p>}
                      {dlicense && <p>{dlicense}</p>}
                    </Col>
                    <Col>
                      <button
                        className={styles.edit_button}
                        onClick={() => setDlicenseShow(true)}
                      >
                        <FiEdit2 /> &nbsp; แก้ไข
                      </button>
                      <Modal
                        size="lg"
                        show={DlicenseShow}
                        onHide={() => setDlicenseShow(false)}
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>หมายเลขใบขับขี่</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form>
                            <Form.Group>
                              <Form.Label className="mb-3">
                                หมายเลขใบขับขี่
                              </Form.Label>
                              <Form.Control
                                className={`${styles.input} mb-3`}
                                type="text"
                                defaultValue={data.driving_license_id}
                                autoFocus
                                onChange={(event) => {
                                  setDlicense(event.target.value);
                                }}
                              />
                              <div className={styles.feedback}>
                                {errors.invalid_drivenID}
                              </div>
                            </Form.Group>
                          </Form>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            className={`${styles.close_btn} mx-2`}
                            onClick={() => setDlicenseShow(false)}
                          >
                            ปิด
                          </Button>
                          <Button
                            className={`${styles.save_btn} mx-2`}
                            onClick={() => {
                              handleUpdateProfile("dlicense", dlicense);
                            }}
                          >
                            แก้ไข
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </Col>
                    <br />
                  </Row>
                </div>
              </Container>
              <br />
            </>
          )}

          {/* Payment */}
          {isProvider && (
            <Container>
              <div className="mb-2">
                <Row>
                  <label htmlFor="citizenID">
                    <h6 className={styles.text}>ช่องทางการรับเงิน</h6>
                  </label>
                  <br />
                </Row>
                <Row>
                  <Col>
                    {/* Payment */}
                    {!payment && <p>-</p>}
                    {payment && (
                      <p>
                        {payment == "cash" && "เงินสด"}
                        {payment == "promptpay" && "พร้อมเพย์"}
                        {payment == "credit" && "เครดิต"}
                      </p>
                    )}
                  </Col>
                  <Col>
                    <button
                      className={styles.edit_button}
                      onClick={() => setPaymentShow(true)}
                    >
                      <FiEdit2 /> &nbsp; แก้ไข
                    </button>
                    <Modal
                      size="lg"
                      show={paymentShow}
                      onHide={() => setPaymentShow(false)}
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>ช่องทางการรับเงิน</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group>
                            <Form.Label className="mb-3">
                              ช่องทางการรับเงิน
                            </Form.Label>
                            <Form.Select
                              aria-label="paymnet method"
                              onChange={(event) => {
                                setPayment(event.target.value);
                              }}
                              className={`${styles.input} mb-3`}
                              defaultValue={data.payment_channel}
                            >
                              <option value="promptpay">พร้อมเพย์</option>
                              <option value="credit">บัตรเครดิต</option>
                              <option value="cash">เงินสด</option>
                            </Form.Select>
                            <div className={styles.feedback}>
                              {errors.invalid_payment}
                            </div>
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          className={`${styles.close_btn} mx-2`}
                          onClick={() => setPaymentShow(false)}
                        >
                          ปิด
                        </Button>
                        <Button
                          className={`${styles.save_btn} mx-2`}
                          onClick={() => {
                            handleUpdateProfile("payment", payment);
                          }}
                        >
                          แก้ไข
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Col>
                  <br />
                </Row>
              </div>
            </Container>
          )}

          {/* Role */}
          <Container>
            <div className="mb-2">
              <Row>
                <label htmlFor="role">
                  <h6 className={styles.text}>บทบาท</h6>
                </label>
                <br />
              </Row>
              <Row>
                <Col>
                  {/* role */}
                  {data.is_renter && <p>ผู้เช่า</p>}
                </Col>
                <Col>
                  <button
                    className={styles.edit_button}
                    onClick={() => setCiShow(true)}
                  >
                    <FiEdit2 /> &nbsp; แก้ไข
                  </button>
                  <Modal
                    size="lg"
                    show={ciShow}
                    onHide={() => setCiShow(false)}
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>หมายเลขบัตรประชาชน</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group>
                          <Form.Label className="mb-3">
                            หมายเลขบัตรประชาชน
                          </Form.Label>
                          <Form.Control
                            className={`${styles.input} mb-3`}
                            type="text"
                            defaultValue={data.citizen_id}
                            autoFocus
                            onChange={(event) => {
                              setCid(event.target.value);
                            }}
                          />
                          <div className={styles.feedback}>
                            {errors.invalid_cizitenID}
                          </div>
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        className={`${styles.close_btn} mx-2`}
                        onClick={() => setCiShow(false)}
                      >
                        ปิด
                      </Button>
                      <Button
                        className={`${styles.save_btn} mx-2`}
                        onClick={() => {
                          handleUpdateProfile("cid", cid);
                        }}
                      >
                        แก้ไข
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Col>
                <br />
              </Row>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}
