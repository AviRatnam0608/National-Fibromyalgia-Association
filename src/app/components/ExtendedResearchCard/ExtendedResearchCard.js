import React from "react";

export const Divider = () => {
  return <div class="border-t border-gray-200 my-5"></div>;
};

export const tagComponent = (tags) => {
  return tags.map((tag) => (
    <span class="inline-block text-xs bg-gray-200 rounded-full px-3 py-1 font-semibold text-gray-700 mr-2">
      {tag}
    </span>
  ));
};

const ExtendedResearchCard = ({ research }) => {
  const getDate = (date) => {
    const d = new Date(date);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return d.toLocaleDateString("en-US", options);
  };

  const pendingStatus = {
    researcherPending: "Pending Approval",
    accepted: "Accepted",
    rejected: "Rejected ",
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
          <div className="flex-col flex gap-2 mt-1">
            <p>
              <span className="text-sm text-gray-600">Medical Conditions:</span>{" "}
              {tagComponent(research.researchTopics.conditions)}
            </p>
            <p>
              <span className="text-sm text-gray-600">Research Topics:</span>{" "}
              {tagComponent(research.researchTopics.topics)}
            </p>
            <p>
              <span className="text-sm text-gray-600">Research Types:</span>{" "}
              {tagComponent(research.researchTopics.types)}
            </p>
          </div>
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
                : research.status === "researcherPending"
                ? "text-yellow-600"
                : "text-red-700"
            }`}
          >
            {pendingStatus[research.status]}
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
