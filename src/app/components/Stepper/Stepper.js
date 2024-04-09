import { FaCheck } from "react-icons/fa";
import * as React from "react";

const CustomStepper = ({ steps, currentStep }) => {
  const totalSteps = steps.length;
  const completedSteps = steps.filter((step) => step.id <= currentStep).length;
  const progress = (completedSteps / totalSteps) * 100;

  return (
    <div className="flex flex-col p-10">
      <div className="flex items-center space-x-4 overflow-x-scroll ">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center space-y-2 text-center">
              {step.id < currentStep ? (
                <FaCheck className="text-green-500 w-6 h-6" />
              ) : (
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center
              ${
                step.id === currentStep
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-500"
              }
              
              `}
                >
                  {step.id}
                </div>
              )}
              <div
                className={`${
                  step.id === currentStep ? "text-black" : "text-gray-500"
                } font-semibold text-sm`}
              >
                {step.title}
              </div>
              <div
                className={`${
                  step.id === currentStep ? "text-black" : "text-gray-500"
                } text-xs`}
              >
                {step.description}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="w-full bg-gray-200 rounded-lg my-3">
        <div
          className="h-2 bg-primary rounded-lg"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-md flex text-gray-500">
        Steps Completed: {completedSteps}/10
      </p>
    </div>
  );
};

export default CustomStepper;
