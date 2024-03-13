import React, { useState } from 'react';

const ResearchPostRequestForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    irbNumber: '',
    principalInvestigator: '',
    title: '',
    researchTopics: '',
    descriptionAndPurpose: '',
    participantExperience: '',
    location: '',
    compensation: '',
    nfaCompensation: '',
    logo: null,
    video: null,
    inclusionCriteria: '',
    exclusionCriteria: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    contactWebsite: '',
    additionalLinks: '',
    relatedResearch: '',
    postExpirationDate: '',
  });

  const handleInputChange = (e) => {
    const { name, type } = e.target;
    const value = type === 'checkbox' ? e.target.checked : e.target.value;
    if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
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

  const inputClass = 'border rounded w-full py-2 px-3 text-black mb-4';
  const textareaClass = 'border rounded w-full py-2 px-3 text-black mb-4';
  const fileInputClass = 'form-input w-full text-black';
  const dateInputClass = 'form-input w-full text-black';
  const formContainerClass = 'flex justify-center items-center min-h-screen';
  const formSectionClass = 'bg-white p-6 rounded shadow-md w-full max-w-md mx-auto mb-4';
  const buttonClass = 'bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';
  const navigationContainerClass = 'flex justify-between';
  const totalSteps = 10;
  
  const TextAreaField = ({ name, placeholder, value, onChange }) => (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={textareaClass}
    />
  );

  const FileField = ({ name, onChange }) => (
    <input
      type="file"
      name={name}
      onChange={onChange}
      className={fileInputClass}
    />
  );
  
  const DateField = ({ name, value, onChange }) => (
    <input
      type="date"
      name={name}
      value={value}
      onChange={onChange}
      className={dateInputClass}
    />
  );  

  const IrbNumberField = () => (
    <input
      type="text"
      name="irbNumber"
      value={formData.irbNumber}
      onChange={handleInputChange}
      placeholder="IRB or Research Number (Optional)"
      className={inputClass}
    />
  );
  

  const TitleField = () => (
    <input
      type="text"
      name="title"
      value={formData.title}
      onChange={handleInputChange}
      placeholder="Title"
      className={inputClass}
    />
  );


  const PrincipalInvestigatorField = () => (
    <input
      type="text"
      name="principalInvestigator"
      value={formData.principalInvestigator}
      onChange={handleInputChange}
      placeholder="Principal Investigator Name"
      className={inputClass}
    />
  );
  
  const ResearchTopicsField = () => (
    <TextAreaField
      name="researchTopics"
      placeholder="Research Topics or Conditions"
      value={formData.researchTopics}
      onChange={handleInputChange}
      className={textareaClass}
    />
  );
  
  const DescriptionAndPurposeField = () => (
    <TextAreaField
      name="descriptionAndPurpose"
      placeholder="Description & Purpose of the Study"
      value={formData.descriptionAndPurpose}
      onChange={handleInputChange}
      className={textareaClass}
    />
  );
  
  const ParticipantExperienceField = () => (
    <TextAreaField
      name="participantExperience"
      placeholder="Participant Experience Details"
      value={formData.participantExperience}
      onChange={handleInputChange}
      className={textareaClass}
    />
  );
  
  const LocationField = () => (
    <TextAreaField
      name="location"
      placeholder="Study Location (Virtual, In-Person, Hybrid?)"
      value={formData.location}
      onChange={handleInputChange}
      className={textareaClass}
    />
  );
  

  const CompensationField = () => (
    <input
      type="text"
      name="compensation"
      value={formData.compensation}
      onChange={handleInputChange}
      placeholder="Will participants be compensated?"
      className={inputClass}
    />
  );
  
  const NfaCompensationField = () => (
    <input
      type="text"
      name="nfaCompensation"
      value={formData.nfaCompensation}
      onChange={handleInputChange}
      placeholder="Will NFA be compensated?"
      className={inputClass}
    />
  );
  
  const LogoField = () => (
    <FileField
      name="logo"
      onChange={handleInputChange}
      className={fileInputClass}
    />
  );
  
  const VideoField = () => (
    <FileField
      name="video"
      onChange={handleInputChange}
      className={fileInputClass}
    />
  );
  
  const InclusionCriteriaField = () => (
    <TextAreaField
      name="inclusionCriteria"
      placeholder="Participant Inclusion Criteria"
      value={formData.inclusionCriteria}
      onChange={handleInputChange}
      className={textareaClass}
    />
  );
  
  const ExclusionCriteriaField = () => (
    <TextAreaField
      name="exclusionCriteria"
      placeholder="Participant Exclusion Criteria"
      value={formData.exclusionCriteria}
      onChange={handleInputChange}
      className={textareaClass}
    />
  );
  
  const ContactNameField = () => (
    <TextAreaField
      name="contactName"
      placeholder="Contact Name"
      value={formData.contactName}
      onChange={handleInputChange}
      className={textareaClass}
    />
  );
  
  const ContactEmailField = () => (
    <TextAreaField
      name="contactEmail"
      placeholder="Contact Email"
      value={formData.contactEmail}
      onChange={handleInputChange}
      className={textareaClass}
    />
  );
  
  const ContactPhoneField = () => (
    <TextAreaField
      name="contactPhone"
      placeholder="Contact Phone (optional)"
      value={formData.contactPhone}
      onChange={handleInputChange}
      className={textareaClass}
    />
  );
  
  const ContactWebsiteField = () => (
    <TextAreaField
      name="contactWebsite"
      placeholder="Contact Website (optional)"
      value={formData.contactWebsite}
      onChange={handleInputChange}
      className={textareaClass}
    />
  );
  
  const AdditionalLinksField = () => (
    <TextAreaField
      name="additionalLinks"
      placeholder="Additional Links, such as surveys (optional)"
      value={formData.additionalLinks}
      onChange={handleInputChange}
      className={textareaClass}
    />
  );
  
  const RelatedResearchField = () => (
    <TextAreaField
      name="relatedResearch"
      placeholder="Links to Related Research (optional)"
      value={formData.relatedResearch}
      onChange={handleInputChange}
      className={textareaClass}
    />
  );


  const PostExpirationDateField = () => (
    <DateField
      name="postExpirationDate"
      value={formData.postExpirationDate}
      onChange={handleInputChange}
      className={dateInputClass}
    />
  );

  const StartDateField = () => (
    <DateField
      name="startDate"
      value={formData.startDate}
      onChange={handleInputChange}
      className={dateInputClass}
    />
  );

  const EndDateField = () => (
    <DateField
      name="endDate"
      value={formData.endDate}
      onChange={handleInputChange}
      className={dateInputClass}
    />
  );

  const handleSubmit = (e) => {
  e.preventDefault();
  // Send Form Data to Firebase 
  console.log(formData);
  // display a success message and redirect to dashboard
};

  return (
    <div className={formContainerClass}>
      <div className={formSectionClass}>
        {currentStep === 1 && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-black text-center">Step 1: Basic Information</h2>
            <p className="text-sm mb-4 text-black font-bold">Please complete the fields below.</p>
            <TitleField />
            <IrbNumberField />
            <PrincipalInvestigatorField />
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-black text-center">Step 2: Area of Study</h2>
            <p className="text-sm mb-4 text-black font-bold">List any topics or conditions being studied. Aftewards, write a paragraph explaining your research goals in common terms.</p>
            <ResearchTopicsField />
            <DescriptionAndPurposeField />
          </div>
        )}
        {currentStep === 3 && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-black text-center">Step 3: Participant Experience</h2>
            <p className="text-sm mb-4 text-black font-bold">Please provide details on timeline, required meetings, duration of meetings, required procedures, and any other essential participant experiences.</p>
            <ParticipantExperienceField />
          </div>
        )}
        {currentStep === 4 && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-black text-center">Step 4: Location</h2>
            <p className="text-sm mb-4 text-black font-bold">Please provide details on the location of the study. If the study is in-person list a city and state.</p>
            <LocationField />
          </div>
        )}
        {currentStep === 5 && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-black text-center">Step 5: Compensation</h2>
            <p className="text-sm mb-4 text-black font-bold">Please provide any compenstation details below. If yes, please list an amount.</p>
        
            <NfaCompensationField />
            <CompensationField />
          </div>
        )}
        {currentStep === 6 && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-black text-center">Step 6: Participant Prefrences</h2>
            <p className="text-sm mb-4 text-black font-bold">Please provide the basic requirements of the research.</p>
            <InclusionCriteriaField />
            <ExclusionCriteriaField />
          </div>
        )}
        {currentStep === 7 && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-black text-center">Step 7: Contact Info</h2>
            <p className="text-sm mb-4 text-black font-bold">Please provide a contact for the study.</p>
            <ContactNameField />
            <ContactEmailField />
            <ContactPhoneField />
          </div>
        )}
        {currentStep === 8 && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-black text-center">Step 8: External Links</h2>
            <p className="text-sm mb-4 text-black font-bold">Please provide any additonal information below.</p>
            <ContactWebsiteField />
            <AdditionalLinksField />
            <RelatedResearchField />
          </div>
        )}
        {currentStep === 9 && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-black text-center">Step 9: Media </h2>
            <LogoField />
            <p className="text-sm mb-4 text-black">Please upload a logo for you organization.</p>
            <VideoField />
            <p className="text-sm mb-4 text-black">Optionally, you can also provide a video summary explaining your study. Max 5min</p>
            
          </div>
        )}
        {currentStep === 10 && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-black text-center">Step 10: Timeline</h2>
            <p className="text-sm mb-4 text-black font-bold">Please give your best estimate for the dates below.</p> 
            <PostExpirationDateField />
            <p className="text-sm mb-4 text-black">What day will recruitment close for this study?</p>
            <StartDateField />
            <p className="text-sm mb-4 text-black">What day will this study begin?</p>
            <EndDateField />
            <p className="text-sm mb-4 text-black">Please list an estimate of when you will have results.</p>
          </div>
        )}
  
        <div className={navigationContainerClass}>
          {currentStep > 1 && (
            <button onClick={prevStep} className={buttonClass}>
              Previous
            </button>
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