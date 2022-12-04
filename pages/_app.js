import "../styles/globals.css";
import toast, { Toaster } from "react-hot-toast";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress color="#000" />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fff",
            borderRadius: "100px",
            marginTop: "10px",
            fontSize: "14px",
          },
        }}
        reverseOrder={false}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
