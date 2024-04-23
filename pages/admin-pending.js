import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../src/app/services/AuthContext';
import AdminPending from '../src/app/components/AdminPendingStudies.js';
import { getUserProfile } from '@/app/services/firestoreOperations';

const AdminPendingPage = () => {
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

  // Optional: show loading state while checking user authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AdminPending />
    </>
  );
};

export default AdminPendingPage;
