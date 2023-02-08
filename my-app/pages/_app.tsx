import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import { SSRProvider } from "react-bootstrap";
import { CookiesProvider } from "react-cookie";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <SSRProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <Component {...pageProps} />
      </SSRProvider>
    </CookiesProvider>
  );
}
