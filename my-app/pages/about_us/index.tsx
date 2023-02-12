import Link from "next/link";
import styles from "../../styles/about.module.css";
import Layout from "@/components/layout";
import Head from "next/head";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {}, []);

  return (
    <>
      <Head>
        <title>ไม่พบหน้าของค้นหา-VEHICLE4U</title>
      </Head>

      <Layout>
        <div className={`container ${styles.main} mt-4`}>
          <div>
            <h1>เกี่ยวกับเรา</h1>
            <p>
              แพลทฟอร์มผู้นำด้านการจองรถเช่า ที่อำนวยความสะดวกทั้งด้านการจองรถ
              คุณภาพรถ การเลือกรถอย่างอิสระ และการค้นหารถเช่าราคาที่ดีที่สุด
            </p>
            <Link href="/" className={`${styles.link}`}>
              กลับสู่หน้าหลัก
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
}
