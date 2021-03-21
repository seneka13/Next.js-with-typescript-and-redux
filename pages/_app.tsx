import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { makeStore, wrapper } from "../store/store";
import MainLayout from "../components/MainLayout";
import "antd/dist/antd.css";
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default wrapper.withRedux(App);
