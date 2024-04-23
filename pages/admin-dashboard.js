"use client";
import BigHeader from "@/app/components/BigHeader/BigHeader";
import ExtendedResearchCard from "@/app/components/ExtendedResearchCard/ExtendedResearchCard";
import ResearchCard from "@/app/components/ResearchCard/ResearchCard";
import { db } from "@/app/firebase";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Tab from "@/app/components/Tab/Tab";
import { useRouter } from 'next/router';
import { useAuth } from '../src/app/services/AuthContext';
import { getUserProfile } from '@/app/services/firestoreOperations';

export const checkIfResearchActive = (research) => {
  const endDate = new Date(research?.recruitEndDate);
  const currentDate = new Date();
  return currentDate < endDate;
};

const Dashboard = () => {
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

  const [activeTab, setActiveTab] = useState("active");
  const [filteredResearchData, setFilteredResearchData] = useState([]);
  const [selectedResearch, setSelectedResearch] = useState({});
  const [showResearchInfo, setShowResearchInfo] = useState(false);

  const [activeResearchData, setActiveResearchData] = useState([]);
  const [completedResearchData, setCompletedResearchData] = useState([]);

  const fetchResearchStudies = async () => {
    const researchData = [];
    const querySnapshot = await getDocs(collection(db, "researchStudies"));
    const submissionsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    submissionsData.map((doc) => {
      researchData.push(doc);
    });
    filterResearchData(researchData);
  };

  const filterResearchData = (researchData) => {
    const activeData = researchData.filter((research) =>
      checkIfResearchActive(research)
    );
    const completedData = researchData.filter(
      (research) => !checkIfResearchActive(research)
    );

    setActiveResearchData(activeData);
    setCompletedResearchData(completedData);

    if (activeTab === "active") {
      setFilteredResearchData(activeData);
    } else {
      setFilteredResearchData(completedData);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "active") {
      setFilteredResearchData(activeResearchData);
      // console.log(filteredResearchData);
    } else {
      setFilteredResearchData(completedResearchData);
      // console.log(filteredResearchData);
    }
  };

  useEffect(() => {
    fetchResearchStudies();
  }, []);

  const showResearchInformation = (research) => {
    setShowResearchInfo(true);
    setSelectedResearch(research);
  };

  const hideResearchInformation = () => {
    setSelectedResearch({});
    setShowResearchInfo(false);
  };

  const handleButtonClick = (status) => {
    hideResearchInformation();
    handleTabChange(status);
  };

  const capitilizeWord = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <div className="px-12 h-screen">
      <BigHeader>Welcome to the NFA Admin Portal</BigHeader>
      <section className="my-6">
        <div>
          <div className="flex justify-start rounded-t-lg">
            <Tab
              label={"Active"}
              onClickFunction={() => handleButtonClick("active")}
              activeTab={activeTab}
            />
            <Tab
              label={"Completed"}
              onClickFunction={() => handleButtonClick("completed")}
              activeTab={activeTab}
            />
          </div>
          <div className="bg-white rounded-b-lg p-4">
            <section>
              <div className="font-semibold text-xl">
                All {capitilizeWord(activeTab)} Research Posts
              </div>
            </section>
            <section>
              <div className="flex">
                <div className="w-full justify-center">
                  {activeTab === "active" &&
                    filteredResearchData.map((research) => (
                      <ResearchCard
                        key={research.id}
                        {...research}
                        buttonText="Read More"
                        onButtonClick={() => showResearchInformation(research)}
                        selectedResearch={selectedResearch}
                      />
                    ))}

                  {activeTab === "completed" &&
                    filteredResearchData.map((research) => (
                      <ResearchCard
                        key={research.id}
                        {...research}
                        buttonText="Read More"
                        onButtonClick={() => showResearchInformation(research)}
                        selectedResearch={selectedResearch}
                      />
                    ))}
                </div>
                <div className="w-full h-screen">
                  {showResearchInfo ? (
                    <ExtendedResearchCard research={selectedResearch} />
                  ) : (
                    <div className="max-w-4xl mx-auto mt-4 p-56 h-56 bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden flex items-center justify-center">
                      <p className="text-sm text-gray-500">
                        No research selected
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
