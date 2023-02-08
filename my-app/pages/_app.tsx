import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import { Container, SSRProvider } from "react-bootstrap";
import Layout from "@/components/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SSRProvider>
  );
}
