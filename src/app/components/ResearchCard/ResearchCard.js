"use client";
import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { buttonClass } from "../ResearchPostRequestForm/ResearchPostRequestForm.styles";

const ResearchCard = ({
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
        title !== "" && selectedResearch.title === title && "border-primary"
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

export default ResearchCard;
