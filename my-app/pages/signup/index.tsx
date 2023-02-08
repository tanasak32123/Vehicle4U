import Layout from "../../components/layout";
import styles from "@/styles/signup/role.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import Head from "next/head";

export default function RoleSelector() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>สมัครสมาชิก - VEHICLE4U</title>
      </Head>

      <div
        className={`d-flex justify-content-center align-items-center ${styles.main}`}
      >
        <div className={`py-4 ${styles.container}`}>
          <div className={`text-start ${styles.back} mb-1`}>
            <button
              onClick={() => router.push("/")}
              className={`${styles.back_btn} d-flex align-items-center`}
            >
              <FaArrowAltCircleLeft /> &nbsp;ย้อนกลับ
            </button>
          </div>
          <h3 className="mb-4">กรุณาเลือกประเภทผู้ใช้งาน</h3>
          <Link
            href="/signup/renter"
            className={`orange_btn ${styles.role} mx-3`}
          >
            <h6 className="mb-0">ผู้เช่า</h6>
          </Link>
          <Link
            href="/signup/provider"
            className={`orange_btn ${styles.role} mx-3`}
          >
            <h6 className="mb-0">ผู้ปล่อยเช่า</h6>
          </Link>
        </div>
      </div>
    </>
  );
}
