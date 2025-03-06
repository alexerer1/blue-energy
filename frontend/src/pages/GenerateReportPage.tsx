import React, { useRef, useState } from "react";
import { FiUpload, FiSettings, FiFileText } from "react-icons/fi";
import { FiClipboard, FiCheckCircle, FiFilePlus, FiHome } from "react-icons/fi";
import FileTile from "../components/primitives/FileTile";
import ProgressStep from "../components/ProgressStep";
import { motion } from "framer-motion";
import ProgressLine from "../components/primitives/ProgressLine";

const GenerateReportPage: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(1); // Progress indicator
  const fileInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    { label: "Prospect", icon: <FiClipboard size={24} /> },
    { label: "Tour", icon: <FiFileText size={24} /> },
    { label: "Offer", icon: <FiCheckCircle size={24} /> },
    { label: "Contract", icon: <FiFilePlus size={24} /> },
    { label: "Settled", icon: <FiHome size={24} /> },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleGenerateReport = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep((prev) => (prev < steps.length ? prev + 1 : prev));
    }, 3000);
  };

  return (
    <div className="flex flex-col p-8 h-screen space-y-8">
      {/* File Upload Section */}
      <div className="flex gap-4 h-[40%]">
        <div
          className="w-1/2 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg cursor-pointer hover:border-[#02525e] transition-all duration-300"
          onClick={() => fileInputRef.current?.click()}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center text-gray-500"
          >
            <FiUpload size={50} className="mx-auto mb-4 text-[#00847c]" />
            <p className="text-lg font-semibold">Drag files here to upload</p>
            <p className="text-sm text-gray-400">or click to select files</p>
          </motion.div>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileUpload} // Add file upload handler
          />
        </div>

        {/* File List */}
        <div className="w-1/2 border rounded-lg p-4 bg-gray-50 overflow-y-auto space-y-1">
          {files.length > 0 ? (
            files.map((file) => (
              <FileTile
                key={file.name}
                file={file}
                onRemove={() =>
                  setFiles((prevFiles) =>
                    prevFiles.filter((f) => f.name !== file.name),
                  )
                }
              />
            ))
          ) : (
            <p className="text-gray-400 text-center">No files uploaded yet.</p>
          )}
        </div>
      </div>

      {/* Generate Report Button */}
      <div className="flex justify-end">
        <motion.button
          onClick={handleGenerateReport}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#00847c] text-white px-6 py-2 flex items-center gap-2 rounded-lg shadow-md hover:bg-[#02525e] transition-all duration-300"
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 border-t-2 border-white border-solid rounded-full animate-spin"></div>
              Generating...
            </>
          ) : (
            <>
              <FiSettings size={20} />
              Generate Report
            </>
          )}
        </motion.button>
      </div>

      <div className="flex flex-col items-center w-full pt-8 border-t">
        <h2 className="text-lg font-bold text-gray-700 mb-4">
          Report Progress
        </h2>

        {/* Progress Steps Container */}
        <div className="relative flex justify-between items-center w-[80%] mx-auto">
          {/* Progress Line */}
          <ProgressLine currentStep={currentStep} totalSteps={steps.length} />

          {/* Steps */}
          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex-shrink-0">
              <ProgressStep
                label={step.label}
                icon={step.icon}
                isComplete={index < currentStep}
                isInProgress={index === currentStep}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenerateReportPage;
