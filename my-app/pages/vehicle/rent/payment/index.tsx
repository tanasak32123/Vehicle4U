import Head from "next/head";
import styles from "@/styles/payment.module.css";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import router from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Renter_request() {
  const [errors, setErrors] = useState({
    choose_payment: "",
  });

  const [card, setCard] = useState(false);
  const [mobile, setMobile] = useState(false);

  async function handleSubmit(event: Event) {
    event.preventDefault();
    const response = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile,
        card,
      }),
    });
    if (!response.ok) {
      const data = await response.json();
      setErrors(data.errors);
      console.log(errors);
      return;
    }
    toast.success(
      "เมื่อผู้ปล่อยเช่ายืนยันการเช่า ระบบจะส่งแจ้งเตือนให้ท่านอีกครั้งเพื่อทำการชำระเงิน",
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
    router.push("/vehicle/rent/sucess");
  }

  return (
    <>
      <Head>
        <title>สมัครสมาชิก - VEHICLE4U</title>
      </Head>

      <div
        className={`${styles.bg_container} px-3 d-flex justify-content-center align-items-center`}
      >
        <div className={`p-4 ${styles.base_container}`}>
          <button
            onClick={() => router.back()}
            className={`${styles.back2_btn} d-flex align-items-center`}
          >
            <FaArrowAltCircleLeft /> &nbsp;ย้อนกลับ
          </button>
          <div>
            <div className={styles.head_info}>
              <h4>เลือกวิธีการชำระเงิน</h4>
            </div>
          </div>

          <div className={styles.type_container}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                value="card"
                onChange={() => {
                  setCard(true);
                  setMobile(false);
                }}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                บัตรเครดิต / บัตรเดบิต
              </label>
            </div>
            <hr />
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                value="moblie_banking"
                onChange={(event) => {
                  setMobile(true);
                  setCard(false);
                }}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                โอนเงินผ่านบัญชีธนาคาร
              </label>
            </div>
          </div>

          <div className="d-flex justify-content-end align-items-center">
            <small className={`${"red_color"} me-2`}>
              {errors.choose_payment}
            </small>
            <button
              className={styles.pay_btn}
              onClick={(event: any) => {
                handleSubmit(event);
              }}
            >
              ชำระเงิน
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
