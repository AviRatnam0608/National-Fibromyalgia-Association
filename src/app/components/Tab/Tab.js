const Tab = ({ label, onClickFunction, activeTab }) => {
  // Determine if the current tab is active to apply specific styles
  const isActive = activeTab === label.toLowerCase();

  return (
    <div>
      <button
        onClick={() => {
          onClickFunction();
        }}
        className={`text-lg px-4 py-2 mx-1 rounded-lg transition-colors duration-150 ${
          isActive
            ? "bg-gray-500 border-b-2 border-transparent text-white font-semibold"
            : "bg-gray-100 hover:bg-white border-b-2 hover:border-transparent"
        } focus:outline-none`}
      >
        {label}
      </button>
    </div>
  );
};

export default Tab;
