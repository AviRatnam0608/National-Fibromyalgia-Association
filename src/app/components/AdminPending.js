import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import Modal from './AdminPopUp';

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
        const querySnapshot = await getDocs(collection(db, "researchPosts"));
        const submissionsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSubmissions(submissionsData.filter(submission => submission.status === 'pending'));
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
      const submissionRef = doc(db, "researchPosts", id);
      await updateDoc(submissionRef, { status: 'approved' });
      setSubmissions(submissions.filter(submission => submission.id !== id));
    } catch (err) {
      setError('Failed to update submission status. Please try again.');
    }
  };

  const handleDeny = async (id) => {
    try {
      const submissionFeedback = feedback[id] || 'No feedback provided.';
      const submissionRef = doc(db, "researchPosts", id);
      await updateDoc(submissionRef, { status: 'denied', feedback: submissionFeedback });
      setSubmissions(submissions.filter(submission => submission.id !== id));
      setFeedback({ ...feedback, [id]: '' }); // Clear feedback for the denied submission
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
    <div style={{ position: 'relative', maxWidth: '600px', margin: 'auto', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', background: 'white', borderRadius: '8px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Study Review Page</h1>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!isLoading && !error && (
        <>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            {submissions.map(submission => (
              <li key={submission.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', alignItems: 'center', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', background: '#f9f9f9' }}>
                <button onClick={() => openModal(submission)} style={{ marginRight: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>See Details</button>
                <span style={{ flexGrow: 1 }}>{submission.title}</span>
                <div>
                  <input
                    type="text"
                    placeholder="Enter feedback"
                    value={feedback[submission.id] || ''}
                    onChange={(e) => handleFeedbackChange(submission.id, e.target.value)}
                    style={{ marginRight: '5px', padding: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
                  />
                  <button onClick={() => handleDeny(submission.id)} style={{ marginRight: '5px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>Deny</button>
                  <button onClick={() => handleApprove(submission.id)} style={{ background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>Approve</button>
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
