import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import { SSRProvider } from "react-bootstrap";
import Layout from "@/components/layout";
import { AuthProvider } from "@/components/authContext";
import "react-loading-skeleton/dist/skeleton.css";
import ProtectRoute from "@/components/protectRoute";

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AuthProvider>
        <ProtectRoute>
          <SSRProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SSRProvider>
        </ProtectRoute>
      </AuthProvider>
    </>
  );
}
