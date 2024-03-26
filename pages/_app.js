import NavBar from "@/app/components/NavBar/NavBar";
import "/src/app/globals.css";


function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
