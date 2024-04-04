import {
  Divider,
  tagComponent,
} from "../ExtendedResearchCard/ExtendedResearchCard";

const AdminFeedbackCard = (props) => {
  const {
    title,
    logo,
    descriptionAndPurpose,
    researchTopics,
    participantExperience,
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
    endDate,
    nfaCompensation,
    children,
  } = props;

  const getDate = (date) => {
    const d = new Date(date);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return d.toLocaleDateString("en-US", options);
  };

  return (
    <div class="max-w-4xl mx-auto bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden flex flex-col md:flex-row my-5">
      <div class="flex-1 p-4">
        <div class="flex justify-between items-center">
          <h5 class="text-xl font-semibold tracking-tight text-gray-900">
            {title}
          </h5>
          <img
            class="w-10 h-10 rounded-full"
            src={`${logo}`}
            alt="Study Logo"
          />
        </div>

        <p class="mt-2 text-sm text-gray-700">{descriptionAndPurpose}</p>

        <div class="mt-4">
          <h6 class="font-semibold text-gray-900">Principal Investigator:</h6>
          <p class="text-sm text-gray-600">{principalInvestigator}</p>
        </div>

        <div class="mt-4">
          <h6 class="font-semibold text-gray-900">Recruitment Duration:</h6>
          <h3 class="text-sm text-gray-600">
            <span className="font-semibold">Start Date:</span>{" "}
            {getDate(startDate)}
          </h3>
          <h3 class="text-sm text-gray-600">
            <span className="font-semibold">End Date:</span> {getDate(endDate)}
          </h3>
        </div>

        <div class="mt-4">
          <h6 class="font-semibold text-gray-900">Research Topics:</h6>
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

        <div class="mt-4">
          <h6 class="font-semibold text-gray-900">Participant Experience:</h6>
          <p class="text-sm text-gray-600">{participantExperience}</p>
        </div>

        <div class="mt-4">
          <h6 class="font-semibold text-gray-900">Inclusion Criteria:</h6>
          <p class="text-sm text-gray-600">{inclusionCriteria}</p>
        </div>

        <div class="mt-4">
          <h6 class="font-semibold text-gray-900">Exclusion Criteria:</h6>
          <p class="text-sm text-gray-600">{exclusionCriteria}</p>
        </div>

        <div class="mt-4">
          <h6 class="font-semibold text-gray-900">Location:</h6>
          <p class="text-sm text-gray-600">{location}</p>
        </div>

        <div class="mt-4">
          <h6 class="font-semibold text-gray-900">Participant Compensation:</h6>
          <p class="text-sm text-gray-600">{compensation}</p>
        </div>

        <Divider />
        <h4 className="font-bold text-lg text-gray-800">NFA Information</h4>

        <div class="mt-4">
          <h6 class="font-semibold text-gray-900">NFA Compensation:</h6>
          <p class="text-sm text-gray-600">{nfaCompensation}</p>
        </div>

        <Divider />
        <h4 className="font-bold text-lg text-gray-800">Contact Information</h4>

        <div className="mt-4">
          <p className="text-sm text-gray-600">Name: {contactName}</p>
          <p className="text-sm text-blue-500 hover:underline">
            <a href={`mailto:${contactEmail}`}>Email: {contactEmail}</a>
          </p>
          <p className="text-sm text-blue-500 hover:underline">
            <a href={`tel:${contactPhone}`}>Phone: {contactPhone}</a>
          </p>
          <p className="text-sm text-blue-500 hover:underline">
            <a href={contactWebsite} target="_blank" rel="noopener noreferrer">
              Website
            </a>
          </p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default AdminFeedbackCard;
