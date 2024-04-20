import { Divider } from "../ExtendedResearchCard/ExtendedResearchCard";
import { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import { doc, getDoc } from "firebase/firestore";

const ExtendedParticipantCard = ({ participant }) => {
  const {
    id,
    firstName,
    lastName,
    email,
    phoneNumber,
    birthday,
    curCondition,
    isDiagnosed,
    pastCondition,
    zipcode,
    studyHistory,
  } = participant;

  const [researchParticipation, setResearchParticipation] = useState([]);

  const fetchResearchParticipation = async () => {
    const researchParticipation = [];
    const querySnapshot = await Promise.all(
      studyHistory?.map(async (studyId) => {
        const docRef = doc(db, "Studies", studyId);
        const docSnap = await getDoc(docRef);
        return docSnap;
      })
    );

    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        researchParticipation.push({ id: doc.id, ...doc.data() });
      } else {
        console.log(`No such document with ID: ${doc.id}`);
      }
    });

    setResearchParticipation(researchParticipation);
  };

  useEffect(() => {
    if (studyHistory && studyHistory.length !== 0) {
      fetchResearchParticipation();
    }
  }, [studyHistory]);

  return (
    <div class="max-w-4xl mx-auto bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden my-5">
      <div class="flex-1 p-4">
        <div class="flex justify-between items-center">
          <div className="flex items-center gap-5">
            <h5 class="text-xl font-semibold tracking-tight text-gray-900">
              {firstName} {lastName}
            </h5>
          </div>
        </div>

        <div class="mt-4">
          <h6 class="font-semibold text-gray-900">
            Participant Basic Information:
          </h6>
          <h3 class="text-sm text-gray-600">
            <span className="font-semibold">Date of Birth:</span> {birthday}
          </h3>
          <h3 class="text-sm text-gray-600">
            <span className="font-semibold">Date of Birth:</span> {birthday}
          </h3>
        </div>
        <Divider />
        <h4 className="font-bold text-lg text-gray-800">
          Research Sign-up History
        </h4>
        <div className="mt-4">
          {researchParticipation.length === 0 ? (
            <p className="text-sm text-gray-500">No research participation</p>
          ) : (
            researchParticipation.map((research) => (
              <div className="flex flex-col gap-2 bg-gray-100 p-5 border rounded-lg my-2">
                <div className="flex items-center gap-5">
                  <h5 class="text-lg font-semibold tracking-tight text-gray-900">
                    {research.title}
                  </h5>
                  <p className="text-sm text-gray-700">
                    IRB Number: {research.irbNumber}
                  </p>
                </div>
                <p className="text-sm ">PI: {research.principalInvestigator}</p>

                <div className="mt-4">
                  <h5 className="text-md font-bold text-gray-800">
                    Contact Information
                  </h5>
                  <p className="text-sm text-gray-600">
                    Name: {research.contactName}
                  </p>
                  <p className="text-sm text-blue-500 hover:underline">
                    <a href={`mailto:${research.contactEmail}`}>
                      Email: {research.contactEmail}
                    </a>
                  </p>
                  <p className="text-sm text-blue-500 hover:underline">
                    <a href={`tel:${research.contactPhone}`}>
                      Phone: {research.contactPhone}
                    </a>
                  </p>
                  <p className="text-sm text-blue-500 hover:underline">
                    <a
                      href={research.contactWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Website
                    </a>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <Divider />
        <h4 className="font-bold text-lg text-gray-800">Medical Information</h4>

        <div class="mt-4">
          <h6 class="font-semibold text-gray-900">Current Compensation:</h6>
          <p class="text-sm text-gray-600">{curCondition}</p>
        </div>

        <div class="mt-4">
          <h6 class="font-semibold text-gray-900">Diagnosis:</h6>
          <p class="text-sm text-gray-600">{isDiagnosed}</p>
        </div>

        <div class="mt-4">
          <h6 class="font-semibold text-gray-900">Past Condition(s):</h6>
          <p class="text-sm text-gray-600">{pastCondition}</p>
        </div>

        <Divider />
        <h4 className="font-bold text-lg text-gray-800">Contact Information</h4>

        <div className="mt-4">
          <p className="text-sm text-blue-500 hover:underline">
            <a href={`mailto:${email}`}>Email: {email}</a>
          </p>
          <p className="text-sm text-blue-500 hover:underline">
            Zipcode: {zipcode}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExtendedParticipantCard;
