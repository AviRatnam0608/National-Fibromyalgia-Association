import React from 'react';

const ResearcherModal = ({ isOpen, onClose, submission }) => {
  const modalStyle = {
    display: isOpen ? 'block' : 'none', 
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '40px',
    zIndex: 1000,
    border: '3px solid black',
    width: '50vw',
    maxHeight: '80%',
    overflowY: 'auto'
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '5px',
    right: '10px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    padding: '5px 5px',
    cursor: 'pointer'
  };

  return (
    <div style={modalStyle}>
      <button onClick={onClose} style={closeButtonStyle}>Close</button>
      {submission && (
        <>
          <h2>Title: {submission.title}</h2>
          <p>IRB Number: {submission.irbNumber}</p>
          <p>Admin Feedback: {submission.adminFeedback}</p>
          {/* Add other fields relevant to researchers */}
        </>
      )}
    </div>
  );
};

export default ResearcherModal;