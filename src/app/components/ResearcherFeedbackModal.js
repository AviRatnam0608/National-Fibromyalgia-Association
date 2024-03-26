import React, { useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const ResearcherModal = ({ isOpen, onClose, submission }) => {
  const [feedback, setFeedback] = useState('');

  const handleClose = () => {
    updateFeedback();
    onClose();
  };

  const updateFeedback = async () => {
    try {
      const submissionRef = doc(db, "researchPosts", submission.id);
      await updateDoc(submissionRef, { feedback });
      // Optionally, you can provide a success message or handle errors here
    } catch (error) {
      console.error("Error updating feedback:", error);
      // Handle error
    }
  };

  const modalStyle = {
    display: isOpen && submission ? 'block' : 'none',
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

  const fieldBorderStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    border: '1px solid black',
    padding: '5px',
    marginBottom: '10px',
    borderRadius: '5px'
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
      {submission && (
        <>
          <button onClick={handleClose} style={closeButtonStyle}>Close</button>
          <div style={fieldBorderStyle}>
            <h2><strong>Title:</strong></h2>
            <p>{submission.title}</p>
          </div>
          <div style={fieldBorderStyle}>
            <h2><strong>Description:</strong></h2>
            <p>{submission.descriptionAndPurpose}</p>
          </div>
          <div style={fieldBorderStyle}>
            <h2><strong>Principal Investigator:</strong></h2>
            <p>{submission.principalInvestigator}</p>
          </div>
          {/* Add other fields relevant to researchers */}
        </>
      )}
    </div>
  );
};

export default ResearcherModal;