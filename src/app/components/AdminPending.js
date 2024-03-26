import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; 
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      zIndex: 1000,
      border: '2px solid black'
    }}>
      <button onClick={onClose}>Close</button>
      {children}
    </div>
  );
};

const AdminPending = () => {
  const [submissions, setSubmissions] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSubmission, setCurrentSubmission] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const querySnapshot = await getDocs(collection(db, "researchPosts"));
      const submissionsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSubmissions(submissionsData.filter(submission => submission.status === 'pending'));
    };

    fetchSubmissions();
  }, []);

  const handleApprove = async (id) => {
    const submissionRef = doc(db, "researchPosts", id);
    await updateDoc(submissionRef, { status: 'approved' });
    setSubmissions(submissions.filter(submission => submission.id !== id));
  };

  const handleDeny = async (id) => {
    const submissionFeedback = feedback[id] || 'No feedback provided.';
    const submissionRef = doc(db, "researchPosts", id);
    await updateDoc(submissionRef, { status: 'denied', feedback: submissionFeedback });
    setSubmissions(submissions.filter(submission => submission.id !== id));
  };

  const handleFeedbackChange = (id, value) => {
    setFeedback({ ...feedback, [id]: value });
  };

  const openModal = (submission) => {
    setCurrentSubmission(submission);
    setIsModalOpen(true);
  };

  return (
    <div style={{ position: 'relative', maxWidth: '600px', margin: 'auto', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h1>Admin Review Page</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {submissions.map(submission => (
          <li key={submission.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', alignItems: 'center', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <button onClick={() => openModal(submission)}>See Details</button>
            <span>{submission.title}</span>
            <div>
              <input
                type="text"
                placeholder="Enter feedback"
                value={feedback[submission.id] || ''}
                onChange={(e) => handleFeedbackChange(submission.id, e.target.value)}
                style={{ marginRight: '5px' }}
              />
              <button onClick={() => handleDeny(submission.id)}>Give Feedback</button>
              <button onClick={() => handleApprove(submission.id)} style={{ marginLeft: '5px' }}>Approve</button>
            </div>
          </li>
        ))}
      </ul>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {currentSubmission && (
          <div>
            <h2>{currentSubmission.title}</h2>
            <p><strong>Description:</strong> {currentSubmission.descriptionAndPurpose}</p>
            <p><strong>Principal Investigator:</strong> {currentSubmission.principalInvestigator}</p>
            {/* Add more details */}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminPending;
