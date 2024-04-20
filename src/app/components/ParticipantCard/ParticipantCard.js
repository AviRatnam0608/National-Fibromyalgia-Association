import React from "react";

const ParticipantCard = ({
  participant,
  selectedParticipant,
  onClickHandler,
}) => {
  const {
    id,
    firstName,
    lastName,
    email,
    phoneNumber,
    gender,
    birthday,
    studyHistory,
  } = participant;

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 max-w-sm mx-auto my-4 hover:shadow-lg hover:cursor-pointer transition duration-200
      ${selectedParticipant?.id === id && "border-2 border-primary"}
      `}
      onClick={() => onClickHandler()}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-semibold">
          {firstName} {lastName}
        </div>
        <div className="text-gray-500">{gender}</div>
      </div>
      <div className="text-sm text-gray-700 mb-2">Email: {email}</div>
      <div className="text-sm text-gray-700 mb-2">Phone: {phoneNumber}</div>
      <div className="text-sm text-gray-700 mb-2">DOB: {birthday}</div>
      <div className="text-sm text-gray-700 mb-2">
        Total Studies Participated:{" "}
        {studyHistory?.length ? studyHistory.length : "N/A"}
      </div>
    </div>
  );
};

export default ParticipantCard;
