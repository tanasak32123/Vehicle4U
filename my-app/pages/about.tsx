import Link from "next/link";
import styles from "../styles/footer.module.css";

export default function About() {
  return (
    <>
      <h2>
        แพลทฟอร์มผู้นำด้านการจองรถเช่า ที่อำนวยความสะดวกทั้งด้านการจองรถ
        คุณภาพรถ การเลือกรถอย่างอิสระ และการค้นหารถเช่าราคาที่ดีที่สุด
      </h2>
      <Link href="/" className={`${styles.link}`}>Back</Link>
    </>
  );
}
