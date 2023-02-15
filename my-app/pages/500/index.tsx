import Head from "next/head";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { useRouter } from "next/router";

export default function FiveOhFive() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>เกิดข้อผิดพลาด-VEHICLE4U</title>
      </Head>

      <div
        style={{ height: "100vh" }}
        className="d-flex align-items-center justify-content-center"
      >
        <div className="text-center">
          <h3>ขออภัย เกิดข้อผิดพลาดขึ้น โปรดลองอีกครั้ง</h3>
          <Link
            href={""}
            onClick={() => {
              router.back();
            }}
            className="orange_btn d-flex align-items-center justify-content-center"
          >
            <FaHome />
            &nbsp;ลองใหม่อีกครั้ง
          </Link>
        </div>
      </div>
    </>
  );
}
