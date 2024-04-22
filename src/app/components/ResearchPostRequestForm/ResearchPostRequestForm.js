import React, { useEffect, useState } from "react";
import { db, storage } from "../../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import {
  ref,
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
  inputErrClass,
  textareaErrClass,
  dateInputErrClass,
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
    description: "",
    procedure: "",
    location: "",
    compensation: "",
    nfaCompensation: "",
    logoUri: "",
    videoUri: "",
    inclusionCriteria: "",
    exclusionCriteria: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    contactWebsite: "",
    additionalLinks: "",
    relatedResearch: "",
    recruitEndDate: "",
    startDate: "",
    studyEndDate: "",
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
            setFormData((prevFormData) => ({
              ...prevFormData,
              logoUri: downloadURL,
            }));
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
            setFormData((prevFormData) => ({
              ...prevFormData,
              videoUri: downloadURL,
            }));
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
    if (steps[currentStep - 1].validation) {
      const validationPass = steps[currentStep - 1].validation()
      if (!validationPass) {
        return
      }
    }
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  function countWords(str) {
    return str.trim().split(/\s+/).length;
  }

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

  const [titleFieldClass, setTitleFieldClass] = useState(inputClass);

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
        className={titleFieldClass}
      />
    );
  };

  const [principalInvestigatorFieldClass, setPrincipalInvestigatorFieldClass] = useState(inputClass);

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
        className={principalInvestigatorFieldClass}
      />
    );
  };

  const BasicInfoFieldValidation = () => {
    let pass = true
    let errMsg = ''
    setTitleFieldClass(inputClass)
    setPrincipalInvestigatorFieldClass(inputClass)
    if (formData.title === ''){
      errMsg += 'Title cannot be empty. '
      setTitleFieldClass(inputErrClass)
      pass = false
    }
    if (countWords(formData.title) > 100){
      errMsg += 'Title should have less than 100 words. '
      setTitleFieldClass(inputErrClass)
      pass = false
    }
    if (formData.principalInvestigator === ''){
      errMsg += 'Principal Investigator Name cannot be empty. '
      setPrincipalInvestigatorFieldClass(inputErrClass)
      pass = false
    }
    if (countWords(formData.principalInvestigator) > 100){
      errMsg += 'Principal Investigator Name should have less than 100 words. '
      setPrincipalInvestigatorFieldClass(inputErrClass)
      pass = false
    }
    if (pass) {
      setSubmissionError('')
    } else {
      setSubmissionError(errMsg.trimEnd())
    }
    return pass
  };

  const ResearchTopicsField = () => (
    <>
      <Divider />
      <h4 className="font-bold text-lg text-gray-800">Select Tags</h4>
      <span className="text-gray-500 text-sm">
        Select tags under each title that are relevant to your research
        proposal. (Optional)
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

  const [descriptionFieldClass, setDescriptionFieldClass] = useState(textareaClass);

  const DescriptionField = () => {
    const [localValue, setLocalValue] = useState(
      formData.description
    );

    const handleChange = (e) => {
      setLocalValue(e.target.value);
    };

    const handleBlur = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        description: localValue,
      }));
    };

    return (
      <textarea
        name="description"
        placeholder="Description & Purpose of the Study"
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className={descriptionFieldClass}
      />
    );
  };

  const DescriptionFieldValidation = () => {
    let pass = true
    let errMsg = ''
    setDescriptionFieldClass(textareaClass)
    if (formData.description === ''){
      errMsg += 'Description & Purpose of the Study cannot be empty. '
      setDescriptionFieldClass(textareaErrClass)
      pass = false
    }
    if (countWords(formData.description) > 1000){
      errMsg += 'Description & Purpose of the Study should have less than 1000 words. '
      setDescriptionFieldClass(textareaErrClass)
      pass = false
    }
    if (pass) {
      setSubmissionError('')
    } else {
      setSubmissionError(errMsg.trimEnd())
    }
    return pass
  };

  const [procedureFieldClass, setProcedureFieldClass] = useState(textareaClass);

  const ProcedureField = () => {
    const [localValue, setLocalValue] = useState(
      formData.procedure
    );

    const handleChange = (e) => {
      setLocalValue(e.target.value);
    };

    const handleBlur = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        procedure: localValue,
      }));
    };

    return (
      <textarea
        name="procedure"
        placeholder="Participant Experience Details"
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className={procedureFieldClass}
      />
    );
  };

  const ProcedureFieldValidation = () => {
    let pass = true
    let errMsg = ''
    setProcedureFieldClass(textareaClass)
    if (formData.procedure === ''){
      errMsg += 'Participant Experience cannot be empty. '
      setProcedureFieldClass(textareaErrClass)
      pass = false
    }
    if (countWords(formData.procedure) > 1000){
      errMsg += 'Participant Experience should have less than 1000 words. '
      setProcedureFieldClass(textareaErrClass)
      pass = false
    }
    if (pass) {
      setSubmissionError('')
    } else {
      setSubmissionError(errMsg.trimEnd())
    }
    return pass
  };

  const [locationFieldClass, setLocationFieldClass] = useState(textareaClass);

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
        className={locationFieldClass}
      />
    );
  };

  const LocationFieldValidation = () => {
    let pass = true
    let errMsg = ''
    setLocationFieldClass(textareaClass)
    if (formData.location === ''){
      errMsg += 'Study Location cannot be empty. '
      setLocationFieldClass(textareaErrClass)
      pass = false
    }
    if (countWords(formData.location) > 100){
      errMsg += 'Study Location should have less than 100 words. '
      setLocationFieldClass(textareaErrClass)
      pass = false
    }
    if (pass) {
      setSubmissionError('')
    } else {
      setSubmissionError(errMsg.trimEnd())
    }
    return pass
  };

  const [compensationFieldClass, setCompensationFieldClass] = useState(inputClass);

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
        className={compensationFieldClass}
      />
    );
  };

  const [nfaCompensationFieldClass, setNfaCompensationFieldClass] = useState(inputClass);

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
        className={nfaCompensationFieldClass}
      />
    );
  };

  const CompensationFieldValidation = () => {
    let pass = true
    let errMsg = ''
    setCompensationFieldClass(inputClass)
    setNfaCompensationFieldClass(inputClass)
    if (formData.compensation === ''){
      errMsg += "Compensation cannot be empty. If there is no compensation please fill in with 'No'. "
      setCompensationFieldClass(inputErrClass)
      pass = false
    }
    if (countWords(formData.compensation) > 100){
      errMsg += 'Compensation should have less than 100 words. '
      setCompensationFieldClass(inputErrClass)
      pass = false
    }
    if (formData.nfaCompensation === ''){
      errMsg += "NFA Compensation cannot be empty. If there is no compensation please fill in with 'No'. "
      setNfaCompensationFieldClass(inputErrClass)
      pass = false
    }
    if (countWords(formData.nfaCompensation) > 100){
      errMsg += 'NFA Compensation should have less than 100 words. '
      setNfaCompensationFieldClass(inputErrClass)
      pass = false
    }
    if (pass) {
      setSubmissionError('')
    } else {
      setSubmissionError(errMsg.trimEnd())
    }
    return pass
  };

  const LogoField = () => (
    <input type="file" accept="image/*" onChange={handleLogoUpload} />
  );

  const VideoField = () => (
    <input type="file" accept="video/*" onChange={handleUpload} />
  );

  const [inclusionCriteriaFieldClass, setInclusionCriteriaFieldClass] = useState(textareaClass);

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
        className={inclusionCriteriaFieldClass}
      />
    );
  };

  const [exclusionCriteriaFieldClass, setExclusionCriteriaFieldClass] = useState(textareaClass);

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
        className={exclusionCriteriaFieldClass}
      />
    );
  };

  const CriteriaFieldValidation = () => {
    let pass = true
    let errMsg = ''
    setInclusionCriteriaFieldClass(textareaClass)
    setExclusionCriteriaFieldClass(textareaClass)
    if (formData.inclusionCriteria === '' && formData.exclusionCriteria === ''){
      errMsg += "Participant Inclusion and Exclusion Criteria cannot be both empty. "
      setInclusionCriteriaFieldClass(textareaErrClass)
      setExclusionCriteriaFieldClass(textareaErrClass)
      pass = false
    }
    if (countWords(formData.inclusionCriteria) > 1000){
      errMsg += 'Participant Inclusion Criteria should have less than 1000 words. '
      setInclusionCriteriaFieldClass(textareaErrClass)
      pass = false
    }
    if (countWords(formData.exclusionCriteria) > 1000){
      errMsg += 'Participant Exclusion Criteria should have less than 1000 words. '
      setExclusionCriteriaFieldClass(textareaErrClass)
      pass = false
    }
    if (pass) {
      setSubmissionError('')
    } else {
      setSubmissionError(errMsg.trimEnd())
    }
    return pass
  };

  const [contactNameFieldClass, setContactNameFieldClass] = useState(textareaClass);

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
        className={contactNameFieldClass}
      />
    );
  };

  const [contactEmailFieldClass, setContactEmailFieldClass] = useState(inputClass);

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
        className={contactEmailFieldClass}
      />
    );
  };

  const ContactFieldValidation = () => {
    let pass = true
    let errMsg = ''
    setContactNameFieldClass(textareaClass)
    setContactEmailFieldClass(inputClass)
    if (formData.contactName === ''){
      errMsg += "Contact Name cannot be empty. "
      setContactNameFieldClass(textareaErrClass)
      pass = false
    }
    if (countWords(formData.contactName) > 100){
      errMsg += 'Contact Name should have less than 100 words. '
      setContactNameFieldClass(textareaErrClass)
      pass = false
    }
    if (formData.contactEmail === ''){
      errMsg += "Contact Email cannot be empty. "
      setContactEmailFieldClass(inputErrClass)
      pass = false
    }
    if (countWords(formData.contactEmail) > 1000){
      errMsg += 'Contact Email should have less than 1000 words. '
      setContactEmailFieldClass(inputErrClass)
      pass = false
    }
    if (pass) {
      setSubmissionError('')
    } else {
      setSubmissionError(errMsg.trimEnd())
    }
    return pass
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

  const [recruitEndDateFieldClass, setRecruitEndDateFieldClass] = useState(dateInputClass);

  // PARTICIPANT RECRUITMENT END DATE
  const RecruitEndDateField = () => {
    const [localValue, setLocalValue] = useState(formData.recruitEndDate);

    const handleChange = (e) => {
      setLocalValue(e.target.value);
    };

    const handleBlur = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        recruitEndDate: localValue,
      }));
      setProposedStartAndEndDates({
        ...proposedStartAndEndDates,
        endDate: localValue,
      });
    };

    return (
      <input
        type="date"
        name="recruitEndDate"
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className={recruitEndDateFieldClass}
        min={formData.startDate}
        required
      />
    );
  };

  const [startDateFieldClass, setStartDateFieldClass] = useState(dateInputClass);

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
        className={startDateFieldClass}
        required
      />
    );
  };

  const [endDateFieldClass, setEndDateFieldClass] = useState(dateInputClass);

  // OVERALL RESEARCH END DATE
  const EndDateField = () => {
    const [localValue, setLocalValue] = useState(formData.studyEndDate);

    const handleChange = (e) => {
      setLocalValue(e.target.value);
    };

    const handleBlur = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        studyEndDate: localValue,
      }));
    };

    return (
      <input
        type="date"
        name="studyEndDate"
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className={endDateFieldClass}
        min={formData.recruitEndDate}
      />
    );
  };

  const DateFieldValidation = () => {
    let pass = true
    let errMsg = ''
    setStartDateFieldClass(dateInputClass)
    setRecruitEndDateFieldClass(dateInputClass)
    setEndDateFieldClass(dateInputClass)
    if (formData.startDate === ''){
      errMsg += "Recruitment Start Date cannot be empty. "
      setStartDateFieldClass(dateInputErrClass)
      pass = false
    }
    if (formData.recruitEndDate === ''){
      errMsg += "Recruitment End Date cannot be empty. "
      setRecruitEndDateFieldClass(dateInputErrClass)
      pass = false
    }
    if (new Date(formData.startDate) > new Date(formData.recruitEndDate)) {
      errMsg += "Recruitment End Date must be after Recruitment Start Date. "
      setStartDateFieldClass(dateInputErrClass)
      setRecruitEndDateFieldClass(dateInputErrClass)
      pass = false
    }
    if (formData.studyEndDate !== '' && new Date(formData.recruitEndDate) > new Date(formData.studyEndDate)) {
      errMsg += "Estimated Study End Date must be after Recruitment End Date. "
      setRecruitEndDateFieldClass(dateInputErrClass)
      setEndDateFieldClass(dateInputErrClass)
      pass = false
    }

    if (pass) {
      setSubmissionError('')
    } else {
      setSubmissionError(errMsg.trimEnd())
    }
    return pass
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // submission is in progress
    setSubmissionError(""); // Reset any previous error messages
    setSubmissionSuccess(false); // Reset the success status

    try {
      await addDoc(collection(db, "researchStudies"), {
        ...formData,
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
      validation: BasicInfoFieldValidation
    },
    {
      id: 2,
      title: "Area of Study",
      description: "Research Description, Topics, and Research Type",
      validation: DescriptionFieldValidation
    },
    {
      id: 3,
      title: "Participant Experience",
      description: "Timeline, Meetings, Procedures, and Participant Experience",
      validation: ProcedureFieldValidation
    },
    {
      id: 4,
      title: "Location",
      description: "Location of the Study",
      validation: LocationFieldValidation
    },
    {
      id: 5,
      title: "Compensation",
      description: "Participant and NFA Compensation Details",
      validation: CompensationFieldValidation
    },
    {
      id: 6,
      title: "Criteria",
      description: "Participant Inclusion and Exclusion Criteria",
      validation: CriteriaFieldValidation
    },
    {
      id: 7,
      title: "Contact Info",
      description: "Contact Name, Email, and Phone",
      validation: ContactFieldValidation
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
      validation: DateFieldValidation
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
            <DescriptionField />
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
            <ProcedureField />
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
            <RecruitEndDateField />
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
          </div>
        )}
        {isSubmitting && <p>Submitting form...</p>}
        {submissionError && (
          <p className="text-red-500">{submissionError}</p>
        )}
        {submissionSuccess && (
          <p className="text-green-500">Form submitted successfully!</p>
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
            <button onClick={(e) => {
              if (DateFieldValidation()) {
                handleSubmit(e)
              }
            }} className={buttonClass}>
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResearchPostRequestForm;
