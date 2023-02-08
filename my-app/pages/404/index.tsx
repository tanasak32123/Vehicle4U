import Head from "next/head";
import Link from "next/link";
import Layout from "components/layout";
import { FaHome } from "react-icons/fa";

export default function FourOhFour() {
  return (
    <>
      <Head>
        <title>ไม่พบหน้าที่คุณค้นหา-VEHICLE4U</title>
      </Head>

      <div
        style={{ height: "100vh" }}
        className="d-flex align-items-center justify-content-center"
      >
        <div className="text-center">
          <h3>ขออภัย เราไม่พบหน้าที่คุณค้นหา</h3>
          <Link
            href="/"
            className="orange_btn d-flex align-items-center justify-content-center"
          >
            <FaHome />
            &nbsp;กลับสู่หน้าหลัก
          </Link>
        </div>
      </div>
    </>
  );
}
