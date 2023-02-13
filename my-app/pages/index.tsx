import Head from "next/head";
import styles from "@/styles/home.module.css";
import { Row, Col, Spinner } from "react-bootstrap";
import { useState } from "react";
import Link from "next/link";
import { FaSignInAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import { Session } from "@/interfaces/session";
import defaultOptions from "@/libs/apiDefault";

export default function Home() {
  const router = useRouter();

  let [username, setUsername] = useState("");
  let [pw, setPw] = useState("");
  let [role, setRole] = useState("");
  let [invalid, setInvalid] = useState("");
  let [loading, setLoading] = useState(false);

  async function handleSubmit(event: Event) {
    event.preventDefault();
    setLoading(true);
    await fetch("/api/signin", {
      ...defaultOptions,
      method: "POST",
      body: JSON.stringify({ username: username, password: pw, role }),
    }).then(async (response) => {
      const result = await response.json();

      setLoading(false);

      if (response.status != 200) {
        setInvalid(result.message);
      } else {
        const user: Session = {
          username: result.data.user.username,
          password: result.data.user.password,
          access_token: result.data.token.access_token,
        };
        console.log(result.data.user);
        sessionStorage.setItem("username", user.username);
        sessionStorage.setItem("password", user.password);
        sessionStorage.setItem("token", user.access_token);
        // const cookie: string = getCookie("user") as string;
        // const user = JSON.parse(cookie);
        setInvalid("");
        router.push("/about_us");
      }
    });
  }
  return (
    <>
      <Head>
        <title>หน้าหลัก-VEHICLE4U</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${styles.main}`}>
        <Row style={{ height: "100vh", width: "100%" }}>
          <Col
            sm={12}
            lg={6}
            className="d-flex justify-content-center align-items-center"
          >
            <div className={`${styles.borderFont}`}>
              <h3 style={{ color: "white", fontWeight: "1000" }}>
                คิดถึงเช่ารถ
              </h3>
              <h1 style={{ color: "white", fontWeight: "1000" }}>
                &nbsp;&nbsp;คิดถึง VEHICLE
                <span style={{ color: "#545A8B" }}>4U</span>
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
              <form style={{ width: "80%" }}>
                <label htmlFor="username" style={{ color: "white" }}>
                  <b>ชื่อผู้ใช้</b>
                </label>
                <br />
                <input
                  type="text"
                  id="username"
                  name="username"
                  className={styles.input}
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
                <br />
                <br />
                <label htmlFor="password" style={{ color: "white" }}>
                  <b>รหัสผ่าน</b>
                </label>
                <br />
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={styles.input}
                  value={pw}
                  onChange={(event) => setPw(event.target.value)}
                />
                <br />
                <br />
                <label
                  htmlFor="role"
                  style={{ color: "white" }}
                  className="mb-1"
                >
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
                <div className={`mb-2 ${styles.invalid}`}>
                  <small>{invalid}</small>
                </div>
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
                <small style={{ color: "white" }}>
                  ยังไม่มีบัญชีผู้ใช้งาน ?{" "}
                  <b>
                    <Link href="/signup" className={`${styles.signup}`}>
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
