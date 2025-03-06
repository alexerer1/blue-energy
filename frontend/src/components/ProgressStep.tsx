import React from "react";
import { FiCheck } from "react-icons/fi";

interface ProgressStepProps {
  label: string;
  icon: React.ReactNode;
  isComplete: boolean;
  isInProgress: boolean;
}

const ProgressStep: React.FC<ProgressStepProps> = ({
  label,
  icon,
  isComplete,
  isInProgress,
}) => {
  return (
    <div className="relative flex flex-col items-center">
      {/* Step Icon */}
      <div className="mb-2">{icon}</div>

      {/* Circle */}
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full border-2
        ${
          isComplete
            ? "border-[#00847c] bg-[#00847c] text-white"
            : isInProgress
              ? "border-[#00847c] text-[#00847c]"
              : "border-gray-300 text-gray-400 opacity-60"
        }`}
      >
        {isComplete ? (
          <FiCheck size={20} />
        ) : isInProgress ? (
          <div className="h-4 w-4 border-t-2 border-[#00847c] border-solid rounded-full animate-spin"></div>
        ) : (
          <span></span>
        )}
      </div>

      {/* Label */}
      <p className="absolute top-[100%] mt-2 text-sm text-primary whitespace-nowrap">
        {label}
      </p>
    </div>
  );
};

export default ProgressStep;
