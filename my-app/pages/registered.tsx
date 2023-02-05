import Layout from "../components/layout";
import styles from "@/styles/registered.module.css";
import bg from "../public/bgRegistered.png";
import correct from "../public/correct.png";
import Link from "next/link";
import Image from "next/image";

export default function Registered() {
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
        <div className={`${styles.container}`}>
          <Image src={correct} width={130} height={130} alt="correct" />
          <br />
          <br />
          <h3 className="">สมัครบัญชีผู้ใช้สำเร็จ</h3>
          {/* change to main page */}
          <Link href="/" className={`orange_btn`}>
            <h6 className="mb-0">เข้าสู่ระบบ</h6>
          </Link>
        </div>
      </div>
    </Layout>
  );
}