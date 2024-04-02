import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Modal from '../AdminPendingApproval/AdminStudyInfoPopUp';

const ResearcherPendingPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      // Update query to fetch submissions with 'researcherPending' status
      const q = query(collection(db, "researchStudies"), where("status", "==", "researcherPending"));
      const querySnapshot = await getDocs(q);
      const submissionsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSubmissions(submissionsData);
    };

    fetchSubmissions();
  }, []);

  const handleViewFeedback = (submission) => {
    setSelectedSubmission(submission);
  };

  const handleCloseFeedbackModal = () => {
    setSelectedSubmission(null);
  };

  return (
    <div>
      {submissions.map((submission) => (
        <div key={submission.id}>
          <h2>{submission.title}</h2>
          {/* Conditionally render the 'View Feedback' button if admin feedback is available */}
          {submission.adminFeedback && (
            <button onClick={() => handleViewFeedback(submission)}>View Feedback</button>
          )}
        </div>
      ))}

      {/* Modal to display feedback */}
      {selectedSubmission && (
        <Modal isOpen={!!selectedSubmission} onClose={handleCloseFeedbackModal}>
          <h3>{selectedSubmission.title}</h3>
          <p>Feedback: {selectedSubmission.adminFeedback}</p>
        </Modal>
      )}

      {/* Render Resubmit button if the selected submission is available and its status is 'researcherPending' */}
      {selectedSubmission && selectedSubmission.status === 'researcherPending' && (
        <button onClick={() => {/* Logic to handle resubmission */}}>
          Resubmit
        </button>
      )}
    </div>
  );
};

export default ResearcherPendingPage;