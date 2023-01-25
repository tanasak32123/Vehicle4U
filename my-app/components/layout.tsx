import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout({ children }: any) {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: "90vh" }}>{children}</div>
      <Footer />
    </>
  );
}
