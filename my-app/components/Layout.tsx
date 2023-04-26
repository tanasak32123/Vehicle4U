import dynamic from "next/dynamic";
import Head from "next/head";
import { useAuth } from "./AuthContext";

const Navbar = dynamic(() => import("./Navbar"), {
  loading: () => <p>Loading...</p>,
});

const Footer = dynamic(() => import("./Footer"), {
  loading: () => <p>Loading...</p>,
});

export default function Layout({ children }: any) {
  const { isLogout } = useAuth();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style jsx global>{``}</style>

      <Navbar />
      <main>
        {!isLogout && <div className={`position-relative`}>{children}</div>}
        {isLogout && (
          <div className={`d-flex justify-content-center align-items-center`}>
            <div className={`lds-facebook`}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
