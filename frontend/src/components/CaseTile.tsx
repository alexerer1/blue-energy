import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiChevronDown,
  FiAlertTriangle,
  FiClock,
  FiMessageSquare,
} from "react-icons/fi";
import { Transition } from "@headlessui/react";

interface CaseTileProps {
  id: string; // Unique case ID
  month: string;
  deviation: number; // Gas deviation percentage
  hours: number; // Operational hours
  efficiency?: number; // Mock: operational efficiency %
  savings?: number; // Mock: gas savings in units
}

const CaseTile: React.FC<CaseTileProps> = ({
  id,
  month,
  deviation,
  hours,
  efficiency = 92,
  savings = 1200,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleOpen = () => setIsOpen(!isOpen);
  const goToChat = () => navigate(`/chat/${id}`); // Use ID instead of month

  const isWarning = deviation > 5;

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 flex flex-col gap-2 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-primary font-semibold text-lg">{month}</div>
          <div className="text-primary text-sm flex items-center gap-1">
            <FiClock className="text-primary" />
            {hours} Hours
          </div>
          <div
            className={`text-sm font-medium ${
              isWarning ? "text-red-600" : "text-[#00847c]"
            }`}
          >
            Deviation: <strong>{deviation.toFixed(2)}%</strong>
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-3">
          {/* Chat Icon */}
          <button
            onClick={goToChat}
            className="text-[#00847c] hover:text-[#02525e] transition-all"
            title="Chat about this case"
          >
            <FiMessageSquare size={24} />
          </button>

          {/* Expand Button */}
          <button
            onClick={toggleOpen}
            className="text-primary hover:text-primary"
          >
            <FiChevronDown
              size={28}
              className={`transform transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Warning */}
      {isWarning && (
        <div className="flex items-center text-yellow-600 gap-1 mt-2">
          <FiAlertTriangle className="text-lg" />
          Warning: Deviation exceeds threshold!
        </div>
      )}

      {/* Expanded Content */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 transform -translate-y-2"
        enterTo="opacity-100 transform translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 transform translate-y-0"
        leaveTo="opacity-0 transform -translate-y-2"
      >
        <div className="mt-4 text-sm text-gray-700 border-t border-gray-200 pt-2">
          <p>
            <strong>Operational Efficiency:</strong> {efficiency}%
          </p>
          <p>
            <strong>Gas Savings:</strong> {savings} units
          </p>
          <p>
            In <strong>{month}</strong>, the deviation reached{" "}
            <strong>{deviation.toFixed(2)}%</strong> over{" "}
            <strong>{hours}</strong> hours of operation.
          </p>
        </div>
      </Transition>
    </div>
  );
};

export default CaseTile;
