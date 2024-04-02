import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import Modal from './AdminStudyInfoPopUp';
import { updateResearchProposalStatus } from '../../services/firestoreOperations';

const AdminPending = () => {
  const [submissions, setSubmissions] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSubmission, setCurrentSubmission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        // Fetch only submissions with adminPending status
        const q = query(collection(db, "researchStudies"), where("status", "==", "adminPending"));
        const querySnapshot = await getDocs(q);
        const submissionsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSubmissions(submissionsData);
      } catch (err) {
        setError('Failed to fetch submissions. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const handleApprove = async (id) => {
    try {
      // On approval the status is changed to approved.
      await updateResearchProposalStatus(id, 'approved', '');
      setSubmissions(submissions.filter(submission => submission.id !== id));
    } catch (err) {
      setError('Failed to update submission status. Please try again.');
    }
  };

  const handleDeny = async (id) => {
    const feedbackText = feedback[id];
    if (!feedbackText) {
        alert("Please enter feedback before denying."); // Prevents status update without feedback
        return; 
    }
    try {
        await updateResearchProposalStatus(id, 'researcherPending', feedbackText);
        setSubmissions(submissions.filter(submission => submission.id !== id));
        setFeedback({ ...feedback, [id]: '' }); // clears feedback after submission
    } catch (err) {
        setError('Failed to update submission status. Please try again.');
    }
  };

  const handleFeedbackChange = (id, value) => {
    setFeedback({ ...feedback, [id]: value });
  };

  const openModal = (submission) => {
    setCurrentSubmission(submission);
    setIsModalOpen(true);
  };

  return (
    <div style={{ position: 'relative', maxWidth: '800px', margin: 'auto', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', background: 'white', borderRadius: '8px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Study Review Page</h1>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!isLoading && !error && (
        <>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            {submissions.map(submission => (
              <li key={submission.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', background: '#f9f9f9', minHeight: '100px' }}>
                <div style={{ marginRight: '10px', flex: 1 }}>
                  <button onClick={() => openModal(submission)} style={{ background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>See Details</button>
                </div>
                <span style={{ marginRight: 'auto', flex: 2 }}>{submission.title}</span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <input
                    type="text"
                    placeholder="Enter feedback"
                    value={feedback[submission.id] || ''}
                    onChange={(e) => handleFeedbackChange(submission.id, e.target.value)}
                    style={{ marginBottom: '5px', padding: '5px', border: '1px solid #ccc', borderRadius: '5px', width: '200px' }}
                  />
                  <div>
                    <button onClick={() => handleDeny(submission.id)} style={{ marginRight: '5px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>Send Feedback</button>
                    <button onClick={() => handleApprove(submission.id)} style={{ background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>Approve</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} submission={currentSubmission} />
        </>
      )}
    </div>
  );
};

export default AdminPending;