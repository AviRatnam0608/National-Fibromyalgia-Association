const admin = require("firebase-admin");
const serviceAccount = require("src/app/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nfa699-7adef-default-rtdb.firebaseio.com"
});

const db = admin.firestore();

async function renameCollection(oldName, newName) {
  const oldCollection = db.collection(oldName);
  const newCollection = db.collection(newName);

  const snapshot = await oldCollection.get();
  const batch = db.batch();

  snapshot.docs.forEach((doc) => {
    const newDocRef = newCollection.doc(doc.id);
    batch.set(newDocRef, doc.data());
  });

  await batch.commit();
  console.log('Documents copied successfully.');
}

renameCollection('researchPosts', 'researchStudies');

