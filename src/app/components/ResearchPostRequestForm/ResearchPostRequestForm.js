import React, { useEffect, useState } from "react";
import { db, storage } from "../../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import {
  inputClass,
  textareaClass,
  dateInputClass,
  formContainerClass,
  formSectionClass,
  buttonClass,
  navigationContainerClass,
} from "./ResearchPostRequestForm.styles";
import MultipleSelectChip from "../MultipleChipSelect/MultipleChipSelect";
import { Divider } from "../ExtendedResearchCard/ExtendedResearchCard";
import BigHeader from "../BigHeader/BigHeader";
import CustomStepper from "../Stepper/Stepper";

const ResearchPostRequestForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    irbNumber: "",
    principalInvestigator: "",
    title: "",
    descriptionAndPurpose: "",
    participantExperience: "",
    location: "",
    compensation: "",
    nfaCompensation: "",
    logo: "",
    video: "",
    inclusionCriteria: "",
    exclusionCriteria: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    contactWebsite: "",
    additionalLinks: "",
    relatedResearch: "",
    postExpirationDate: "",
  });

  const [proposedStartAndEndDates, setProposedStartAndEndDates] = useState({
    startDate: "",
    endDate: "",
  });

  const [tagOptions, setTagOptions] = useState({});
  const [selectedTags, setSelectedTags] = useState({
    conditions: [],
    topics: [],
    types: [],
  });

  console.log("selectedTags", selectedTags);

  const totalSteps = 10;

  const fetchTagOptions = async () => {
    const querySnapshot = await getDocs(collection(db, "Tags"));
    querySnapshot.forEach((doc) => {
      switch (doc.id) {
        case "conditions":
          setTagOptions((prev) => ({
            ...prev,
            conditions: doc.data(),
          }));
          break;
        case "topics":
          setTagOptions((prev) => ({
            ...prev,
            topics: doc.data(),
          }));
          break;
        case "types":
          setTagOptions((prev) => ({
            ...prev,
            types: doc.data(),
          }));
          break;
      }
    });
  };

  useEffect(() => {
    fetchTagOptions();
  }, []);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]; // Get the file

    // Check if the file is an image and its size is under 100MB
    if (
      file &&
      file.type.startsWith("image/") &&
      file.size <= 100 * 1024 * 1024
    ) {
      const fileRef = ref(storage, `logos/${file.name}`); // Create a reference

      const uploadTask = uploadBytesResumable(fileRef, file); // Start the upload

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optional: handle progress
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          // Here, you could update the UI with the upload progress
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error("Error uploading file:", error);
          // Here, you could update the UI to show the error
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            // Here, you could update your database with the downloadURL and update the UI to show the uploaded logo
          });
        }
      );
    } else {
      // File is not an image or is larger than 100MB
      console.error("File must be an image and less than 100MB");
      // Here, you could update the UI to inform the user about the issue
    }
  };

  const handleUpload = (e) => {
    const file = e.target.files[0]; // Get the file

    // Check if the file is a video and its size is under 100MB
    if (
      file &&
      file.type.startsWith("video/") &&
      file.size <= 100 * 1024 * 1024
    ) {
      const fileRef = ref(storage, `videos/${file.name}`); // Create a reference

      const uploadTask = uploadBytesResumable(fileRef, file); // Start the upload

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optional: handle progress
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          // Here, you could update the UI with the upload progress
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error("Error uploading file:", error);
          // Here, you could update the UI to show the error
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            // Here, you could update your database with the downloadURL and update the UI to show the uploaded file
          });
        }
      );
    } else {
      // File is not a video or is larger than 100MB
      console.error("File must be a video and less than 100MB");
      // Here, you could update the UI to inform the user about the issue
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const TextAreaField = ({ name, placeholder, globalValue }) => {
    const [localValue, setLocalValue] = useState(globalValue);

    const handleChange = (e) => {
      setLocalValue(e.target.value);
    };

    const handleBlur = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: localValue,
      }));
    };

    return (
      <textarea
        name={name}
        placeholder={placeholder}
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className={textareaClass}
      />
    );
  };

  const IrbNumberField = () => {
    const [localValue, setLocalValue] = useState(formData.irbNumber);

    const handleChange = (e) => {
      setLocalValue(e.target.value);
    };

    const handleBlur = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        irbNumber: localValue,
      }));
    };

    return (
      <input
        type="text"
        name="irbNumber"
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="IRB or Research Number (Optional)"
        className={inputClass}
      />
    );
  };

  const TitleField = () => {
    const [localValue, setLocalValue] = useState(formData.title);
    const handleChange = (e) => {
      setLocalValue(e.target.value);
    };
    const handleBlur = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        title: localValue,
      }));
    };
    return (
      <input
        type="text"
        name="title"
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Title"
        className={inputClass}
      />
    );
  };

  const PrincipalInvestigatorField = () => {
    const [localValue, setLocalValue] = useState(
      formData.principalInvestigator
    );
    const handleChange = (e) => {
      setLocalValue(e.target.value);
    };
    const handleBlur = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        principalInvestigator: localValue,
      }));
    };
    return (
      <input
        type="text"
        name="principalInvestigator"
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Principal Investigator Name"
        className={inputClass}
      />
    );
  };

  const ResearchTopicsField = () => (
    <>
      <Divider />
      <h4 className="font-bold text-lg text-gray-800">Select Tags</h4>
      <span className="text-gray-500 text-sm">
        Select tags under each title that are relevant to your research
        proposal.
      </span>
      <div className="flex flex-col gap-3 my-2">
        <MultipleSelectChip
          data={tagOptions.conditions}
          title={"Medical Conditions"}
          selectedTags={selectedTags.conditions}
          selectedTagsHandler={(tags) =>
            setSelectedTags((prev) => ({
              ...prev,
              conditions: tags,
            }))
          }
        />
        <MultipleSelectChip
          data={tagOptions.topics}
          title={"Research Topics"}
          selectedTags={selectedTags.topics}
          selectedTagsHandler={(tags) =>
            setSelectedTags((prev) => ({
              ...prev,
              topics: tags,
            }))
          }
        />
        <MultipleSelectChip
          data={tagOptions.types}
          title={"Research Type"}
          selectedTags={selectedTags.types}
          selectedTagsHandler={(tags) =>
            setSelectedTags((prev) => ({
              ...prev,
              types: tags,
            }))
          }
        />
      </div>
    </>
  );

  const DescriptionAndPurposeField = () => {
    const [localValue, setLocalValue] = useState(
      formData.descriptionAndPurpose
    );

    const handleChange = (e) => {
      setLocalValue(e.target.value);
    };

    const handleBlur = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        descriptionAndPurpose: localValue,
      }));
    };

    return (
      <textarea
        name="descriptionAndPurpose"
        placeholder="Description & Purpose of the Study"
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className={textareaClass}
      />
    );
  };

  const ParticipantExperienceField = () => {
    const [localValue, setLocalValue] = useState(
      formData.participantExperience
    );

    const handleChange = (e) => {
      setLocalValue(e.target.value);
    };

    const handleBlur = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        participantExperience: localValue,
      }));
    };

    return (
      <textarea
        name="participantExperience"
        placeholder="Participant Experience Details"
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className={textareaClass}
      />
    );
  };

  const LocationField = () => {
    const [localValue, setLocalValue] = useState(formData.location);

    const handleChange = (e) => {
      setLocalValue(e.target.value);
    };

    const handleBlur = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        location: localValue,
      }));
    };

    return (
      <textarea
        name="location"
        placeholder="Study Location (Virtual, In-Person, Hybrid?)"
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className={textareaClass}
      />
    );
  };

  const CompensationField = () => {
    const [localValue, setLocalValue] = useState(formData.compensation);

    const handleChange = (e) => {
      setLocalValue(e.target.value);
    };

    const handleBlur = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        compensation: localValue,
      }));
    };

    return (
      <input
        type="text"
        name="compensation"
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Will participants be compensated?"
        className={inputClass}
      />
    );
  };

  const NfaCompensationField = () => {
    const [localValue, setLocalValue] = useState(formData.nfaCompensation);

    const handleChange = (e) => {
      setLocalValue(e.target.value);
    };

    const handleBlur = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        nfaCompensation: localValue,
      }));
    };

    return (
      <input
        type="text"
        name="nfaCompensation"
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Will NFA be compensated?"
        className={inputClass}
      />
    );
  };

  const LogoField = () => (
    <input type="file" accept="image/*" onChange={handleLogoUpload} />
  );

  const VideoField = () => (
    <input type="file" accept="video/*" onChange={handleUpload} />
  );

  const InclusionCriteriaField = () => {
    const [localValue, setLocalValue] = useState(formData.inclusionCriteria);

    const handleChange = (e) => {
      setLocalValue(e.target.value);
    };

    const handleBlur = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        inclusionCriteria: localValue,
      }));
    };

    return (
      <textarea
        name="inclusionCriteria"
        placeholder="Participant Inclusion Criteria"
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className={textareaClass}
      />
    );
  };

  const ExclusionCriteriaField = () => {
    const [localValue, setLocalValue] = useState(formData.exclusionCriteria);

    const handleChange = (e) => {
      setLocalValue(e.target.value);
    };

    const handleBlur = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        exclusionCriteria: localValue,
      }));
    };

    return (
      <textarea
        name="exclusionCriteria"
        placeholder="Participant Exclusion Criteria"
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className={textareaClass}
      />
    );
  };

  const ContactNameField = () => {
    const [localValue, setLocalValue] = useState(formData.contactName);

    const handleChange = (e) => {
      setLocalValue(e.target.value);
    };

    const handleBlur = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        contactName: localValue,
      }));
    };

    return (
      <textarea
        name="contactName"
        placeholder="Contact Name"
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className={textareaClass}
      />
    );
  };

  const ContactEmailField = () => {
    const [localValue, setLocalValue] = useState(formData.contactEmail);

    const handleChange = (e) => {
      setLocalValue(e.target.value);
    };

    const handleBlur = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        contactEmail: localValue,
      }));
    };

    return (
      <input
        type="email"
        name="contactEmail"
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Contact Email"
        className={inputClass}
      />
    );
  };

  const ContactPhoneField = () => {
    const [localValue, setLocalValue] = useState(formData.contactPhone);

    const handleChange = (e) => {
      setLocalValue(e.target.value);
    };

    const handleBlur = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        contactPhone: localValue,
      }));
    };

    return (
      <input
        type="tel"
        name="contactPhone"
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Contact Phone (optional)"
        className={inputClass}
      />
    );
  };

  const ContactWebsiteField = () => {
    const [localValue, setLocalValue] = useState(formData.contactWebsite);

    const handleChange = (e) => {
      setLocalValue(e.target.value);
    };

    const handleBlur = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        contactWebsite: localValue,
      }));
    };

    return (
      <input
        type="url"
        name="contactWebsite"
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Contact Website (optional)"
        className={inputClass}
      />
    );
  };

  const AdditionalLinksField = () => {
    const [localValue, setLocalValue] = useState(formData.additionalLinks);

    const handleChange = (e) => {
      setLocalValue(e.target.value);
    };

    const handleBlur = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        additionalLinks: localValue,
      }));
    };

    return (
      <textarea
        name="additionalLinks"
        placeholder="Additional Links, such as surveys (optional)"
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className={textareaClass}
      />
    );
  };

  const RelatedResearchField = () => (
    <TextAreaField
      name="relatedResearch"
      placeholder="Links to Related Research (optional)"
      globalValue={formData.relatedResearch}
      setGlobalFormData={setFormData}
      className={textareaClass}
    />
  );

  // PARTICIPANT RECRUITMENT END DATE
  const PostExpirationDateField = () => {
    const [localValue, setLocalValue] = useState(formData.postExpirationDate);

    const handleChange = (e) => {
      setLocalValue(e.target.value);
    };

    const handleBlur = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        postExpirationDate: localValue,
      }));
      setProposedStartAndEndDates({
        ...proposedStartAndEndDates,
        endDate: localValue,
      });
    };

    return (
      <input
        type="date"
        name="postExpirationDate"
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className={dateInputClass}
      />
    );
  };

  // PARTICIPANT RECRUITMENT START DATE
  const StartDateField = () => {
    const [localValue, setLocalValue] = useState(formData.startDate);

    const handleChange = (e) => {
      setLocalValue(e.target.value);
    };

    const handleBlur = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        startDate: localValue,
      }));
      setProposedStartAndEndDates({
        ...proposedStartAndEndDates,
        startDate: localValue,
      });
    };

    return (
      <input
        type="date"
        name="startDate"
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className={dateInputClass}
        required
      />
    );
  };

  // OVERALL RESEARCH END DATE
  const EndDateField = () => {
    const [localValue, setLocalValue] = useState(formData.endDate);

    const handleChange = (e) => {
      setLocalValue(e.target.value);
    };

    const handleBlur = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        endDate: localValue,
      }));
    };

    return (
      <input
        type="date"
        name="endDate"
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className={dateInputClass}
        required
      />
    );
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const uploadFile = async (file, path) => {
    if (!file) return null;

    const fileRef = ref(storage, `${path}/${file.name}`);
    await uploadBytes(fileRef, file);
    return fileRef.fullPath;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // submission is in progress
    setSubmissionError(""); // Reset any previous error messages
    setSubmissionSuccess(false); // Reset the success status

    try {
      const logoPath = await uploadFile(formData.logo, "logos");
      const videoPath = await uploadFile(formData.video, "videos");

      await addDoc(collection(db, "researchStudies"), {
        ...formData,
        logo: logoPath,
        video: videoPath,
        status: "adminPending", // Set default status to 'adminPending'
        researchTopics: selectedTags,
      });

      console.log("Form submitted successfully");
      setSubmissionSuccess(true);
    } catch (error) {
      console.error("Error submitting form: ", error);
      setSubmissionError("Failed to submit the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateDaysBetweenDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const steps = [
    {
      id: 1,
      title: "Basic Information",
      description: "Research Title, Principal Investigator, and IRB Number",
    },
    {
      id: 2,
      title: "Area of Study",
      description: "Research Description, Topics, and Research Type",
    },
    {
      id: 3,
      title: "Participant Experience",
      description: "Timeline, Meetings, Procedures, and Participant Experience",
    },
    {
      id: 4,
      title: "Location",
      description: "Location of the Study",
    },
    {
      id: 5,
      title: "Compensation",
      description: "Participant and NFA Compensation Details",
    },
    {
      id: 6,
      title: "Criteria",
      description: "Participant Inclusion and Exclusion Criteria",
    },
    {
      id: 7,
      title: "Contact Info",
      description: "Contact Name, Email, and Phone",
    },
    {
      id: 8,
      title: "External Links",
      description: "Contact Website, Additional Links, and Related Research",
    },
    {
      id: 9,
      title: "Media",
      description: "Logo and Video upload",
    },
    {
      id: 10,
      title: "Timeline",
      description: "Participant Recruitment and Research End Dates",
    },
  ];

  return (
    <div className={formContainerClass}>
      <BigHeader>Research Post Request Form</BigHeader>
      <CustomStepper steps={steps} currentStep={currentStep} />
      <div className={formSectionClass}>
        {currentStep === 1 && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-black text-center">
              Step 1: Basic Information
            </h2>
            <p className="text-sm mb-4 text-black font-bold">
              Please complete the fields below.
            </p>
            <TitleField />
            <PrincipalInvestigatorField />
            <IrbNumberField />
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-black text-center">
              Step 2: Area of Study
            </h2>
            <p className="text-sm mb-4 text-black font-bold">
              Please provide a paragraph explaining your research goals in
              common terms. Additionally, select any topics on medical
              conditions, research topics and the research type.
            </p>
            <DescriptionAndPurposeField />
            <ResearchTopicsField />
          </div>
        )}
        {currentStep === 3 && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-black text-center">
              Step 3: Participant Experience
            </h2>
            <p className="text-sm mb-4 text-black font-bold">
              Please provide details on timeline, required meetings, duration of
              meetings, required procedures, and any other essential participant
              experiences.
            </p>
            <ParticipantExperienceField />
          </div>
        )}
        {currentStep === 4 && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-black text-center">
              Step 4: Location
            </h2>
            <p className="text-sm mb-4 text-black font-bold">
              Please provide details on the location of the study. If the study
              is in-person list a city and state.
            </p>
            <LocationField />
          </div>
        )}
        {currentStep === 5 && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-black text-center">
              Step 5: Compensation
            </h2>
            <p className="text-sm mb-4 text-black font-bold">
              Please provide any compenstation details below. If yes, please
              list an amount.
            </p>

            <NfaCompensationField />
            <CompensationField />
          </div>
        )}
        {currentStep === 6 && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-black text-center">
              Step 6: Participant Prefrences
            </h2>
            <p className="text-sm mb-4 text-black font-bold">
              Please provide the basic requirements of the research.
            </p>
            <InclusionCriteriaField />
            <ExclusionCriteriaField />
          </div>
        )}
        {currentStep === 7 && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-black text-center">
              Step 7: Contact Info
            </h2>
            <p className="text-sm mb-4 text-black font-bold">
              Please provide a contact for the study.
            </p>
            <ContactNameField />
            <ContactEmailField />
            <ContactPhoneField />
          </div>
        )}
        {currentStep === 8 && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-black text-center">
              Step 8: External Links
            </h2>
            <p className="text-sm mb-4 text-black font-bold">
              Please provide any additonal information below.
            </p>
            <ContactWebsiteField />
            <AdditionalLinksField />
            <RelatedResearchField />
          </div>
        )}
        {currentStep === 9 && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-black text-center">
              Step 9: Media{" "}
            </h2>
            <LogoField />
            <p className="text-sm mb-4 text-black">
              Please upload a logo for you organization.
            </p>
            <VideoField />
            <p className="text-sm mb-4 text-black">
              Optionally, you can also provide a video summary explaining your
              study. Max 5min
            </p>
          </div>
        )}
        {currentStep === 10 && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-black text-center">
              Step 10: Timeline
            </h2>
            <p className="text-sm mb-4 text-black font-bold">
              Please give your best estimate for the dates below.
            </p>
            <StartDateField />
            <p className="text-sm mb-4 text-black">
              What day will participant recruitment for this study begin?
            </p>
            <PostExpirationDateField />
            <p className="text-sm mb-4 text-black">
              What day will participant recruitment close for this study?
            </p>
            {proposedStartAndEndDates.startDate &&
              proposedStartAndEndDates.endDate && (
                <p className="text-sm mb-4 text-black font-bold">
                  This study will be open to participants for{" "}
                  {calculateDaysBetweenDates(
                    proposedStartAndEndDates.startDate,
                    proposedStartAndEndDates.endDate
                  )}{" "}
                  days.
                </p>
              )}
            <EndDateField />
            <p className="text-sm mb-4 text-black">
              Please list an estimate of when you will have final research
              results.
            </p>
            {isSubmitting && <p>Submitting form...</p>}
            {submissionError && (
              <p className="text-red-500">{submissionError}</p>
            )}
            {submissionSuccess && (
              <p className="text-green-500">Form submitted successfully!</p>
            )}
          </div>
        )}

        <div className={navigationContainerClass}>
          {currentStep > 1 && (
            <button onClick={prevStep} className={buttonClass}>
              Previous
            </button>
          )}
          {currentStep < totalSteps && (
            <div style={{ flex: 1 }}></div> // Empty div to push next button to the right
          )}
          {currentStep < totalSteps && (
            <button onClick={nextStep} className={buttonClass}>
              Next
            </button>
          )}
          {currentStep === totalSteps && (
            <button onClick={handleSubmit} className={buttonClass}>
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResearchPostRequestForm;
