import Link from "next/link";
import styles from "../../styles/about.module.css";
import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>เกี่ยวกับเรา-VEHICLE4U</title>
      </Head>

      <div className={`container ${styles.main} mt-4`}>
        <div>
          <h1>เกี่ยวกับเรา</h1>
          <p>
            แพลทฟอร์มผู้นำด้านการจองรถเช่า ที่อำนวยความสะดวกทั้งด้านการจองรถ
            คุณภาพรถ การเลือกรถอย่างอิสระ และการค้นหารถเช่าราคาที่ดีที่สุด
          </p>
          <p>
            เราเชื่อว่าการช้อปปิ้งออนไลน์สามารถเข้าถึงได้ง่ายและเพลิดเพลิน
            นี่คือวิสัยทัศน์ของ Shopee
            ที่ปรารถนาจะส่งมอบให้กับลูกค้าบนแพลตฟอร์มในทุกๆวัน
          </p>
          <Link href="/" className={`${styles.link}`}>
            กลับสู่หน้าหลัก
          </Link>
        </div>
      </div>
    </>
  );
}
