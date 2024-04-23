import ResearcherPending from "@/app/components/ResearcherPendingStudies";
import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useAuth } from '../src/app/services/AuthContext';
import { getUserProfile } from '@/app/services/firestoreOperations';

const ResearcherPendingPage = () => {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not loading and no user is logged in, redirect to login page
    if (!loading && !currentUser) {
      router.push('/login');
    } else if (currentUser) {
      async function fetchIdentity() {
        const user = await getUserProfile(currentUser.uid)
        if (user.identity !== 'researcher') {
          router.push('/login');
        }
      }
      fetchIdentity()
    }
  }, [currentUser, loading, router]);

  return (
    <div>
      <ResearcherPending />
    </div>
  );
};
export default ResearcherPendingPage;
