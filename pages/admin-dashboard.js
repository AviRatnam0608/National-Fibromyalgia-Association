"use client";
import BigHeader from "@/app/components/BigHeader/BigHeader";
import ExtendedResearchCard from "@/app/components/ExtendedResearchCard/ExtendedResearchCard";
import ResearchCard from "@/app/components/ResearchCard/ResearchCard";
import { useEffect, useState } from "react";

const API = "http://localhost:3000/api/research";

const completedResearchData = [
  {
    id: 1,
    title: "Completed Research 1",
    imageUrl: "https://via.placeholder.com/150",
    body: "This is a completed research project.",
    active: false,
  },
  {
    id: 2,
    title: "Completed Research 2",
    imageUrl: "https://via.placeholder.com/150",
    body: "This is an on going research project.",
    active: true,
  },
  {
    id: 3,
    title: "Completed Research 3",
    imageUrl: "https://via.placeholder.com/150",
    body: "This is a completed research project.",
    active: false,
  },
];

const Dashboard = () => {
  const [researchData, setResearchData] = useState([]);
  const [activeTab, setActiveTab] = useState("active");
  const [filteredResearchData, setFilteredResearchData] = useState([]);
  const [selectedResearch, setSelectedResearch] = useState({});
  const [showResearchInfo, setShowResearchInfo] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    fetchResearchData();
    if (tab === "active") {
      setFilteredResearchData(
        researchData.filter((research) => research.active)
      );
      console.log(filteredResearchData);
    } else {
      setFilteredResearchData(
        researchData.filter((research) => !research.active)
      );
      console.log(filteredResearchData);
    }
  };

  const fetchResearchData = async () => {
    // const response = await fetch(API);
    // const data = await response.json();
    setResearchData(completedResearchData);
  };

  useEffect(() => {
    fetchResearchData();
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
      <BigHeader>
        Welcome to the NFA Admin Portal
      </BigHeader>

      <section>
        <div className="flex flex-col align-middle justify-start gap-10">
          <div
            onClick={() => {
              hideResearchInformation();
              handleTabChange("active");
            }}
            className="hover:cursor-pointer border-b-2 border-black bg-red-500 p-10"
          >
            Active
          </div>
          <div
            onClick={() => {
              hideResearchInformation();
              handleTabChange("completed");
            }}
            className="cursor-pointer border-b-2 border-black bg-red-300"
          >
            Completed
          </div>
        </div>
      </section>

      <section>
        <div className="flex">
          <div className="bg-red-400 w-full justify-center">
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
