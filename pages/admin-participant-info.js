import BigHeader from "@/app/components/BigHeader/BigHeader";
import ParticipantCard from "@/app/components/ParticipantCard/ParticipantCard";
import ExtendedParticipantCard from "@/app/components/ParticipantExtendedCard/ParticipantExtendedCard";
import { db } from "@/app/firebase";
import { collection, getDocs, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth } from "../src/app/services/AuthContext";
import { useRouter } from "next/navigation";
import { getUserProfile } from '@/app/services/firestoreOperations';

const AdminParticipantInfo = () => {
  const { currentUser, loading } = useAuth();
  const router = useRouter();
  const [participantList, setParticipantList] = useState(null);
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  const fetchParticipantInfo = async () => {
    const participants = [];
    const querySnapshot = await getDocs(collection(db, "Profile"));
    const participantData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    participantData.map((doc) => {
      participants.push(doc);
    });
    setParticipantList(participants);
  };

  useEffect(() => {
    // If not loading and no user is logged in, redirect to login page
    if (!loading && !currentUser) {
      router.push('/admin-login');
    } else if (currentUser) {
      async function fetchIdentity() {
        const user = await getUserProfile(currentUser.uid)
        if (user.identity !== 'admin') {
          router.push('/admin-login');
        }
      }
      fetchIdentity()
    }
  }, [currentUser, loading, router]);

  const handleSelectParticipant = (participantInfo) => {
    setSelectedParticipant(participantInfo);
  };

  return (
    <div>
      <BigHeader>Participant Information</BigHeader>
      <div className="flex">
        <div className="flex-1 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {participantList?.map((participantInfo) => (
              <ParticipantCard
                key={participantInfo.id}
                participant={participantInfo}
                selectedParticipant={selectedParticipant}
                onClickHandler={() => handleSelectParticipant(participantInfo)}
              />
            ))}
          </div>
        </div>

        <div className="flex-1 p-4">
          {selectedParticipant ? (
            <ExtendedParticipantCard
              participant={selectedParticipant}
              selectedParticipant={selectedParticipant}
              onClickHandler={() => setSelectedParticipant(null)}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-200">
              <p className="text-gray-500">
                Select a participant to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminParticipantInfo;
