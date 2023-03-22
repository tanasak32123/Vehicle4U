import { AppProps } from "next/app";
import dynamic from "next/dynamic";

//global css
import "@/styles/globals.css";

//bootstrap5 css
import "bootstrap/dist/css/bootstrap.min.css";

//react bootstrap
import { SSRProvider } from "react-bootstrap";

//loading skeleton
import "react-loading-skeleton/dist/skeleton.css";

import { AuthProvider } from "@/components/authContext";

const Layout = dynamic(() => import("@/components/Layout"), {
  loading: () => <p>Loading...</p>,
});

const ErrorBoundary = dynamic(() => import("@/components/ErrorBoundary"), {
  loading: () => <p>Loading...</p>,
});

const App = ({ Component, pageProps: { ...pageProps } }: AppProps) => {
  return (
    <>
      <SSRProvider>
        <ErrorBoundary>
          <AuthProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthProvider>
        </ErrorBoundary>
      </SSRProvider>
    </>
  );
};

export default App;
