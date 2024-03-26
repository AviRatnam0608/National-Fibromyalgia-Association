import React from "react";
import { FaStar, FaUser, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const researchTags = [
  "Machine Learning",
  "Deep Learning",
  "Computer Vision",
  "Natural Language Processing",
];

const researchers = "Linda Feshami, Dr. Danika Brinda";

const ExtendedResearchCard = ({ research }) => {
  return (
    <div className="max-w rounded overflow-hidden shadow-lg bg-white m-5 p-5">
      <div className="flex gap-5">
        {research?.imageUrl && (
          <img
            className="w-1/2 h-48 object-cover"
            src={research.imageUrl}
            alt={research.title}
          />
        )}
        <div>
          <div className="font-bold text-xl mb-2 text-black">
            {research.title}
          </div>
          <div>
            <div>
              <FaStar className="inline mx-2" />
              <span className="text-gray-800">Linda Feshami</span>
            </div>
            <div>
              <FaUser className="inline mx-2" />
              <span className="text-gray-500 mb-2">{researchers}</span>
            </div>
          </div>

          <div className="my-2">
            <FaPhoneAlt className="inline mx-2 align-middle" />
            <span className="text-gray-500">+91 9876543210</span>
            <FaEnvelope className="inline mx-2 align-middle" />
            <span className="text-gray-500"></span>
          </div>
          <div>
            <div>Start date: {research.startDate}</div>
            <div>Valid Till: {research.startDate}</div>
          </div>
        </div>
      </div>

      <div className="py-4">
        <div className="flex flex-wrap gap-2 py-2 mb-1">
          {researchTags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray-700 text-base overflow-hidden">
          {research.body}
        </p>
      </div>
    </div>
  );
};

export default ExtendedResearchCard;
