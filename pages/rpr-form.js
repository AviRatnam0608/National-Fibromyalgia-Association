import React, { useEffect, useState } from "react";
import ResearchPostRequestForm from "../src/app/components/ResearchPostRequestForm/ResearchPostRequestForm";
import { useRouter } from 'next/navigation';
import { useAuth } from '../src/app/services/AuthContext';
import { getUserProfile } from '@/app/services/firestoreOperations';

const NewResearchPage = () => {
  const { currentUser, loading } = useAuth();
  const router = useRouter();
  const [uid, setUid] = useState()

  useEffect(() => {
    // If not loading and no user is logged in, redirect to login page
    if (!loading && !currentUser) {
      router.push('/login');
    } else if (currentUser) {
      setUid(currentUser.uid)
      async function fetchIdentity() {
        const user = await getUserProfile(currentUser.uid)
        if (user.identity !== 'researcher') {
          router.push('/login');
        }
      }
      fetchIdentity()
    }
  }, [currentUser, loading, router]);

  // Optionally, show loading state or null while checking user status
  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <ResearchPostRequestForm uid={uid} />
    </div>
  );
};

export default NewResearchPage;
