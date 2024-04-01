const ResearchFeedbackCard = (props) => {
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
    feedback,
    startDate,
    endDate,
    nfaCompensation,
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
          <p class="text-sm text-gray-600">{researchTopics}</p>
        </div>

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

        <div class="mt-4">
          <h6 class="font-semibold text-gray-900">NFA Compensation:</h6>
          <p class="text-sm text-gray-600">{nfaCompensation}</p>
        </div>

        <div class="mt-4">
          <p class="text-sm text-gray-600">Contact: {contactName}</p>
          <p class="text-sm text-blue-500 hover:underline">
            <a href="mailto:{ contactEmail }">Email: {contactEmail}</a> |
            <a href="tel:{ contactPhone }">Call: {contactPhone}</a> |
            <a href={`${contactWebsite}`} target="_blank">
              Website
            </a>
          </p>
        </div>
      </div>

      <div class="w-full md:w-96 border-t md:border-t-0 md:border-l border-gray-200 p-4">
        <h5 class="text-lg font-semibold text-gray-900">Feedback</h5>

        <p class="mt-2 text-sm text-gray-600">
          {feedback?.length !== 0 ? feedback : "N/A"}
        </p>

        <div class="flex mt-4">
          <button
            class="bg-green-500 hover:bg-green-700 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-2 ease-linear transition-all duration-150"
            type="button"
          >
            Accept
          </button>
          <button
            class="bg-red-500 hover:bg-red-700 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
            type="button"
          >
            Reject
          </button>
        </div>
        <div className="text-gray-500 font-semibold text-sm">
          <p>
            Accept: Means you are accepting and agreeing to include the feedback
            provided into the research proposal.
          </p>
          <p>
            Reject: Means you are rejecting the feedback provided and will not
            include the feedback into the research proposal. In this case, you
            may provide a reason for rejecting the feedback.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResearchFeedbackCard;
