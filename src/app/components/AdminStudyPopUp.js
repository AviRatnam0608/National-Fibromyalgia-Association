import React, { useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const Modal = ({ isOpen, onClose, submission }) => {
  const [feedback, setFeedback] = useState('');

  const handleClose = () => {
    updateFeedback();
    onClose();
  };

  const updateFeedback = async () => {
    try {
      const submissionRef = doc(db, "researchStudies", submission.id);
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
            <p>{submission.description}</p>
          </div>
          <div style={fieldBorderStyle}>
            <h2><strong>Principal Investigator:</strong></h2>
            <p>{submission.principalInvestigator}</p>
          </div>
          <div style={fieldBorderStyle}>
            <h2><strong>Research Topics:</strong></h2>
            <p>{submission.researchTopics}</p>
          </div>
          <div style={fieldBorderStyle}>
            <h2><strong>Location:</strong></h2>
            <p>{submission.location}</p>
          </div>
          <div style={fieldBorderStyle}>
            <h2><strong>Compensation:</strong></h2>
            <p>{submission.compensation}</p>
          </div>
          <div style={fieldBorderStyle}>
            <h2><strong>Participant Experience:</strong></h2>
            <p>{submission.procedure}</p>
          </div>
          <div style={fieldBorderStyle}>
            <h2><strong>NFA Compensation:</strong></h2>
            <p>{submission.nfaCompensation}</p>
          </div>
          <div style={fieldBorderStyle}>
            <h2><strong>Inclusion Criteria:</strong></h2>
            <p>{submission.inclusionCriteria}</p>
          </div>
          <div style={fieldBorderStyle}>
            <h2><strong>Exclusion Criteria:</strong></h2>
            <p>{submission.exclusionCriteria}</p>
          </div>
          <div style={fieldBorderStyle}>
            <h2><strong>Contact Name:</strong></h2>
            <p>{submission.contactName}</p>
          </div>
          <div style={fieldBorderStyle}>
            <h2><strong>Contact Email:</strong></h2>
            <p>{submission.contactEmail}</p>
          </div>
          <div style={fieldBorderStyle}>
            <h2><strong>Contact Phone:</strong></h2>
            <p>{submission.contactPhone}</p>
          </div>
          <div style={fieldBorderStyle}>
            <h2><strong>Contact Website:</strong></h2>
            <p>{submission.contactWebsite}</p>
          </div>
          <div style={fieldBorderStyle}>
            <h2><strong>Additional Links:</strong></h2>
            <p>{submission.additionalLinks}</p>
          </div>
          <div style={fieldBorderStyle}>
            <h2><strong>Related Research:</strong></h2>
            <p>{submission.relatedResearch}</p>
          </div>
          <div style={fieldBorderStyle}>
            <h2><strong>Post Expiration Date:</strong></h2>
            <p>{submission.recruitEndDate}</p>
          </div>
          {/* Add any other fields here */}
        </>
      )}
    </div>
  );
};

export default Modal;
