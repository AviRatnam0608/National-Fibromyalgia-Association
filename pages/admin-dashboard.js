"use client";
import BigHeader from "@/app/components/BigHeader/BigHeader";
import ExtendedResearchCard from "@/app/components/ExtendedResearchCard/ExtendedResearchCard";
import ResearchCard from "@/app/components/ResearchCard/ResearchCard";
import { db } from "@/app/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { NoResearchImg, noResearchImg } from "../public/noResearchImg";
import Tab from "@/app/components/Tab/Tab";

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

  const fetchResearchStudies = async () => {
    const researchData = [];
    const querySnapshot = await getDocs(collection(db, "researchStudies"));
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

  return (
    <div>
      <BigHeader>Welcome to the NFA Admin Portal</BigHeader>

      <section>
        <div className="">
          <Tab
            label={"Active"}
            onClickFunction={() => handleButtonClick("active")}
            activeTab={activeTab}
          />
          <br />
          <Tab
            label={"Completed"}
            onClickFunction={() => handleButtonClick("completed")}
            activeTab={activeTab}
          />
        </div>
      </section>
      <section>
        <BigHeader>All {activeTab} Research Posts</BigHeader>
      </section>
      <section>
        <div className="flex">
          <div className="w-full justify-center">
            {activeTab === "active" &&
              filteredResearchData.map((research, key) => (
                <ResearchCard
                  key={key}
                  {...research}
                  buttonText="Read More"
                  onButtonClick={() => showResearchInformation(research)}
                  selectedResearch={selectedResearch}
                />
              ))}

            {activeTab === "completed" &&
              filteredResearchData.map((research, key) => (
                <ResearchCard
                  key={key}
                  {...research}
                  buttonText="Read More"
                  onButtonClick={() => showResearchInformation(research)}
                  selectedResearch={selectedResearch}
                />
              ))}
          </div>
          <div className="bg-blue-500 w-full">
            {showResearchInfo ? (
              <ExtendedResearchCard research={selectedResearch} />
            ) : (
              <div className="text-center h-1/2 w-1/2">
                <h1 className="text-xl">No Research Selected</h1>
                {noResearchImg}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
