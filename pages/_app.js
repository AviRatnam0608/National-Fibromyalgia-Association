import '/workspaces/National-Fibromyalgia-Association/src/app/globals.css'; 

function MyApp({ Component, pageProps }) {
  return (
    <>
      <nav className="bg-primary text-white px-4 py-2">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">National Fibromyalgia Association</h1>
          <div>
            <a href="/" className="px-4 hover:underline">Dashboard</a>
            <a href="/about" className="px-4 hover:underline">About Us</a>
            <a href="/contact" className="px-4 hover:underline">Contact</a>
            <a href="/researcher-form" className="px-4 hover:underline">Research Post Request</a>
          </div>
        </div>
      </nav>

      <Component {...pageProps} />

      {/* Footer can be added here */}
    </>
  );
}


export default MyApp;