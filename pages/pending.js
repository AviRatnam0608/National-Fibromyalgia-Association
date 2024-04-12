import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter for redirection
import { useAuth } from '../src/app/services/AuthContext'; // Import useAuth hook
import { db } from '../src/app/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import Modal from '../src/app/components/ResearcherFeedbackModal';

const Pending = () => {
  const { currentUser } = useAuth(); // Use the useAuth hook to access the current user
  const router = useRouter(); // Use the useRouter hook for redirection
  const [submissions, setSubmissions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSubmission, setCurrentSubmission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {

    if (!currentUser) {
      router.push('/login');
      return;
    }

    const fetchSubmissions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "researchStudies"));
        const submissionsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Fetch feedback for each submission
        const feedbackPromises = submissionsData.map(submission => {
          return getDocs(collection(db, `feedback/${submission.id}/comments`))
            .then(querySnapshot => {
              const comments = querySnapshot.docs.map(doc => doc.data());
              return { ...submission, feedback: comments };
            });
        });

        const submissionsWithFeedback = await Promise.all(feedbackPromises);
        setSubmissions(submissionsWithFeedback.filter(submission => submission.status === 'pending'));
      } catch (err) {
        setError('Failed to fetch submissions. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, [currentUser, router]);

  const handleApprove = async (id) => {
    try {
      const submissionRef = doc(db, "researchStudies", id);
      await updateDoc(submissionRef, { status: 'approved' });
      setSubmissions(submissions.filter(submission => submission.id !== id));
    } catch (err) {
      setError('Failed to update submission status. Please try again.');
    }
  };

  const handleRevise = async (id) => {
    try {
      // Your logic to handle revision
      console.log('Revision logic here');
    } catch (err) {
      setError('Failed to handle revision. Please try again.');
    }
  };

  const handleResubmit = async (id) => {
    try {
      // Your logic to handle resubmission
      console.log('Resubmit logic here');
    } catch (err) {
      setError('Failed to handle resubmission. Please try again.');
    }
  };

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
                <div>
                  <button onClick={() => handleRevise(submission.id)} style={{ marginRight: '5px', background: '#ffc107', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>Revise</button>
                  <button onClick={() => handleResubmit(submission.id)} style={{ background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>Resubmit</button>
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

export default Pending;