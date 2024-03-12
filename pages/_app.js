import NavBar from '/src/app/components/NavBar'; 
import '/workspaces/National-Fibromyalgia-Association/src/app/globals.css'; 

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;