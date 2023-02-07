import Link from "next/link";
import styles from "../styles/about.module.css";
import Layout from "@/components/layout";

export default function About() {
  return (
    <>
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
