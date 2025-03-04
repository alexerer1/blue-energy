import React from "react";

interface ProgressLineProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressLine: React.FC<ProgressLineProps> = ({
  currentStep,
  totalSteps,
}) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="absolute top-[70%] left-0 w-full h-1 bg-gray-300 z-0">
      {/* Filled Portion */}
      <div
        className="h-full bg-[#00847c] transition-all duration-500"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressLine;
