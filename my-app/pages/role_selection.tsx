import Head from "next/head";
import Layout from "../components/layout";
import styles from "@/styles/role_selection.module.css";
import bg from "../public/bgRoleSelection.png";
import Link from "next/link";

export default function Home() {

  return (
    <Layout>
      <div style={{
          backgroundImage: `url(${bg.src})`,
          height: '100vh',
          width: '100vh',
          objectFit: "cover",
        }}  className="d-flex justify-content-center align-items-center"
      >
          <div className={`${styles.container}`}>
            <h1 style={{fontWeight: "1000"}}>กรุณาเลือกประเภทผู้ใช้งานของท่าน</h1>
            <br/>
            <Link href="/register?role=renter" className={styles.btn}>
              <h3 style={{fontWeight: "500"}}>ผู้เช่า</h3>
            </Link>
            <Link href="/register?role=provider" className={styles.btn}>
              <h3 style={{fontWeight: "500"}}>ผู้ปล่อยเช่า</h3>
            </Link>
          </div>
      </div>
      
    </Layout>
  );
}
    