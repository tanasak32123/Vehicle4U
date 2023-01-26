import Link from "next/link";
import Layout from "components/layout";

export default function FourOhFour() {
  return (
    <Layout>
      <div
        style={{ height: "100vh" }}
        className="d-flex align-items-center justify-content-center"
      >
        <div className="text-center">
          <h1>ขออภัย เราไม่พบหน้าของคุณ</h1>
          <Link href="/">กลับสู่หน้าหลัก</Link>
        </div>
      </div>
    </Layout>
  );
}
