import React from "react";

export const Divider = () => {
  return <div className="border-t border-gray-200 my-5"></div>;
};

export const tagComponent = (tags) => {
  return tags.map((tag) => (
    <span className="inline-block text-xs bg-gray-200 rounded-full px-3 py-1 font-semibold text-gray-700 mr-2">
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
    adminPending: "Pending Admin Approval",
    researcherPending: "Pending Researcher Approval",
    accepted: "Accepted",
    denied: "Denied",
  };

  const statusColor = {
    adminPending: "text-yellow-600",
    researcherPending: "text-yellow-600",
    accepted: "text-green-600",
    denied: "text-red-700",
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden my-5">
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-5">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900">
              {research.title}
            </h5>
            <p className="text-sm text-gray-700">
              IRB Number: {research.irbNumber}
            </p>
          </div>
          <img
            className="w-10 h-10 rounded-full"
            src={`${research.logoUri}`}
            alt="Study Logo"
          />
        </div>

        <p className="mt-2 text-sm text-gray-700">
          {research.description}
        </p>

        <div className="mt-4">
          <h6 className="font-semibold text-gray-900">Principal Investigator:</h6>
          <p className="text-sm text-gray-600">{research.principalInvestigator}</p>
        </div>

        <div className="mt-4">
          <h6 className="font-semibold text-gray-900">Recruitment Duration:</h6>
          <h3 className="text-sm text-gray-600">
            <span className="font-semibold">Start Date:</span>{" "}
            {getDate(research.startDate)}
          </h3>
          <h3 className="text-sm text-gray-600">
            <span className="font-semibold">End Date:</span>{" "}
            {getDate(research.recruitEndDate)}
          </h3>
        </div>

        <div className="mt-4">
          <h6 className="font-semibold text-gray-900">Research End Date:</h6>
          <p className="text-sm text-gray-600">{getDate(research.studyEndDate)}</p>
        </div>

        <div className="mt-4">
          <h6 className="font-semibold text-gray-900">Research Topics:</h6>
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

        <div className="mt-4">
          <h6 className="font-semibold text-gray-900">Participant Experience:</h6>
          <p className="text-sm text-gray-600">{research.procedure}</p>
        </div>

        <div className="mt-4">
          <h6 className="font-semibold text-gray-900">Inclusion Criteria:</h6>
          <p className="text-sm text-gray-600">{research.inclusionCriteria}</p>
        </div>

        <div className="mt-4">
          <h6 className="font-semibold text-gray-900">Exclusion Criteria:</h6>
          <p className="text-sm text-gray-600">{research.exclusionCriteria}</p>
        </div>

        <div className="mt-4">
          <h6 className="font-semibold text-gray-900">Location:</h6>
          <p className="text-sm text-gray-600">{research.location}</p>
        </div>

        <div className="mt-4">
          <h6 className="font-semibold text-gray-900">Participant Compensation:</h6>
          <p className="text-sm text-gray-600">{research.compensation}</p>
        </div>

        <Divider />
        <h4 className="font-bold text-lg text-gray-800">NFA Information</h4>

        <div className="mt-4">
          <h6 className="font-semibold text-gray-900">NFA Compensation:</h6>
          <p className="text-sm text-gray-600">{research.nfaCompensation}</p>
        </div>

        <div className="mt-4">
          <h6 className="font-semibold text-gray-900">Status:</h6>
          <p
            className={`text-sm ${
              statusColor[research.status]
            } font-semibold text-gray-600`}
          >
            {pendingStatus[research.status]}
          </p>
        </div>

        <Divider />
        <h4 className="font-bold text-lg text-gray-800">Contact Information</h4>

        <div className="mt-4">
          <p className="text-sm text-gray-600">Name: {research.contactName}</p>
          <p className="text-sm">
            {'Email: '}
            <a className="text-blue-500 hover:underline" href={`mailto:${research.contactEmail}`}>
              {research.contactEmail}
            </a>
          </p>
          <p className="text-sm">
            {'Phone: '}
            <a className="text-blue-500 hover:underline" href={`tel:${research.contactPhone}`}>
              {research.contactPhone}
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
        <div className="mt-4">
          <div className="text-sm text-gray-600">
            <h6 className="font-semibold text-gray-900">Additional Links:</h6>
            {research.additionalLinks ? research.additionalLinks : "N/A"}
          </div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-gray-600">
            <h6 className="font-semibold text-gray-900">Related Research:</h6>
            {research.relatedResearch && research.relatedResearch.length !== 0 ? research.relatedResearch.map((element, idx) => {
                return (
                  <p key={idx} className="text-sm text-blue-500 hover:underline">
                    <a href={element}>{element}</a>
                  </p>
                )
              }
            ) : 'N/A'}
          </div>
        </div>
        <div className="mt-4">
          <h6 className="font-semibold text-gray-900">Video Presentation:</h6>
          <div className="text-sm text-gray-600">
            <video className="w-full" controls>
              <source src={research.videoUri} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtendedResearchCard;
