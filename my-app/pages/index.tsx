import type { NextPage } from "next";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/router";

import styles from "styles/Home.module.css";
import { Row, Col } from "react-bootstrap";
import { FaSignInAlt } from "react-icons/fa";
import { useAuth } from "@/components/authContext";
import { toast } from "react-toastify";

interface FormValues {
  username: string;
  password: string;
  role: string;
}

// Yup schema to validate the form
const signinSchema = Yup.object().shape({
  username: Yup.string()
    .required("โปรดใส่ชื่อผู้ใช้ของคุณ")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "ชื่อผู้ใช้ไม่สามารถเว้นวรรคหรือใส่อักขระพิเศษได้"
    ),
  password: Yup.string().required("โปรดใส่รหัสผ่านของคุณ"),
  role: Yup.string()
    .oneOf(["renter", "provider"], "บทบาทของคุณไม่ถูกต้อง")
    .required("โปรดเลือกบทบาทของคุณ"),
});

const initialValues: FormValues = {
  username: "",
  password: "",
  role: "",
};

const Home: NextPage = () => {
  const router = useRouter();
  const { authAction } = useAuth();
  const [error, setError] = useState<string>("");

  const signin = async (values: FormValues): Promise<any> => {
    const success = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values }),
    })
      .then((res) => {
        if (res.status == 500) {
          throw new Error("Something went wrong...");
        }
        return res.json();
      })
      .then((res) => {
        if (!res.success) {
          setError(res.message);
          return false;
        }
        return true;
      })
      .catch((err) => {
        toast.error("ระบบมีข้อผิดพลาด โปรดลองอีกครั้ง", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return false;
      });
    return success;
  };

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
            <div className={`p-4 ${styles.form_container} w-75`}>
              <Formik
                initialValues={initialValues}
                validationSchema={signinSchema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={async (values, actions) => {
                  const success: boolean | any = await signin(values);
                  authAction.mutate();
                  if (!success) {
                    actions.resetForm();
                  } else {
                    if (router.query.from) {
                      router.replace(router.query.from as string);
                    }
                    if (values.role == "renter") {
                      router.replace("/vehicle/search");
                    }
                    if (values.role == "provider") {
                      router.replace("provider/vehicle");
                    }
                  }
                }}
              >
                {({
                  values,
                  setFieldValue,
                  errors,
                  touched,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <Form>
                    <div className="form-group mb-3">
                      <label htmlFor="username" className="mb-2">
                        <b>ชื่อผู้ใช้</b>
                      </label>
                      <Field
                        id="username"
                        as="input"
                        type="text"
                        name="username"
                        className={`form-control ${
                          errors.username ? "is-invalid" : ""
                        }`}
                        value={values.username}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setFieldValue("username", e.currentTarget.value)
                        }
                      />
                      {errors.username && touched.username && (
                        <div className="invalid-feedback">
                          {errors.username}
                        </div>
                      )}
                    </div>

                    <div className="form-group mb-3">
                      <label htmlFor="password" className="mb-2">
                        <b>รหัสผ่าน</b>
                      </label>
                      <Field
                        id="password"
                        as="input"
                        type="password"
                        name="password"
                        className={`form-control ${
                          errors.password ? "is-invalid" : ""
                        }`}
                        value={values.password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setFieldValue("password", e.currentTarget.value)
                        }
                      />
                      {errors.password && touched.password && (
                        <div className="invalid-feedback">
                          {errors.password}
                        </div>
                      )}
                    </div>

                    <div className="form-group mb-3">
                      <label htmlFor="role" className="mb-2">
                        <b>บทบาท</b>
                      </label>
                      <Field
                        as="select"
                        title="role"
                        id="role"
                        name="role"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setFieldValue("role", e.currentTarget.value)
                        }
                        className={`form-select ${
                          errors.role ? "is-invalid" : ""
                        }`}
                        value={values.role}
                      >
                        <option value="" defaultChecked>
                          เลือกบทบาทของคุณ...
                        </option>
                        <option value="renter">ผู้เช่า</option>
                        <option value="provider">ผู้ปล่อยเช่า</option>
                      </Field>
                      {errors.role && touched.role && (
                        <div className="invalid-feedback">{errors.role}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <button
                        type="submit"
                        className="btn btn-primary me-2"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "กำลังโหลด..." : `เข้าสู่ระบบ`}
                        &nbsp;
                        <FaSignInAlt />
                      </button>
                      {error && (
                        <small className="text-danger">** {error}</small>
                      )}
                    </div>

                    <div>
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
                    </div>
                  </Form>
                )}
              </Formik>

              {/* <form
                className={`${styles.form}`}
                onSubmit={(event: any) => handleSubmit1(event)}
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
              </form> */}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Home;
