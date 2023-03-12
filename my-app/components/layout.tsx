import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("./navbar"), {
  loading: () => <p>Loading...</p>,
});

const Footer = dynamic(() => import("./footer"), {
  loading: () => <p>Loading...</p>,
});

export default function Layout({ children }: any) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
