"use client";
import BigHeader from "@/app/components/BigHeader/BigHeader";
import ResearchCard from "@/app/components/ResearchCard/ResearchCard";
import { useState } from "react";

const API = "http://localhost:3000/api/research";

const Dashboard = () => {
  const [researchData, setResearchData] = useState([]);

  const fetchResearchData = async () => {
    const response = await fetch(API);
    const data = await response.json();
    setResearchData(data);
  };

  return (
    <div className="px-11 bg-red-400">
      <BigHeader>
        Welcome to the National Fibromyalgia Association Researcher Portal
      </BigHeader>
      <div className="flex justify-start align-middle gap-10">
        <span className="bg-red-500 p-52 cursor-pointer">Active Research</span>
        <span>Completed Research</span>
      </div>
      <div className="">
        {researchData &&
          researchData.map((research) => (
            <ResearchCard
              key={research.id}
              title={research.title}
              imageUrl={research.imageUrl}
              body={research.body}
              buttonText="Read More"
              onButtonClick={() => alert("Button clicked!")}
            />
          ))}
        <ResearchCard
          title="Research Title"
          imageUrl="https://via.placeholder.com/300"
          body="This is the body of the research ResearchCard. It should contain a brief description of the research."
          buttonText="Read More"
          onButtonClick={() => alert("Button clicked!")}
        />
      </div>
    </div>
  );
};

export default Dashboard;
