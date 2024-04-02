"use client";
import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { buttonClass } from "../ResearchPostRequestForm/ResearchPostRequestForm.styles";

const hello = ({
  imageUrl,
  title,
  principalInvestigator,
  body,
  irbNumber,
  buttonText,
  onButtonClick,
  selectedResearch,
}) => {
  return (
    <div
      className={`max-w-lg border-4 border-gray-300 rounded overflow-hidden shadow-lg bg-white m-5 ${
        title !== "" && selectedResearch?.title === title && "border-primary"
      }`}
    >
      {imageUrl && (
        <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-black">{title}</div>
        <div className="text-gray-500 mb-2">{principalInvestigator}</div>
        <p className="text-gray-700 text-base overflow-hidden">{body}</p>
      </div>
      {buttonText && onButtonClick && (
        <div className="px-6 pt-4 pb-2 flex justify-end">
          <button onClick={onButtonClick} className={buttonClass}>
            {buttonText}
            <FaChevronRight className="inline ml-2" />
          </button>
        </div>
      )}
    </div>
  );
};

const ResearchCard = ({
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
        title !== "" &&
        selectedResearch.title === title &&
        " border-2 border-primary"
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
