import React, { use, useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import Modal from "./AdminStudyPopUp"; // Assuming you have a Modal component
import ResearchCard from "./ResearchCard/ResearchCard";
import BigHeader from "./BigHeader/BigHeader";
import ResearchFeedbackCard from "./ResarchCardFeedback/ResearchCardFeedback";

const ResearcherPending = () => {
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [feedback, setFeedback] = useState("");

  const handleViewFeedback = async (submissionId) => {
    try {
      const querySnapshot = await getDocs(collection(db, "researchStudies"));
      const submissions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSelectedSubmission(
        submissions.filter((submission) => submission.status === "pending")
      );
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  useEffect(() => {
    // Fetch submissions
    handleViewFeedback();
    // setFeedback(submissions.filter((submission) => submission.status === "pending"));
  }, []);

  const handleCloseFeedbackModal = () => {
    setFeedback("");
  };

  console.log(selectedSubmission);

  const ResearchPosting = (research) => {
    return (
      <div className="">
        <span>{research.title}</span>
      </div>
    );
  };

  return (
    <div className="px-10">
      <BigHeader>Studies Pending Approval</BigHeader>
      <div className="text-gray-800 mb-10">
        Review the below research postings that have feedback comments left on
        them. Use the 'Accept' or 'Reject' buttons to approve or deny the
        research/ research feedback posting.
      </div>
      {selectedSubmission?.map((submissionItem) => (
        <ResearchFeedbackCard {...submissionItem} />
      ))}
    </div>
  );
};

export default ResearcherPending;
