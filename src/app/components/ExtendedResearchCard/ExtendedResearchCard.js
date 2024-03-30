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

const ResearchCardSection = ({ title, value, children }) => {
  return (
    <div className="my-1 flex items-center gap-1">
      {children}
      <span className="font-bold">{title}: </span>
      <span className="text-gray-800">{value}</span>
    </div>
  );
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
            <ResearchCardSection
              title="Principal Investigator"
              value={research.principalInvestigator}
            >
              <FaStar className="inline mx-2" />
            </ResearchCardSection>

            <ResearchCardSection
              title="Research Team"
              value={research.researchTeam}
            >
              <FaUser className="inline mx-2" />
            </ResearchCardSection>
          </div>

          <div className="my-2">
            <span className="font-bold my-5 border-b-2 border-gray-700">
              Contact Information
            </span>
            <div className="flex flex-col items-start gap-1">
              <ResearchCardSection
                title="Contact Name"
                value={research.contactPerson}
              >
                <FaUser className="inline mx-2" />
              </ResearchCardSection>

              <ResearchCardSection
                title="Phone Number"
                value={research.contactPhone}
              >
                <FaPhoneAlt className="inline mx-2 items-center" />
              </ResearchCardSection>

              <ResearchCardSection
                title="Email Address"
                value={research.contactEmail}
              >
                <FaEnvelope className="inline mx-2 items-center" />
              </ResearchCardSection>
            </div>
          </div>
          <div>
            <ResearchCardSection
              title="Start date"
              value={getDate(research.startDate)}
            />
            <ResearchCardSection
              title="Expiration date"
              value={getDate(research.postExpirationDate)}
            />
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
        <ResearchCardSection title="Location" value={research.location}>
          <FaMapMarkerAlt className="inline mx-2" />
        </ResearchCardSection>
        {/* 
        <div className="my-3 flex items-center">
          <FaDollarSign className="inline mx-2" />
          <span className="text-gray-500">{research.compensation}</span>
        </div> */}
        <ResearchCardSection title="Compensation" value={research.compensation}>
          <FaDollarSign className="inline mx-2" />
        </ResearchCardSection>

        <div className="my-1 flex items-center gap-1">
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
      <div className="py-5">
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
        <ResearchCardSection
          title="NFA Compensation"
          value={research.nfaCompensation}
        >
          <FaDollarSign className="inline mx-2" />
        </ResearchCardSection>
      </div>
    </div>
  );
};

export default ExtendedResearchCard;
