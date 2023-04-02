import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";

import styles from "@/styles/signup.module.css";
import { Row, Col, Spinner, Modal, Button } from "react-bootstrap";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";

const CustomizeModal = dynamic(import("@/components/Modal/Customize"), {
  loading: () => <p>Loading...</p>,
});

export default function Register() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const fnameRef = useRef<HTMLInputElement>(null);
  const lnameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const telRef = useRef<HTMLInputElement>(null);
  const cidRef = useRef<HTMLInputElement>(null);
  const drivenIdRef = useRef<HTMLInputElement>(null);
  const paymentRef = useRef<HTMLSelectElement>(null);

  const [role, setRole] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);
  const [showSelect, setShowSelect] = useState(false);

  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    username: "",
    pwd: "",
    tel: "",
    cid: "",
    drivenId: "",
    payment: "",
  });

  async function handleSubmit(event: Event) {
    event.preventDefault();
    setLoading(true);
    await fetch(`/api/auth/signup/${role}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: fnameRef.current?.value!,
        last_name: lnameRef.current?.value!,
        username: usernameRef.current?.value!,
        password: pwdRef.current?.value!,
        tel: telRef.current?.value!,
        citizen_id: cidRef.current?.value!,
        driving_license_id: drivenIdRef.current?.value!,
        payment_channel: paymentRef.current?.value!,
        is_renter: role == "renter",
        is_provider: role == "provider",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.success) {
          setErrors(res.errors);
        } else {
          toast.success("สมัครสมาชิกสำเร็จ", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          router.push("/");
        }
        setLoading(false);
      })
      .catch((err) => {
        toast.error("ระบบเกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.error(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    setShowSelect(true);
  }, []);

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
            onClick={() => router.back()}
            className={`${styles.back_btn} d-flex align-items-center`}
          >
            <FaArrowAltCircleLeft /> &nbsp;ย้อนกลับ
          </button>
          <h1 className="text-end">สมัครสมาชิก</h1>
          <hr />
          {role == "renter" || role == "provider" ? (
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
              {role == "renter" || role == "provider" ? (
                <>
                  <div className="mb-2">
                    <label htmlFor="fName">
                      <h6>ชื่อ</h6>
                    </label>
                    <br />
                    <input
                      ref={fnameRef}
                      type="text"
                      id="fName"
                      name="fName"
                      className={styles.input}
                    />
                    <div className={`${styles.feedback}`}>{errors.fname}</div>
                  </div>

                  <div className="mb-2">
                    <label htmlFor="lName">
                      <h6>นามสกุล</h6>
                    </label>
                    <br />
                    <input
                      ref={lnameRef}
                      type="text"
                      id="lName"
                      name="lName"
                      className={styles.input}
                    />
                    <div className={`${styles.feedback}`}>{errors.lname}</div>
                  </div>

                  <div className="mb-2">
                    <label htmlFor="username">
                      <h6>ชื่อผู้ใช้</h6>
                    </label>
                    <br />
                    <input
                      ref={usernameRef}
                      type="text"
                      id="username"
                      name="username"
                      className={styles.input}
                    />
                    <div className={`${styles.feedback}`}>
                      {errors.username}
                    </div>
                  </div>

                  <div className="mb-2">
                    <label htmlFor="password">
                      <h6>รหัสผ่าน</h6>
                    </label>
                    <br />
                    <input
                      ref={pwdRef}
                      type="password"
                      id="password"
                      name="password"
                      className={styles.input}
                    />
                    <div className={`${styles.feedback}`}>{errors.pwd}</div>
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
              {role == "renter" || role == "provider" ? (
                <>
                  <div className="mb-2">
                    <label htmlFor="tel">
                      <h6>เบอร์โทรศัพท์</h6>
                    </label>
                    <br />
                    <input
                      ref={telRef}
                      type="text"
                      id="tel"
                      name="tel"
                      className={styles.input}
                    />
                    <div className={`${styles.feedback}`}>{errors.tel}</div>
                  </div>

                  <div className="mb-2">
                    <label htmlFor="citizenID">
                      <h6>หมายเลขบัตรประชาชน</h6>
                    </label>
                    <br />
                    <input
                      ref={cidRef}
                      type="text"
                      id="citizenID"
                      name="citizenID"
                      className={styles.input}
                    />
                    <div className={`${styles.feedback}`}>{errors.cid}</div>
                  </div>

                  {role == "renter" && (
                    <div className="mb-2">
                      <label htmlFor="drivenID">
                        <h6>หมายเลขใบขับขี่</h6>
                      </label>
                      <br />
                      <input
                        ref={drivenIdRef}
                        type="text"
                        id="drivenID"
                        name="drivenID"
                        className={styles.input}
                      />
                      <div className={`${styles.feedback}`}>
                        {errors.drivenId}
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
                        ref={paymentRef}
                        name="payment"
                        id="payment"
                        className={`${styles.select}`}
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
                        {errors.payment}
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
                      <b>สร้างบัญชี</b>
                    </button>
                  </div>
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
                </>
              )}
            </Col>
          </Row>
        </div>
      </div>

      {showSelect && (
        <SelectRoleModal
          show={showSelect}
          onHide={(role: string) => {
            setRole(role);
            setShowSelect(false);
          }}
        />
      )}
    </>
  );
}

const SelectRoleModal = ({ show, onHide }: any) => {
  const router = useRouter();

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop={`static`}
      centered
    >
      <Modal.Header className={`modal_wo_border`}>
        <Link
          href=""
          onClick={() => router.back()}
          className={`text-start ${styles.back_link}`}
        >
          <small>
            <FaArrowAltCircleLeft /> ย้อนกลับ
          </small>
        </Link>
      </Modal.Header>
      <Modal.Body>
        <h4 className={`text-center`}>กรุณาเลือกบทบาทที่คุณต้องการสมัคร</h4>
      </Modal.Body>
      <Modal.Footer className={`modal_wo_border d-flex justify-content-center`}>
        <Button
          className={`orange_btn ${styles.role} mx-3`}
          onClick={() => {
            onHide("renter");
          }}
        >
          <h6 className="mb-0 text-center">ผู้เช่า</h6>
        </Button>
        <Button
          className={`orange_btn ${styles.role} mx-3`}
          onClick={() => {
            onHide("provider");
          }}
        >
          <h6 className="mb-0 text-center">ผู้ปล่อยเช่า</h6>
        </Button>
      </Modal.Footer>
      <br />
    </Modal>
  );
};
