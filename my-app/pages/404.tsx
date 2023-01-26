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
          <h1>404 - Page Not Found</h1>
          <Link href="/">Go back home</Link>
        </div>
      </div>
    </Layout>
  );
}
