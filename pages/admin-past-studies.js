import React, { useState, useEffect } from "react";
import { useAuth } from "../src/app/services/AuthContext";
import { useRouter } from "next/router";
import ExtendedResearchCard from "@/app/components/ExtendedResearchCard/ExtendedResearchCard";
import ResearchCard from "@/app/components/ResearchCard/ResearchCard";
import BigHeader from "@/app/components/BigHeader/BigHeader";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import Tab from "@/app/components/Tab/Tab";

export const checkIfResearchDatePassed = (research) => {
  const endDate = new Date(research?.recruitEndDate);
  const currentDate = new Date();
  return currentDate > endDate;
};

const PastStudiesArchive = () => {
  const { currentUser } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("denied");
  const [filteredResearchData, setFilteredResearchData] = useState([]);
  const [selectedResearch, setSelectedResearch] = useState({});
  const [showResearchInfo, setShowResearchInfo] = useState(false);

  const [deniedResearchData, setDeniedResearchData] = useState([]);
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
    const deniedData = researchData.filter(
      (research) => research.status === "denied"
    );
    const completedData = researchData.filter((research) =>
      checkIfResearchDatePassed(research)
    );

    console.log(deniedData);

    setDeniedResearchData(deniedData);
    setCompletedResearchData(completedData);
    setFilteredResearchData(researchData);

    if (activeTab === "denied") {
      setFilteredResearchData(deniedData);
    } else {
      setFilteredResearchData(completedData);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "denied") {
      setFilteredResearchData(deniedResearchData);
    } else {
      setFilteredResearchData(completedResearchData);
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

  console.log(filteredResearchData);
  console.log(activeTab);

  // Redirect to login page if not logged in
  useEffect(() => {
    if (!currentUser) {
      router.push("/admin-login");
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null; // or a loading indicator if you prefer
  }

  return (
    <div className="px-12 h-screen">
      <BigHeader>Denied and Expired Research Postings</BigHeader>
      <section className="my-6">
        <div>
          <div className="flex justify-start rounded-t-lg">
            <Tab
              label={"Denied"}
              onClickFunction={() => handleButtonClick("denied")}
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
                  {activeTab === "denied" &&
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

export default PastStudiesArchive;
