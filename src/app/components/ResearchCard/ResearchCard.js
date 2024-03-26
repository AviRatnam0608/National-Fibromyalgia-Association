"use client";
import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { buttonClass } from "../ResearchPostRequestForm/ResearchPostRequestForm.styles";

const ResearchCard = ({ title, imageUrl, body, buttonText, onButtonClick }) => {
  return (
    <div className="max-w-lg rounded overflow-hidden shadow-lg bg-white m-5">
      {imageUrl && (
        <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-black">{title}</div>
        <div className="text-gray-500 mb-2">PI: First Name, LI.</div>
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
