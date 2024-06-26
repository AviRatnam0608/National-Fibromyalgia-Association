import { useRouter } from 'next/router';
import AdminNavBar from "@/app/components/NavBar/AdminNavBar";
import ResearcherNavBar from "@/app/components/NavBar/ResearcherNavBar";
import "/src/app/globals.css";
import { AuthProvider } from "@/app/services/AuthContext";
import LogoutButton from "@/app/components/LogoutButton";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith('/admin-') || router.pathname.startsWith('/workspaces/National-Fibromyalgia-Association/pages/admin-');

  return (
    <AuthProvider>
      {isAdminPage ? <AdminNavBar /> : <ResearcherNavBar />}
      <Component {...pageProps} />
      <LogoutButton isAdminPage={isAdminPage} />
    </AuthProvider>

  );
}

export default MyApp;