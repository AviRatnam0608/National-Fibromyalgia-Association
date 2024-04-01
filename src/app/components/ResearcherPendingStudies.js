import React, { use, useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import Modal from "./AdminStudyPopUp"; // Assuming you have a Modal component
import ResearchCard from "./ResearchCard/ResearchCard";
import BigHeader from "./BigHeader/BigHeader";

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
    <div className="">
      <BigHeader>Studies Pending Approval</BigHeader>
      <span>
        Review the below research postings that have feedback comments left on
        them
      </span>
      {selectedSubmission?.map((submissionItem) => (
        // <ResearchCard key={submissionItem.id} {...submissionItem} />
        <ResearchPosting key={submissionItem.id} {...submissionItem} />
      ))}
    </div>
  );
};

export default ResearcherPending;
