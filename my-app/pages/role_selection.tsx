import Layout from "../components/layout";
import styles from "@/styles/role_selection.module.css";
import bg from "../public/bgRoleSelection.png";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaBackward } from "react-icons/fa";

export default function RoleSelector() {
  const router = useRouter();

  return (
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
          <div className={`text-start ${styles.back}`}>
            <span style={{ color: "#0d6efd" }}>
              <FaBackward />
            </span>
            &nbsp;&nbsp;
            <Link href="/" className={`${styles.back_link}`}>
              กลับสู่หน้าหลัก
            </Link>
          </div>
          <h3 className="mb-0">กรุณาเลือกประเภทผู้ใช้งาน</h3>
          <br />
          <Link href="/register?role=renter" className={styles.btn}>
            <h6 className="mb-0">ผู้เช่า</h6>
          </Link>
          <Link href="/register?role=provider" className={styles.btn}>
            <h6 className="mb-0">ผู้ปล่อยเช่า</h6>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
