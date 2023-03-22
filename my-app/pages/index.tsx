import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

import styles from "@/styles/home.module.css";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import { FaSignInAlt, FaTimesCircle } from "react-icons/fa";
import { useAuth } from "@/components/authContext";

export default function Home() {
  const { authAction } = useAuth();

  const router = useRouter();

  const usernameRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLSelectElement>(null);

  const [invalid, setInvalid] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: Event) {
    event.preventDefault();
    setLoading(true);
    await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameRef.current?.value,
        password: pwdRef.current?.value,
        role: roleRef.current?.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setShowAlert(false);
          authAction.mutate();
          router.push("/searchcar");
        } else {
          setInvalid(res.message);
          setShowAlert(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setInvalid("** ระบบเกิดข้อผิดพลาดโปรดลองใหม่อีกครั้ง");
        setShowAlert(true);
        setLoading(false);
      });
  }

  return (
    <>
      <Head>
        <title>หน้าหลัก-VEHICLE4U</title>
      </Head>

      <Image
        className={`${styles.image_bg}`}
        src="/images/backgrounds/home.webp"
        alt="Picture of car renter"
        fill
        priority
      />

      <div className="container">
        <Row className={`${styles.container}`}>
          <Col
            sm={12}
            lg={6}
            className="d-flex justify-content-center align-items-center"
          >
            <div className={`${styles.borderFont}`}>
              <h3 className={`${styles.manifesto_title}`}>คิดถึงเช่ารถ</h3>
              <h1 className={`${styles.manifesto_title}`}>
                &nbsp;&nbsp;คิดถึง VEHICLE
                <span className={`${styles.title_4U}`}>4U</span>
              </h1>
            </div>
          </Col>
          <Col
            sm={12}
            lg={6}
            className="d-flex justify-content-center align-items-center"
          >
            <div
              className={`${styles.form_container} justify-content-center d-flex align-items-center`}
            >
              <form
                className={`${styles.form}`}
                onSubmit={(event: any) => handleSubmit(event)}
              >
                <label htmlFor="username" className={`${styles.form_text}`}>
                  <b>ชื่อผู้ใช้</b>
                </label>
                <br />
                <input
                  ref={usernameRef}
                  type="text"
                  id="username"
                  name="username"
                  className={styles.input}
                />
                <br />
                <br />
                <label htmlFor="password" className={`${styles.form_text}`}>
                  <b>รหัสผ่าน</b>
                </label>
                <br />
                <input
                  ref={pwdRef}
                  type="password"
                  id="password"
                  name="password"
                  className={styles.input}
                />
                <br />
                <br />
                <label htmlFor="role" className={`${styles.form_text} mb-1`}>
                  <b>บทบาท</b>
                </label>
                <br />
                <select
                  ref={roleRef}
                  name="role"
                  id="role"
                  className={`${styles.select}`}
                >
                  <option
                    className={`${styles.select}`}
                    value=""
                    defaultChecked
                  >
                    เลือกบทบาทของคุณ
                  </option>
                  <option className={`${styles.option}`} value="renter">
                    ผู้เช่า
                  </option>
                  <option className={`${styles.option}`} value="provider">
                    ผู้ปล่อยเช่า
                  </option>
                </select>
                <br />
                <br />
                {showAlert && (
                  <Alert
                    variant="danger"
                    show={showAlert}
                    onClose={() => setShowAlert(false)}
                    dismissible
                  >
                    <FaTimesCircle className={`red_color`} /> {invalid}
                  </Alert>
                )}
                <button type="submit" className={`orange_btn py-2`}>
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
                    <FaSignInAlt /> เข้าสู่ระบบ
                  </b>
                </button>
                <br />
                <br />
                <small className={`${styles.form_text}`}>
                  ยังไม่มีบัญชีผู้ใช้งาน ?{" "}
                  <b>
                    <Link
                      href="/signup"
                      className={`${styles.signup}`}
                      prefetch={false}
                    >
                      สมัครบัญชีผู้ใช้งานที่นี่
                    </Link>
                  </b>
                </small>
              </form>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
