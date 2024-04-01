// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmoYh_hWJykHfrWRq0HOsF56jQSny1LxY",
  authDomain: "nfa699-7adef.firebaseapp.com",
  projectId: "nfa699-7adef",
  storageBucket: "nfa699-7adef.appspot.com",
  messagingSenderId: "771133857090",
  appId: "1:771133857090:web:29ff1c30284024c700bcdb",
  measurementId: "G-1MM5063BHX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
