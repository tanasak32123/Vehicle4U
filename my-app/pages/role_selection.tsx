import Layout from "../components/layout";
import styles from "@/styles/role_selection.module.css";
import bg from "../public/bgRoleSelection.png";
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

      <Layout>
        <div
          style={{
            backgroundImage: `url(${bg.src})`,
            height: "100vh",
            width: "100vw",
            objectFit: "cover",
          }}
          className="d-flex justify-content-center align-items-center"
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
            <h3 className="mb-2">กรุณาเลือกประเภทผู้ใช้งาน</h3>
            <Link
              href="/register?role=renter"
              className={`orange_btn ${styles.role}`}
            >
              <h6 className="mb-0">ผู้เช่า</h6>
            </Link>
            <Link
              href="/register?role=provider"
              className={`orange_btn ${styles.role}`}
            >
              <h6 className="mb-0">ผู้ปล่อยเช่า</h6>
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
}
