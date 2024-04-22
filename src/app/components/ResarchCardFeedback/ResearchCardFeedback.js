import {
  Divider,
  tagComponent,
} from "../ExtendedResearchCard/ExtendedResearchCard";

const ResearchFeedbackCard = (props) => {
  const {
    title,
    logoUri,
    description,
    researchTopics,
    procedure,
    inclusionCriteria,
    exclusionCriteria,
    principalInvestigator,
    location,
    compensation,
    contactName,
    contactEmail,
    contactPhone,
    contactWebsite,
    startDate,
    recruitEndDate,
    nfaCompensation,
    children,
  } = props;

  const getDate = (date) => {
    const d = new Date(date);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return d.toLocaleDateString("en-US", options);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden flex flex-col md:flex-row my-5">
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">
            {title}
          </h5>
          <img
            className="w-10 h-10 rounded-full"
            src={`${logoUri}`}
            alt="Study Logo"
          />
        </div>

        <p className="mt-2 text-sm text-gray-700">{description}</p>

        <div className="mt-4">
          <h6 className="font-semibold text-gray-900">Principal Investigator:</h6>
          <p className="text-sm text-gray-600">{principalInvestigator}</p>
        </div>

        <div className="mt-4">
          <h6 className="font-semibold text-gray-900">Recruitment Duration:</h6>
          <h3 className="text-sm text-gray-600">
            <span className="font-semibold">Start Date:</span>{" "}
            {getDate(startDate)}
          </h3>
          <h3 className="text-sm text-gray-600">
            <span className="font-semibold">End Date:</span> {getDate(recruitEndDate)}
          </h3>
        </div>

        <div className="mt-4">
          <h6 className="font-semibold text-gray-900">Research Topics:</h6>
          <div className="flex-col flex gap-2 mt-1">
            <p>
              <span className="text-sm text-gray-600">Medical Conditions:</span>{" "}
              {tagComponent(researchTopics.conditions)}
            </p>
            <p>
              <span className="text-sm text-gray-600">Research Topics:</span>{" "}
              {tagComponent(researchTopics.topics)}
            </p>
            <p>
              <span className="text-sm text-gray-600">Research Types:</span>{" "}
              {tagComponent(researchTopics.types)}
            </p>
          </div>
        </div>

        <Divider />
        <h4 className="font-bold text-lg text-gray-800">
          Participant Information
        </h4>

        <div className="mt-4">
          <h6 className="font-semibold text-gray-900">Participant Experience:</h6>
          <p className="text-sm text-gray-600">{procedure}</p>
        </div>

        <div className="mt-4">
          <h6 className="font-semibold text-gray-900">Inclusion Criteria:</h6>
          <p className="text-sm text-gray-600">{inclusionCriteria}</p>
        </div>

        <div className="mt-4">
          <h6 className="font-semibold text-gray-900">Exclusion Criteria:</h6>
          <p className="text-sm text-gray-600">{exclusionCriteria}</p>
        </div>

        <div className="mt-4">
          <h6 className="font-semibold text-gray-900">Location:</h6>
          <p className="text-sm text-gray-600">{location}</p>
        </div>

        <div className="mt-4">
          <h6 className="font-semibold text-gray-900">Participant Compensation:</h6>
          <p className="text-sm text-gray-600">{compensation}</p>
        </div>

        <Divider />
        <h4 className="font-bold text-lg text-gray-800">NFA Information</h4>

        <div className="mt-4">
          <h6 className="font-semibold text-gray-900">NFA Compensation:</h6>
          <p className="text-sm text-gray-600">{nfaCompensation}</p>
        </div>

        <Divider />
        <h4 className="font-bold text-lg text-gray-800">Contact Information</h4>

        <div className="mt-4">
          <p className="text-sm text-gray-600">Contact: {contactName}</p>
          <p className="text-sm text-blue-500 hover:underline">
            <a href="mailto:{ contactEmail }">Email: {contactEmail}</a> |
            <a href="tel:{ contactPhone }">Call: {contactPhone}</a> |
            <a href={`${contactWebsite}`} target="_blank">
              Website
            </a>
          </p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default ResearchFeedbackCard;
