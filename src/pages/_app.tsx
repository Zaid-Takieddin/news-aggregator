import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Layout from "./layout";
const ProgressBar = dynamic(() => import("../components/BarProgress"), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />;
      <ProgressBar />
    </Layout>
  );
}
