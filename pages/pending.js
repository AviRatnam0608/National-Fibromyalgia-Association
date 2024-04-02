import React, { useEffect, useState } from 'react';
import { db } from '../src/app/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Modal from '../src/app/components/ResearcherPendingStudies/ResearcherFeedbackPopUp';

const Pending = () => {
  const [submissions, setSubmissions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSubmission, setCurrentSubmission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        // Adjusted query to fetch submissions with 'researcherPending' status
        const q = query(collection(db, "researchStudies"), where("status", "==", "researcherPending"));
        const querySnapshot = await getDocs(q);
        const submissionsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSubmissions(submissionsData);
      } catch (err) {
        setError('Failed to fetch submissions. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const handleViewFeedback = (submission) => {
    setCurrentSubmission(submission);
    setIsModalOpen(true);
  };

  return (
    <div style={{ position: 'relative', maxWidth: '600px', margin: 'auto', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', background: 'white', borderRadius: '8px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Pending Submissions</h1>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!isLoading && !error && (
        <>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            {submissions.map(submission => (
              <li key={submission.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', alignItems: 'center', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', background: '#f9f9f9' }}>
                <button onClick={() => handleViewFeedback(submission)} style={{ marginRight: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>View Feedback</button>
                <span style={{ flexGrow: 1 }}>{submission.title}</span>
                {/* Implement logic for resubmitting submissions */}
              </li>
            ))}
          </ul>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} submission={currentSubmission} />
        </>
      )}
    </div>
  );
};

export default Pending;