import { db } from './firebase'; 
import { doc, setDoc } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(db, `users/${userAuth.uid}`);

  await setDoc(userRef, {
    uid: userAuth.uid,
    email: userAuth.email,
    role: 'researcher', // Default role,
  });
};

export const updateUserRole = async (uid, newRole) => {
    const userRef = doc(db, `users/${uid}`);
    await updateDoc(userRef, {
      role: newRole,
    });
  };