"use client";
import React from "react";
import { FaChevronRight } from "react-icons/fa";

const ResearchCard = ({
  id,
  title,
  principalInvestigator,
  onButtonClick,
  irbNumber,
  imageUrl,
  selectedResearch,
}) => {
  return (
    <div
      className={`m-5 border p-4 rounded shadow hover:shadow-lg transition duration-300 ${
        selectedResearch.id === id && "border-2 border-primary"
      }`}
    >
      {imageUrl && (
        <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
      )}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-700">IRB Number: {irbNumber}</p>
      </div>

      <p className="text-sm text-gray-700">
        Principal Investigator: {principalInvestigator}
      </p>

      <button
        className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-500 flex items-center"
        onClick={onButtonClick}
      >
        Read More
        <FaChevronRight className="inline ml-2 mt-0.5" />
      </button>
    </div>
  );
};

export default ResearchCard;
