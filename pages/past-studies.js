import React from "react";
import { useAuth } from "../src/app/services/AuthContext";
import { useRouter } from "next/router";

const PastStudiesArchive = () => {
  const { currentUser } = useAuth();
  const router = useRouter();

  // Redirect to login page if not logged in
  React.useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null; // or a loading indicator if you prefer
  }

  return (
    <div>
      <h1>Past Studies</h1>
    </div>
  );
};

export default PastStudiesArchive;
