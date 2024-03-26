const Tab = ({ label, active, onChange }) => {
  return (
    <button
      className={`flex items-center justify-center ${
        active ? "bg-red-500" : "bg-red-400"
      }`}
    >
      <span
        className={`text-lg font-bold ${
          active ? "text-white" : "text-red-500"
        }`}
      >
        {label}
      </span>
      {active && <div className="text-lg font-bold">Completed Research</div>}
    </button>
  );
};

export default Tab;
