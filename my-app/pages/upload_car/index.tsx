import styles from "@/styles/upload_car.module.css";
import { useRouter } from "next/router";
import { FaArrowAltCircleLeft } from "react-icons/fa";

export default function UploadCar() {
  const router = useRouter();

  return (
    <>
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
            เพิ่มรถให้เช่า
          </h1>
          <hr />
        </div>
      </div>
    </>
  );
}
