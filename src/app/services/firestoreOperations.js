import { db } from "../firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(db, `users/${userAuth.uid}`);
  await setDoc(userRef, {
    uid: userAuth.uid,
    email: userAuth.email,
    role: "researcher", // Default role
    ...additionalData, // Pass additional data to the user profile document
  });
};

export const updateUserRole = async (uid, newRole) => {
  const userRef = doc(db, `users/${uid}`);
  await updateDoc(userRef, {
    role: newRole,
  });
};

export const updateResearchProposalStatus = async (proposalId, newStatus, feedback = '') => {
  const proposalRef = doc(db, `researchStudies`, proposalId);
  try {
    await updateDoc(proposalRef, {
      status: newStatus,
      adminFeedback: feedback // adminFeedback field is updated along with status
    });
  } catch (error) {
    console.error('Error updating research study status: ', error);
    throw new Error("Could not update research study status."); // Throw an error to handle if needed
  }
};