import React, { useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import Modal from './AdminPopUp'; // Assuming you have a Modal component

const ResearcherPendingPage = () => {
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [feedback, setFeedback] = useState('');

  const handleViewFeedback = async (submissionId) => {
    try {
      const feedbackDocRef = doc(db, 'feedback', submissionId);
      const feedbackDocSnapshot = await getDoc(feedbackDocRef);
      if (feedbackDocSnapshot.exists()) {
        const feedbackData = feedbackDocSnapshot.data();
        setFeedback(feedbackData.feedbackText);
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
      // Handle error
    }
  };

  const handleCloseFeedbackModal = () => {
    setFeedback('');
  };

  return (
    <div>
      {/* Render submission list with View Feedback button */}
      {submissions.map((submission) => (
        <div key={submission.id}>
          <h2>{submission.title}</h2>
          {/* Other submission details */}
          <button onClick={() => handleViewFeedback(submission.id)}>View Feedback</button>
        </div>
      ))}

      {/* Modal to display feedback */}
      <Modal isOpen={!!feedback} onClose={handleCloseFeedbackModal} submission={selectedSubmission}>
        <p>{feedback}</p>
      </Modal>

      {/* Render Resubmit button */}
      <button>Resubmit</button>
    </div>
  );
};

export default ResearcherPendingPage;