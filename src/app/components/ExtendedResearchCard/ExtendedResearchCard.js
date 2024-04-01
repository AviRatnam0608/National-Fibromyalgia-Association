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

const Divider = () => {
  return <div class="border-t border-gray-200 my-5"></div>;
};

const ExtendedResearchCard = ({ research }) => {
  const getDate = (date) => {
    const d = new Date(date);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return d.toLocaleDateString("en-US", options);
  };

  return (
    <div class="max-w-4xl mx-auto bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden my-5">
      <div class="flex-1 p-4">
        <div class="flex justify-between items-center">
          <div className="flex items-center gap-5">
            <h5 class="text-xl font-semibold tracking-tight text-gray-900">
              {research.title}
            </h5>
            <p className="text-sm text-gray-700">
              IRB Number: {research.irbNumber}
            </p>
          </div>
          <img
            class="w-10 h-10 rounded-full"
            src={`${research.logo}`}
            alt="Study Logo"
          />
        </div>

        <p class="mt-2 text-sm text-gray-700">
          {research.descriptionAndPurpose}
        </p>

        <div class="mt-4">
          <h6 class="font-semibold text-gray-900">Principal Investigator:</h6>
          <p class="text-sm text-gray-600">{research.principalInvestigator}</p>
        </div>

        <div class="mt-4">
          <h6 class="font-semibold text-gray-900">Recruitment Duration:</h6>
          <h3 class="text-sm text-gray-600">
            <span className="font-semibold">Start Date:</span>{" "}
            {getDate(research.startDate)}
          </h3>
          <h3 class="text-sm text-gray-600">
            <span className="font-semibold">End Date:</span>{" "}
            {getDate(research.postExpirationDate)}
          </h3>
        </div>

        <div class="mt-4">
          <h6 class="font-semibold text-gray-900">Research End Date:</h6>
          <p class="text-sm text-gray-600">{getDate(research.endDate)}</p>
        </div>

        <div class="mt-4">
          <h6 class="font-semibold text-gray-900">Research Topics:</h6>
          <p class="text-sm text-gray-600">{research.researchTopics}</p>
        </div>

        <Divider />
        <h4 className="font-bold text-lg text-gray-800">
          Participant Information
        </h4>

        <div class="mt-4">
          <h6 class="font-semibold text-gray-900">Participant Experience:</h6>
          <p class="text-sm text-gray-600">{research.participantExperience}</p>
        </div>

        <div class="mt-4">
          <h6 class="font-semibold text-gray-900">Inclusion Criteria:</h6>
          <p class="text-sm text-gray-600">{research.inclusionCriteria}</p>
        </div>

        <div class="mt-4">
          <h6 class="font-semibold text-gray-900">Exclusion Criteria:</h6>
          <p class="text-sm text-gray-600">{research.exclusionCriteria}</p>
        </div>

        <div class="mt-4">
          <h6 class="font-semibold text-gray-900">Location:</h6>
          <p class="text-sm text-gray-600">{research.location}</p>
        </div>

        <div class="mt-4">
          <h6 class="font-semibold text-gray-900">Participant Compensation:</h6>
          <p class="text-sm text-gray-600">{research.compensation}</p>
        </div>

        <Divider />
        <h4 className="font-bold text-lg text-gray-800">NFA Information</h4>

        <div class="mt-4">
          <h6 class="font-semibold text-gray-900">NFA Compensation:</h6>
          <p class="text-sm text-gray-600">{research.nfaCompensation}</p>
        </div>

        <div class="mt-4">
          <h6 class="font-semibold text-gray-900">Status:</h6>
          <p
            class={`text-sm ${
              research.status === "accepted"
                ? "text-green-600"
                : research.status === "pending"
                ? "text-yellow-600"
                : "text-red-700"
            }`}
          >
            {research.status}
          </p>
        </div>

        <Divider />
        <h4 className="font-bold text-lg text-gray-800">Contact Information</h4>

        <div className="mt-4">
          <p className="text-sm text-gray-600">Name: {research.contactName}</p>
          <p className="text-sm text-blue-500 hover:underline">
            <a href={`mailto:${research.contactEmail}`}>
              Email: {research.contactEmail}
            </a>
          </p>
          <p className="text-sm text-blue-500 hover:underline">
            <a href={`tel:${research.contactPhone}`}>
              Phone: {research.contactPhone}
            </a>
          </p>
          <p className="text-sm text-blue-500 hover:underline">
            <a
              href={research.contactWebsite}
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
            </a>
          </p>
        </div>

        <Divider />
        <h4 className="font-bold text-lg text-gray-800">Extra</h4>
        <div class="mt-4">
          <p class="text-sm text-gray-600">
            <h6 class="font-semibold text-gray-900">Additional Links:</h6>
            {research.additionalLinks ? research.additionalLinks : "N/A"}
          </p>
        </div>
        <div class="mt-4">
          <p class="text-sm text-gray-600">
            <h6 class="font-semibold text-gray-900">Related Research:</h6>
            {research.relatedResearch ? research.relatedResearch : "N/A"}
          </p>
        </div>
        <div class="mt-4">
          <h6 class="font-semibold text-gray-900">Video Presentation:</h6>
          <div class="text-sm text-gray-600">
            <video class="w-full" controls>
              <source src={research.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtendedResearchCard;
