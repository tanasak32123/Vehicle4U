import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function FiveOhOh() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>เกิดข้อผิดพลาด-VEHICLE4U</title>
      </Head>

      <div className={`main d-flex align-items-center justify-content-center`}>
        <div className="text-center">
          <h3>ขออภัย เกิดข้อผิดพลาดขึ้น โปรดลองอีกครั้ง</h3>
          <Link
            href={""}
            onClick={() => {
              router.replace("/");
            }}
            className="orange_btn d-flex align-items-center justify-content-center"
          >
            ลองใหม่อีกครั้ง
          </Link>
        </div>
      </div>
    </>
  );
}
