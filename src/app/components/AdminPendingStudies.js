import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import AdminFeedbackCard from "./AdminCardFeedback.js/AdminCardFeedback";
import BigHeader from "./BigHeader/BigHeader";
import { Divider } from "./ExtendedResearchCard/ExtendedResearchCard";

const AdminPending = () => {
  const [submissions, setSubmissions] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "researchStudies"));
        const submissionsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSubmissions(
          submissionsData.filter(
            (submission) => submission.status === "adminPending"
          )
        );
      } catch (err) {
        console.error("Failed to fetch submissions. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const handleApprove = async (id) => {
    try {
      const submissionRef = doc(db, "researchStudies", id);
      await updateDoc(submissionRef, { status: "approved" });
      setSubmissions(submissions.filter((submission) => submission.id !== id));
    } catch (err) {
      console.error("Failed to update submission status. Please try again.");
    }
  };

  const handleDeny = async (id) => {
    try {
      const submissionRef = doc(db, "researchStudies", id);
      await updateDoc(submissionRef, {
        status: "rejected",
      });
      setSubmissions(submissions.filter((submission) => submission.id !== id));
    } catch (err) {
      console.error("Failed to update submission status. Please try again.");
    }
  };

  const handleRejectWithFeedback = async (id) => {
    try {
      const submissionFeedback = feedback[id] || "No feedback provided.";
      const submissionRef = doc(db, "researchStudies", id);
      await updateDoc(submissionRef, {
        status: "researcherPending",
        feedback: submissionFeedback,
      });
      setSubmissions(submissions.filter((submission) => submission.id !== id));
      setFeedback({ ...feedback, [id]: "" }); // Clear feedback for the denied submission
    } catch (err) {
      console.error("Failed to update submission status. Please try again.");
    }
  };

  const handleFeedbackChange = (id, value) => {
    setFeedback({ ...feedback, [id]: value });
  };

  return (
    <div className="px-10">
      <BigHeader>Admin Proposed Studies Pending Approval</BigHeader>
      <div className="text-gray-800 mb-10">
        Review the below research postings. Use the 'Accept', 'Reject' or
        'Provide Feedback' buttons to approve, deny or provide feedback to the
        posting respectively.
      </div>
      {submissions.length !== 0 ? (
        submissions?.map((submissionItem) => (
          <AdminFeedbackCard
            id={submissionItem.id}
            {...submissionItem}
            acceptResearchHandler={handleApprove}
          >
            <div class="w-full md:w-96 border-t md:border-t-0 md:border-l border-gray-200 p-4">
              <h5 class="text-lg font-semibold text-gray-900">Feedback</h5>
              <p className="text-gray-500 text-sm">
                If you have no feedback to provide, leave the feedback text area
                below empty.
              </p>
              <div className="mt-4 w-full">
                <textarea
                  className="w-full h-20 border-1 border rounded-md p-3"
                  placeholder="Feedback"
                  value={feedback[submissionItem.id] || ""}
                  onChange={(e) =>
                    handleFeedbackChange(submissionItem.id, e.target.value)
                  }
                  style={{
                    marginRight: "5px",
                    padding: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div class="flex gap-2 mt-4 align-middle">
                <button
                  class="bg-green-500 hover:bg-green-700 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => handleApprove(submissionItem.id)}
                >
                  Accept
                </button>
                <button
                  class="disabled:bg-gray-500 bg-red-500 hover:bg-red-700 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => handleDeny(submissionItem.id)}
                >
                  Reject
                </button>
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                  type="button"
                  disabled={!feedback[submissionItem.id]}
                  onClick={() => handleRejectWithFeedback(submissionItem.id)}
                >
                  Propose Feedback
                </button>
              </div>

              <div className="text-gray-500 text-sm border-1 border rounded-md mt-4 p-3">
                <p>
                  <span className="font-semibold text-green-700">Accept:</span>{" "}
                  Means you are accepting the current proposed research and/ or
                  feedback provided.
                </p>
                <Divider />
                <p>
                  <span className="font-semibold text-red-700">
                    Reject with Feedback:
                  </span>{" "}
                  Means you are rejecting the proposal/ feedback provided and
                  will not publicly post the research proposal.
                  {/* <p>
                    <span className="font-bold">Feedback must be provided</span>{" "}
                    on why their research proposal has been rejected. They may
                    either act on this feedback, or reject the feedback and
                    resubmit their proposal.{" "}
                  </p> */}
                </p>
                <Divider />
                <p>
                  <span className="font-semibold text-blue-700">
                    Propose Feedback:
                  </span>{" "}
                  Means you are providing feedback to the researcher on how to
                  improve their research proposal. The proposal will be sent
                  back to the researcher, and will not be accepted, or rejected
                  in this state.
                </p>
              </div>
            </div>
          </AdminFeedbackCard>
        ))
      ) : (
        <div className="text-gray-500 font-semibold border-2 rounded-md text-center">
          No pending submissions
        </div>
      )}
    </div>
  );
};

export default AdminPending;

{
  /* <div
      style={{
        position: "relative",
        maxWidth: "600px",
        margin: "auto",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        background: "white",
        borderRadius: "8px",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Study Review Page
      </h1>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!isLoading &&
        !error &&
        {
          <>
           <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            {submissions.map((submission) => (
              <li
                key={submission.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  alignItems: "center",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  background: "#f9f9f9",
                }}
              >
                <button
                  onClick={() => openModal(submission)}
                  style={{
                    marginRight: "10px",
                    background: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  See Details
                </button>
                <span style={{ flexGrow: 1 }}>{submission.title}</span>
                <div>
                  <input
                    type="text"
                    placeholder="Enter feedback"
                    value={feedback[submission.id] || ""}
                    onChange={(e) =>
                      handleFeedbackChange(submission.id, e.target.value)
                    }
                    style={{
                      marginRight: "5px",
                      padding: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                    }}
                  />
                  <button
                    onClick={() => handleDeny(submission.id)}
                    style={{
                      marginRight: "5px",
                      background: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Deny
                  </button>
                  <button
                    onClick={() => handleApprove(submission.id)}
                    style={{
                      background: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Approve
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            submission={currentSubmission}
          />
        </>
        }}
      {submissions.map((submission) => (
        <AdminFeedbackCard id={submission.id} {...submission} />
      ))}
    </div> */
}
