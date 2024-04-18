import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  getDoc,
  getDocs,
  collection,
  doc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import AdminFeedbackCard from "./AdminCardFeedback.js/AdminCardFeedback";
import BigHeader from "./BigHeader/BigHeader";
import { Divider } from "./ExtendedResearchCard/ExtendedResearchCard";
import { FaExclamationTriangle } from "react-icons/fa";

const AdminPending = () => {
  const [submissions, setSubmissions] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedStudy, setSelectedStudy] = useState(null);

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
      const batch = writeBatch(db);

      // Get a reference to the document in 'researchStudies'
      const docRefResearch = doc(db, "researchStudies", id);

      // Retrieve the document from 'researchStudies'
      const docSnap = await getDoc(docRefResearch);

      if (docSnap.exists()) {
        // Prepare the data to be updated and copied
        const updatedData = {
          ...docSnap.data(),
          status: "approved", // Updating the status
        };

        // Update the document in 'researchStudies'
        batch.update(docRefResearch, updatedData);

        // Get a reference to the document in 'Studies'
        const docRefStudies = doc(db, "Studies", id);

        // Copy the updated document to 'Studies'
        batch.set(docRefStudies, updatedData);

        // Commit all batched writes to Firestore
        await batch.commit();
        console.log("Proposal accepted and data copied successfully");

        setSubmissions(
          submissions.filter((submission) => submission.id !== id)
        );
      }
    } catch (err) {
      console.error("Failed to update submission status. Please try again.");
    }
  };

  const handleDeny = async (id) => {
    try {
      const submissionRef = doc(db, "researchStudies", id);
      await updateDoc(submissionRef, {
        status: "denied",
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

  const emailTemplateOptions = (submissionItem, status, emailPart) => {
    const senderName = "The NFA";
    const receiverName = `${submissionItem.contactName}`; // The receiver's name
    const subject = `Research Proposal Submission ${status}!`; // Subject line of the email
    const body = `Dear ${receiverName},\n\n${senderName} has ${
      status === "accepted" ? "accepted" : "rejected"
    } your research proposal submission.\n${
      status === "accepted"
        ? `Congratulations! Your research proposal, titled "${submissionItem.title}" has been accepted. We look forward to working with you.`
        : `We regret to inform you that your research proposal titled ${submissionItem.title} has been rejected. We appreciate your interest in submitting your research proposal.`
    }\n\n${
      status === "accepted"
        ? "If you have any questions, please feel free to reach out to us.\n"
        : "If you have any questions or would like feedback on your research proposal, please feel free to reach out to us."
    }\nRegards,\n${senderName}`;

    return emailPart === "subject" ? subject : body;
  };

  const emailTemplate = (submissionItem, status) => {
    const senderEmail = "avinashr@umich.edu";
    const receiverEmail = `${submissionItem.contactEmail}`; // The receiver's email address
    const subject = emailTemplateOptions(submissionItem, status, "subject"); // Subject line of the email
    const body = emailTemplateOptions(submissionItem, status, "body"); // Body of the email

    const mailtoLink = `mailto:${receiverEmail}?cc=${senderEmail}&subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    return mailtoLink;
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
                  onClick={() => {
                    setSelectedOption("accepted");
                    setSelectedStudy(submissionItem.id);
                  }}
                >
                  Accept
                </button>
                <button
                  class="disabled:bg-gray-500 bg-red-500 hover:bg-red-700 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    setSelectedOption("denied");
                    setSelectedStudy(submissionItem.id);
                  }}
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
              <Divider />
              {selectedOption && selectedStudy === submissionItem.id && (
                <div className="text-gray-500 text-sm border-1 border rounded-md mt-4 p-3">
                  <div className="flex items-center gap-2">
                    <FaExclamationTriangle className="text-yellow-500 h-5 w-5" />
                    <p className="text-lg font-semibold text-gray-800">
                      Important!
                    </p>
                  </div>
                  <p class="text-sm text-gray-700">
                    The study will be{" "}
                    <span
                      className={`font-semibold ${
                        selectedOption === "accepted"
                          ? `text-green-700`
                          : `text-red-700`
                      }`}
                    >
                      {selectedOption}
                    </span>
                    ! <br /> Do you want to send an email notification to the
                    researcher?
                  </p>
                  <div class="flex gap-2 mt-4 align-middle">
                    {selectedOption === "accepted" && (
                      <button
                        class="bg-green-500 hover:bg-green-700 text-white active:bg-green-600 font-bold uppercase text-xs px-3 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          window.location.href = emailTemplate(
                            submissionItem,
                            "accepted"
                          );
                          handleApprove(submissionItem.id);
                        }}
                      >
                        Send acceptance email
                      </button>
                    )}
                    {selectedOption === "denied" && (
                      <button
                        class="disabled:bg-gray-500 bg-red-500 hover:bg-red-700 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          window.location.href = emailTemplate(
                            submissionItem,
                            "denied"
                          );
                          handleDeny(submissionItem.id);
                        }}
                      >
                        Send rejection email
                      </button>
                    )}
                    <button
                      class="inline-block text-gray-700 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded shadow-md cursor-pointer transition-colors duration-300"
                      onClick={() => {
                        selectedOption === "accepted"
                          ? handleApprove(submissionItem.id)
                          : handleDeny(submissionItem.id);
                      }}
                    >
                      I'll do this later
                    </button>
                  </div>
                </div>
              )}
              <div className="text-gray-500 text-sm border-1 border rounded-md mt-4 p-3">
                <p>
                  <span className="font-semibold text-green-700">Accept:</span>{" "}
                  Means you are accepting the current proposed research and/ or
                  feedback provided.
                </p>
                <Divider />
                <p>
                  <span className="font-semibold text-red-700">Reject:</span>{" "}
                  Means you are rejecting the proposal/ feedback provided and
                  will not publicly post the research proposal.
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
