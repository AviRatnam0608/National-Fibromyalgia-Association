import React from 'react';
import { useAuth } from '../src/app/services/AuthContext';
import { useRouter } from 'next/router';

function Pending() {
  const { currentUser } = useAuth();
  const router = useRouter();

  // If there's no current user, redirect to the login page
  React.useEffect(() => {
    if (!currentUser) {
      router.push('/login'); // Adjust the path to your login page as necessary
    }
  }, [currentUser, router]);

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
