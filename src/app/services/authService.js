import { firebaseApp } from "@/app/firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const auth = getAuth();

export const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const logOut = () => {
    return signOut(auth);
};