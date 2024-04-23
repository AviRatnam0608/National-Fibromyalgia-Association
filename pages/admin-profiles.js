import React from 'react';
import { useAuth } from '../src/app/services/AuthContext';
import { useRouter } from 'next/navigation';
import { getUserProfile } from '@/app/services/firestoreOperations';

function Pending() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not loading and no user is logged in, redirect to login page
    if (!loading && !currentUser) {
      router.push('/admin-login');
    } else if (currentUser) {
      async function fetchIdentity() {
        const user = await getUserProfile(currentUser.uid)
        if (user.identity !== 'admin') {
          router.push('/admin-login');
        }
      }
      fetchIdentity()
    }
  }, [currentUser, loading, router]);

  // Alternatively, instead of redirecting, you can show a message or a loading indicator while checking the user's status
  if (!currentUser) {
    return <div>Loading or not authorized...</div>;
  }

  return (
    <div>
      <h1>Pending Profiles</h1>
    </div>
  );
}

export default Pending;
