const Tab = ({ label, onClickFunction, activeTab }) => {
  return (
    <button
      onClick={() => {
        onClickFunction();
      }}
      className="border-b-2 border-black text-xl"
    >
      {label}
    </button>
  );
};

export default Tab;
