import React from 'react';
import { useAuth } from '../src/app/services/AuthContext';
import { useRouter } from 'next/router';

function Pending() {
  const { currentUser } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    // If there is no current user, redirect to the login page
    if (!currentUser) {
      router.push('/login'); // Adjust the path as necessary
    }
  }, [currentUser, router]);

  // Optionally, show loading or a placeholder while checking the user's status
  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Active Studies</h1>
    </div>
  );
}

export default Pending;
