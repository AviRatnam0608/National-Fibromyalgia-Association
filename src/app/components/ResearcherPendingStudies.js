import React, { useState, useEffect } from "react";
import { getDoc, getDocs, collection, doc, updateDoc, writeBatch } from "firebase/firestore";
import { db } from "../firebase";
import BigHeader from "./BigHeader/BigHeader";
import ResearchFeedbackCard from "./ResarchCardFeedback/ResearchCardFeedback";
import { Divider } from "./ExtendedResearchCard/ExtendedResearchCard";

const ResearcherPending = () => {
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const handleViewFeedback = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "researchStudies"));
      const submissions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSelectedSubmission(
        submissions.filter(
          (submission) => submission.status === "researcherPending"
        )
      );
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  const handleAcceptProposal = async (id) => {
    console.log("Accepting proposal with id:", id);
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
          status: "accepted"  // Updating the status
        };

        // Update the document in 'researchStudies'
        batch.update(docRefResearch, updatedData);

        // Get a reference to the document in 'Studies'
        const docRefStudies = doc(db, "Studies", id);

        // Copy the updated document to 'Studies'
        batch.set(docRefStudies, updatedData);

        // Commit all batched writes to Firestore
        await batch.commit();
        console.log('Proposal accepted and data copied successfully');

        // Optionally, call a function to refresh the view to reflect changes
        handleViewFeedback();
    } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error("Error accepting proposal:", error);
    }
  };

  const handleRejectProposal = async (id) => {
    try {
      const docRef = doc(db, "researchStudies", id); // Get a reference to the document
      await updateDoc(docRef, {
        status: "adminPending",
      });
      handleViewFeedback();
    } catch (error) {
      console.error("Error rejecting proposal:", error);
    }
  };

  useEffect(() => {
    handleViewFeedback();
  }, []);

  return (
    <div className="px-10">
      <BigHeader>Studies Pending Approval</BigHeader>
      <div className="text-gray-800 mb-10">
        Review the below research postings that have feedback comments left on
        them. Use the 'Accept' or 'Reject' buttons to approve or deny the
        research/ research feedback posting.
      </div>
      {selectedSubmission?.map((submissionItem) => (
        <ResearchFeedbackCard id={submissionItem.id} {...submissionItem}>
          <div class="w-full md:w-96 border-t md:border-t-0 md:border-l border-gray-200 p-4">
            <h5 class="text-lg font-semibold text-gray-900">Feedback</h5>

            <p class="mt-2 text-sm text-gray-600">
              {submissionItem.feedback?.length !== 0
                ? submissionItem.feedback
                : "N/A"}
            </p>

            <div class="flex mt-4">
              <button
                class="bg-green-500 hover:bg-green-700 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-2 ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleAcceptProposal(submissionItem.id)}
              >
                Accept
              </button>
              <button
                class="bg-red-500 hover:bg-red-700 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleRejectProposal(submissionItem.id)}
              >
                Reject with Feedback
              </button>
            </div>
            <div>
              <textarea
                className="w-full h-20 border-1 border rounded-md mt-4 p-3"
                placeholder="Provide reason for rejecting the proposal"
              ></textarea>
            </div>
            <div className="text-gray-500 text-sm border-1 border rounded-md mt-4 p-3">
              <p>
                <span className="font-semibold text-green-700">Accept:</span>{" "}
                Means you are accepting and agreeing to include the feedback
                provided into the research proposal.
              </p>
              <Divider />
              <p>
                <span className="font-semibold text-red-700">
                  Reject with Feedback:
                </span>{" "}
                Means you are rejecting the feedback provided and will not
                include the feedback into the research proposal. In this case,
                you may provide a reason for rejecting the feedback.
                <p>
                  <span className="font-bold">Feedback must be provided</span>{" "}
                  on why their research proposal feedback has been rejected.{" "}
                </p>
              </p>
              {/* <Divider />
              <p>
                <span className="font-semibold text-blue-700">
                  Propose Feedback:
                </span>{" "}
                Means you are providing feedback to the researcher on how to
                improve their research proposal. The proposal will be sent back
                to the researcher, and will not be accepted, or rejected in this
                state.
              </p> */}
            </div>
          </div>
        </ResearchFeedbackCard>
      ))}
    </div>
  );
};

export default ResearcherPending;
