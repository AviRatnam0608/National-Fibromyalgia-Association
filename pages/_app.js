import '/workspaces/National-Fibromyalgia-Association/src/app/globals.css'; 

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Global components like navbar can be added here */}
      <Component {...pageProps} />
      {/*  footer can be added here */}
    </>
  );
}

export default MyApp;
