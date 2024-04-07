import React, { useEffect } from "react";
import { useRouter } from "next/router";
import ResearchPostRequestForm from "../src/app/components/ResearchPostRequestForm/ResearchPostRequestForm";
import { useAuth } from "../src/app/services/AuthContext";

const NewResearchPage = () => {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page if not logged in and not loading
    if (!loading && !currentUser) {
      router.push('/login'); // Replace '/login' with your login route if it's different
    }
  }, [currentUser, loading, router]);

  // Optionally, show loading state or null while checking user status
  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <ResearchPostRequestForm />
    </div>
  );
};

export default NewResearchPage;
