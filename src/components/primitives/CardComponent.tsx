import React, { FC } from "react";
import { AiOutlineWarning, AiOutlineLineChart } from "react-icons/ai";
import { HiOutlineAdjustments } from "react-icons/hi"; // Outlier icon

interface CardComponentProps {
  title: string;
  description: string;
  status: "success" | "warning" | "danger";
}

const CardComponent: FC<CardComponentProps> = ({
  title,
  description,
  status,
}) => {
  // Dynamically determine the icon based on the title
  const getIconByTitle = () => {
    if (title.toLowerCase().includes("outlier")) {
      return HiOutlineAdjustments; // Outlier icon
    }
    if (title.toLowerCase().includes("threshold")) {
      return AiOutlineLineChart; // Threshold breached icon
    }
    return AiOutlineWarning; // Default icon for other cases
  };

  // Get the dynamic icon and color
  const Icon = getIconByTitle();
  const iconColor =
    status === "success"
      ? "text-green-500"
      : status === "warning"
        ? "text-yellow-500"
        : "text-red-500";

  return (
    <div className="bg-white shadow-md rounded-lg px-3 py-1 border border-gray-200 w-full h-full flex flex-col overflow-y-auto max-h-64">
      {/* Header Section */}
      <div>
        <h3 className="font-medium text-primary text-lg mb-2">{title}</h3>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex items-center">
        {/* Icon Section */}
        <div className="flex-shrink-0 flex items-center justify-start w-1/6 h-full">
          <Icon className={`text-4xl ${iconColor}`} />
        </div>

        {/* Text Section */}
        <div className="w-5/6 text-sm text-primary leading-5">
          {description}
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
