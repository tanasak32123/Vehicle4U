import Head from "next/head";
import styles from "@/styles/updateCar.module.css";
import { useRouter } from "next/router";
import { useAuth } from "@/components/AuthContext";
import { FaArrowAltCircleLeft, FaCar } from "react-icons/fa";

export default function UpdateCar() {
  const { user, isAuthenticate, authAction }: any = useAuth();

  const router = useRouter();

  return (
    <>
      <Head>
        <title>ข้อมูลรถยนต์-VEHICLE4U</title>
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
          <h1 className="align-items-center d-flex justify-content-end">
            <FaCar />
            &nbsp; ข้อมูลรถยนต์
          </h1>
          <hr />
          {/* Image */}
        </div>
      </div>
    </>
  );
}
