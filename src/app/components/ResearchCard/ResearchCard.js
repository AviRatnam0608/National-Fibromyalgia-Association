"use client";
import React from "react";
// import PropTypes from "prop-types";
import { FaChevronRight } from "react-icons/fa";

const ResearchCard = ({ title, imageUrl, body, buttonText, onButtonClick }) => {
  return (
    <div className="max-w-md rounded overflow-hidden shadow-lg bg-white m-auto">
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
          <button
            onClick={onButtonClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {buttonText}
            <FaChevronRight className="inline ml-2" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ResearchCard;
