import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { hoverStyling } from './NavBar/NavBar.styles';
import { useRouter } from 'next/router';


const LogoutButton = () => {
    const router = useRouter();
    const handleLogout = async () => {
        try {
            await signOut(auth);
            const isAdminPage = router.pathname.startsWith('/admin-') || router.pathname.startsWith('/workspaces/National-Fibromyalgia-Association/pages/admin-');
            if (isAdminPage) {
                window.location.href = "/admin-login";
            } else {
                window.location.href = "/login";
            }
        } catch (error) {
            console.error('Logout failed: ', error);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className={`px-2 ${hoverStyling}`}
        >
            Logout
        </button>
    );
};

export default LogoutButton;
