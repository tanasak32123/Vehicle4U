import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "@/styles/home.module.css";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import { FaSignInAlt, FaTimesCircle } from "react-icons/fa";
import { useAuth } from "@/components/AuthContext";

export default function Home() {
  const { authAction } = useAuth();

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [invalid, setInvalid] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: Event) {
    event.preventDefault();
    setLoading(true);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        role,
      }),
    });
    setLoading(false);
    if (!response.ok) {
      const data = await response.json();
      setInvalid(data.message);
      setShowAlert(true);
      return;
    }
    setShowAlert(false);
    authAction.mutate();
    router.push("/searchcar");
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
              <form className={`${styles.form}`}>
                <label htmlFor="username" className={`${styles.form_text}`}>
                  <b>ชื่อผู้ใช้</b>
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
                <br />
                <br />
                <label htmlFor="password" className={`${styles.form_text}`}>
                  <b>รหัสผ่าน</b>
                </label>
                <br />
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={styles.input}
                  value={password}
                  onChange={(event) => setPassword(event.target.value.trim())}
                />
                <br />
                <br />
                <label htmlFor="role" className={`${styles.form_text} mb-1`}>
                  <b>บทบาท</b>
                </label>
                <br />
                <select
                  name="role"
                  id="role"
                  className={`${styles.select}`}
                  onChange={(event) => setRole(event.target.value.trim())}
                  value={role}
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
                <button
                  type="button"
                  onClick={(event: any) => handleSubmit(event)}
                  className={`orange_btn py-2`}
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
