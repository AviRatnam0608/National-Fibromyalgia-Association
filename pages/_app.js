import { useRouter } from 'next/router';
import AdminNavBar from "@/app/components/NavBar/AdminNavBar";
import ResearcherNavBar from "@/app/components/NavBar/NavBar";
import "/src/app/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith('/admin-') || router.pathname.startsWith('/workspaces/National-Fibromyalgia-Association/pages/admin-');

  return (
    <>
      {isAdminPage ? <AdminNavBar /> : <ResearcherNavBar />}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;