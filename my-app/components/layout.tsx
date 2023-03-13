import dynamic from "next/dynamic";
import Head from "next/head";

const Navbar = dynamic(() => import("./Navbar"), {
  loading: () => <p>Loading...</p>,
});

const Footer = dynamic(() => import("./Footer"), {
  loading: () => <p>Loading...</p>,
});

export default function Layout({ children }: any) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style jsx global>{``}</style>

      <Navbar />
      <main>
        <div className="position-relative">{children}</div>
      </main>
      <Footer />
    </>
  );
}
