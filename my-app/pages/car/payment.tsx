import Head from "next/head";
import styles from "@/styles/renter.module.css";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import router from "next/router";

export default function Renter_request() {
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
            className={`${styles.back_btn} d-flex align-items-center`}
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
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                โอนเงินผ่านบัญชีธนาคาร
              </label>
            </div>
          </div>

          <div>
            <button className={styles.pay_btn}>ชำระเงิน</button>
          </div>
        </div>
      </div>
    </>
  );
}
