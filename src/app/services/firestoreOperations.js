import { db } from "../firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  setDoc,
  FieldPath,
} from "firebase/firestore";
import { updateDoc } from "firebase/firestore";

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(db, `users/${userAuth.uid}`);

  await setDoc(userRef, {
    uid: userAuth.uid,
    email: userAuth.email,
    role: "researcher", // Default role,
  });
};

export const updateUserRole = async (uid, newRole) => {
  const userRef = doc(db, `users/${uid}`);
  await updateDoc(userRef, {
    role: newRole,
  });
};

export const getUserProfile = async (uid) => {
  const snap = await getDoc(doc(db, "Profile", uid));

  if (snap.exists()) {
    return snap.data();
  } else {
    console.log("No such document");
    return {};
  }
};
