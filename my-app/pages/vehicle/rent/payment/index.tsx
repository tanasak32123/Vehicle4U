import Head from "next/head";
import styles from "@/styles/payment.module.css";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import router from "next/router";
import { useState } from "react";

export default function Renter_request() {
  const [errors, setErrors] = useState({
    choose_payment: "",
  });

  const [card, setCard] = useState(false);
  const [mobile, setMobile] = useState(false);

  async function handleSubmit(event: Event) {
    console.log(card, mobile);

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
            onClick={() => router.push("/car/renter")}
            className={`${styles.back2_btn} d-flex align-items-center`}
          >
            <FaArrowAltCircleLeft /> &nbsp;ย้อนกลับ
          </button>
          <div>
            <div className={styles.head_info}>
              <h4>เลือกวิธีการชำระเงิน</h4>
            </div>
          </div>
          <div className={`${"red_color"}`}>{errors.choose_payment}</div>

          <div className={styles.type_container}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                value="card"
                onChange={(event) => {
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

          <div>
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
