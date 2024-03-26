"use client";
import BigHeader from "@/app/components/BigHeader/BigHeader";
import ExtendedResearchCard from "@/app/components/ExtendedResearchCard/ExtendedResearchCard";
import ResearchCard from "@/app/components/ResearchCard/ResearchCard";
import { db } from "@/app/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export const checkIfResearchActive = (research) => {
  const endDate = new Date(research?.postExpirationDate);
  const currentDate = new Date();
  return currentDate < endDate;
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [filteredResearchData, setFilteredResearchData] = useState([]);
  const [selectedResearch, setSelectedResearch] = useState({});
  const [showResearchInfo, setShowResearchInfo] = useState(false);

  const [activeResearchData, setActiveResearchData] = useState([]);
  const [completedResearchData, setCompletedResearchData] = useState([]);

  const fetchResearchPosts = async () => {
    const researchData = [];
    const querySnapshot = await getDocs(collection(db, "researchPosts"));
    querySnapshot.docs.map((doc) => {
      researchData.push(doc.data());
    });
    console.log("hello hello", researchData);
    filterResearchData(researchData);
  };

  const filterResearchData = (researchData) => {
    setActiveResearchData(
      researchData.filter((research) => checkIfResearchActive(research))
    );
    setCompletedResearchData(
      researchData.filter((research) => !checkIfResearchActive(research))
    );
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "active") {
      setFilteredResearchData(activeResearchData);
      console.log(filteredResearchData);
    } else {
      setFilteredResearchData(completedResearchData);
      console.log(filteredResearchData);
    }
  };

  useEffect(() => {
    fetchResearchPosts();
  }, []);

  const showResearchInformation = (research) => {
    setShowResearchInfo(true);
    setSelectedResearch(research);
  };

  const hideResearchInformation = () => {
    setSelectedResearch({});
    setShowResearchInfo(false);
  };

  return (
    <div>
      <BigHeader>Welcome to the NFA Admin Portal</BigHeader>

      <section>
        <div className="flex flex-col align-middle justify-start gap-10">
          <div
            onClick={() => {
              hideResearchInformation();
              handleTabChange("active");
            }}
            className="hover:cursor-pointer border-b-2 border-black p-10"
          >
            Active
          </div>
          <div
            onClick={() => {
              hideResearchInformation();
              handleTabChange("completed");
            }}
            className="cursor-pointer border-b-2 border-black"
          >
            Completed
          </div>
        </div>
      </section>

      <section>
        <div className="flex">
          <div className="w-full justify-center">
            {activeTab === "active" &&
              filteredResearchData.map((research) => (
                <ResearchCard
                  key={research.id}
                  title={research.title}
                  imageUrl={research.imageUrl}
                  body={research.body}
                  buttonText="Read More"
                  onButtonClick={() => showResearchInformation(research)}
                />
              ))}

            {activeTab === "completed" &&
              filteredResearchData.map((research) => (
                <ResearchCard
                  key={research.id}
                  title={research.title}
                  imageUrl={research.imageUrl}
                  body={research.body}
                  buttonText="Read More"
                  onButtonClick={() => showResearchInformation(research)}
                />
              ))}
          </div>
          <div className="bg-blue-500 w-full">
            {showResearchInfo ? (
              <ExtendedResearchCard research={selectedResearch} />
            ) : (
              <div className="flex justify-center items-center h-full">
                <img
                  src="./public/no_research_selected_image.svg"
                  alt="Select a research project"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
