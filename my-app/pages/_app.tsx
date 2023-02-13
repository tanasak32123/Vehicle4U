import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import { SSRProvider } from "react-bootstrap";

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  return (
    <SSRProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Component {...pageProps} />
    </SSRProvider>
  );
}
