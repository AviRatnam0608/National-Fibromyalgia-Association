// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { API_KEY } from "/workspaces/National-Fibromyalgia-Association/secrets.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "nfa699-7adef.firebaseapp.com",
  projectId: "nfa699-7adef",
  storageBucket: "nfa699-7adef.appspot.com",
  messagingSenderId: "771133857090",
  appId: "1:771133857090:web:29ff1c30284024c700bcdb",
  measurementId: "G-1MM5063BHX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Import Firestore
import { getFirestore, collection, getDocs, writeBatch, doc } from 'firebase/firestore';

// Initialize Firestore (make sure your Firebase app is initialized before this step)
const db = getFirestore();

async function copyCollection(sourceCollectionName, destinationCollectionName) {
  const sourceCollectionRef = collection(db, sourceCollectionName);
  const destinationCollectionRef = collection(db, destinationCollectionName);

  // Get all documents from the source collection
  const snapshot = await getDocs(sourceCollectionRef);
  
  // Prepare a batch write operation
  const batch = writeBatch(db);
  
  snapshot.forEach(docSnapshot => {
    // Create a reference to a new document in the destination collection with the same ID
    const destDocRef = doc(destinationCollectionRef, docSnapshot.id);
    
    // Set the data from the source document to the new document in the destination collection
    batch.set(destDocRef, docSnapshot.data());
  });

  // Commit the batch operation to Firestore
  await batch.commit();
  console.log('Collection copied successfully');
}


copyCollection('researchStudies', 'researchStudies');

