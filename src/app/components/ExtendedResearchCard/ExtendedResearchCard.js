import React from "react";
import {
  FaStar,
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaDollarSign,
  FaExternalLinkAlt,
} from "react-icons/fa";
import {
  approvedResearchStyles,
  rejectedResearchStyles,
} from "./ExtendedResearchCard.styles";

const researchTags = [
  "Machine Learning",
  "Deep Learning",
  "Computer Vision",
  "Natural Language Processing",
];

// gert date in format of 12th Jan 2022
const getDate = (date) => {
  const d = new Date(date);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return d.toLocaleDateString("en-US", options);
};

const ExtendedResearchCard = ({ research }) => {
  return (
    <div className="max-w rounded overflow-hidden shadow-lg bg-white m-5 p-5">
      <div className="flex gap-5">
        {research?.logo && (
          <img
            className="w-1/2 h-48 object-cover"
            src={research.logo}
            alt={research.title}
          />
        )}
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl mb-2 text-black">
              {research.title}
            </span>
            <span className="text-sm mb-2 text-gray-700">
              {`# ${research.irbNumber}`}
            </span>
          </div>
          <div>
            <div>
              <FaStar className="inline mx-2" />
              <span className="text-gray-800">
                {research.principalInvestigator}
              </span>
            </div>
            <div>
              <FaUser className="inline mx-2" />
              <span className="text-gray-500 mb-2">hello</span>
            </div>
          </div>

          <div className="my-2">
            <FaPhoneAlt className="inline mx-2 items-center" />
            <span className="text-gray-500">{research.contactPhone}</span>
            <FaEnvelope className="inline mx-2 items-center" />
            <span className="text-gray-500">{research.contactEmail}</span>
          </div>
          <div>
            <div>
              <span className="font-bold">Start date:</span>{" "}
              {getDate(research.startDate)}
            </div>
            <div>
              <span className="font-bold">Expiration date:</span>{" "}
              {getDate(research.postExpirationDate)}
            </div>
          </div>
        </div>
      </div>

      <div className="py-4">
        <div className="flex flex-wrap gap-2 mb-1">
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
          {research.descriptionAndPurpose}
        </p>
      </div>
      <div>
        <span className="font-bold my-5 border-b-2 border-gray-700">
          Other Important Information
        </span>
        <div className="my-3 flex items-center">
          <FaMapMarkerAlt className="inline mx-2" />
          <span className="text-gray-500">{research.location}</span>
        </div>
        <div className="my-3 flex items-center">
          <FaDollarSign className="inline mx-2" />
          <span className="text-gray-500">{research.compensation}</span>
        </div>
        <div className="my-3 flex items-center">
          <FaExternalLinkAlt className="inline mx-2" />
          <span className="text-gray-500 hover:border-gray-800">
            <a
              href={research.contactWebsite}
              className="border-b-2 border-gray-500 hover:border-gray-800"
            >
              {research.contactWebsite}{" "}
            </a>
          </span>
        </div>
      </div>
      <div>
        <span className="font-bold my-5 border-b-2 border-gray-700">
          NFA Important Information
        </span>
        <div
          className={
            research.status === "approved"
              ? approvedResearchStyles
              : rejectedResearchStyles
          }
        >
          <span className="">{research.status}</span>
        </div>
        <div className="my-3 flex items-center">
          <FaDollarSign className="inline mx-2" />
          <span className="text-gray-500 text-center">
            {research.nfaCompensation}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExtendedResearchCard;
