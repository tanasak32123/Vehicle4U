import styles from "@/styles/signup/success.module.css";
import correct from "../../public/correct.png";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { FaSignInAlt } from "react-icons/fa";

export default function Registered() {
  return (
    <>
      <Head>
        <title>สมัครสมาชิก-VEHICLE4U</title>
      </Head>

      <div
        className={`${styles.main} d-flex justify-content-center align-items-center`}
      >
        <div className={`${styles.container}`}>
          <Image src={correct} width={100} height={100} alt="correct" />
          <br />
          <br />
          <h4 className="mb-3">สมัครบัญชีผู้ใช้สำเร็จ</h4>
          {/* change to main page */}
          <Link href="/" className={`orange_btn`}>
            <h6 className="mb-0">
              <FaSignInAlt />
              &nbsp;เข้าสู่ระบบ
            </h6>
          </Link>
        </div>
      </div>
    </>
  );
}
