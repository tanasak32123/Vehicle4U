import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.css";
import { SSRProvider } from "react-bootstrap";
import Layout from "@/components/layout";
import { AuthProvider } from "@/components/authContext";
import "react-loading-skeleton/dist/skeleton.css";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  return (
    <>
      <ErrorBoundary>
        <AuthProvider>
          <SSRProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SSRProvider>
        </AuthProvider>
      </ErrorBoundary>
    </>
  );
}
