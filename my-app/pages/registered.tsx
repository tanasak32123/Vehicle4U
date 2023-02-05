import Layout from "../components/layout";
import styles from "@/styles/registered.module.css";
import bg from "../public/bgRegistered.png";
import correct from "../public/correct.png";
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
      </Layout>
    </>
  );
}
