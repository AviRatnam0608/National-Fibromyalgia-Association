import { FaExclamationTriangle } from "react-icons/fa";

const NothingToShow = ({ description }) => {
  return (
    <div className="text-gray-600 mb-10 flex justify-center align-center gap-2">
      <FaExclamationTriangle className="text-yellow-500 h-5 w-5" />
      <span>{description}</span>
    </div>
  );
};

export default NothingToShow;
