import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../src/app/services/AuthContext';
import AdminPending from '../src/app/components/AdminPendingStudies.js';

const AdminPendingPage = () => {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not loading and no user is logged in, redirect to login page
    if (!loading && !currentUser) {
      router.push('/login');
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
