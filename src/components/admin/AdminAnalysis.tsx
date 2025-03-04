import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";

interface ThresholdConfig {
  name: string;
  value: number;
  expanded: boolean;
  periodic: boolean;
  areaBased: boolean;
  singleOutlier: boolean;
  exceptions: string;
  fileName: string | null;
  dataField: string;
}

const AdminAnalysis = () => {
  const [thresholds, setThresholds] = useState<ThresholdConfig[]>([
    {
      name: "Expected vs. Actual Deficit Threshold",
      value: 10, // Represents percentage difference
      expanded: false,
      periodic: false,
      areaBased: true,
      singleOutlier: false,
      exceptions: "",
      fileName: null,
      dataField: "",
    },
    {
      name: "Daily Gas Usage Anomaly",
      value: 5, // Represents percentage deviation
      expanded: false,
      periodic: true,
      areaBased: false,
      singleOutlier: true,
      exceptions: "Allow minor deviations during maintenance periods.",
      fileName: null,
      dataField: "",
    },
  ]);

  const toggleExpand = (index: number) => {
    setThresholds((prev) =>
      prev.map((t, i) => (i === index ? { ...t, expanded: !t.expanded } : t)),
    );
  };

  const addThreshold = () => {
    setThresholds((prev) => [
      ...prev,
      {
        name: `Threshold ${prev.length + 1}`,
        value: 10,
        expanded: false,
        periodic: false,
        areaBased: false,
        singleOutlier: false,
        exceptions: "",
        fileName: null,
        dataField: "",
      },
    ]);
  };

  const removeThreshold = (index: number) => {
    setThresholds((prev) => prev.filter((_, i) => i !== index));
  };

  const updateThresholdField = <K extends keyof ThresholdConfig>(
    index: number,
    field: K,
    value: ThresholdConfig[K],
  ) => {
    setThresholds((prev) =>
      prev.map((t, i) => (i === index ? { ...t, [field]: value } : t)),
    );
  };

  const toggleFlag = (index: number, field: keyof ThresholdConfig) => {
    setThresholds((prev) =>
      prev.map((t, i) => (i === index ? { ...t, [field]: !t[field] } : t)),
    );
  };

  const handleFileUpload = (index: number, file: File) => {
    updateThresholdField(index, "fileName", file.name);
    // You can process the file further (e.g., parsing Excel) here if needed.
  };

  return (
    <div className="p-2 bg-gray-50">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text font-semibold">
          Gas Consumption Analysis Thresholds
        </h2>
        <button
          onClick={addThreshold}
          className="flex items-center text-sm text-gray-500 hover:text-[#00847c] space-x-1"
        >
          <FiPlus />
          <span>Add Threshold</span>
        </button>
      </div>

      <div className="space-y-2">
        {thresholds.map((threshold, index) => (
          <div
            key={index}
            className="p-2 rounded-lg border border-gray-300 shadow-sm bg-white"
          >
            {/* Collapsible header row */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{threshold.name}</p>
                <p className="text-xs text-gray-600">
                  Value: {threshold.value}% deviation allowed
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleExpand(index)}
                  className="text-sm text-gray-500 hover:text-[#00847c]"
                >
                  {threshold.expanded ? "Collapse" : "Expand"}
                </button>
                <button
                  onClick={() => removeThreshold(index)}
                  className="text-gray-500 hover:text-red-500 transition-colors duration-300"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Collapsible content */}
            {threshold.expanded && (
              <div className="mt-2 border-t pt-2 space-y-2">
                {/* Threshold Name */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Threshold Name
                  </label>
                  <input
                    type="text"
                    value={threshold.name}
                    onChange={(e) =>
                      updateThresholdField(index, "name", e.target.value)
                    }
                    className="w-full text-sm px-2 py-1 border rounded"
                  />
                </div>

                {/* Threshold Value */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Threshold Value (% deviation allowed)
                  </label>
                  <input
                    type="number"
                    value={threshold.value}
                    onChange={(e) =>
                      updateThresholdField(
                        index,
                        "value",
                        Number(e.target.value),
                      )
                    }
                    className="w-full text-sm px-2 py-1 border rounded"
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Upload Excel File (Gas Consumption Data)
                  </label>
                  <input
                    type="file"
                    accept=".xls,.xlsx"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(index, e.target.files[0]);
                      }
                    }}
                    className="block w-full text-sm px-2 py-1 border rounded"
                  />
                  {threshold.fileName && (
                    <p className="text-xs text-gray-600 mt-1">
                      Uploaded File: {threshold.fileName}
                    </p>
                  )}
                </div>

                {/* Data Field */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Specify Data Field (e.g., Expected Usage, Actual Usage)
                  </label>
                  <input
                    type="text"
                    value={threshold.dataField}
                    onChange={(e) =>
                      updateThresholdField(index, "dataField", e.target.value)
                    }
                    className="w-full text-sm px-2 py-1 border rounded"
                    placeholder="e.g., Expected Usage, Actual Usage"
                  />
                </div>

                {/* Flags */}
                <div className="flex items-center space-x-4">
                  {/* Periodic */}
                  <div
                    className={`relative w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${
                      threshold.periodic ? "bg-[#00847c]" : "bg-gray-300"
                    }`}
                    onClick={() => toggleFlag(index, "periodic")}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                        threshold.periodic ? "translate-x-4" : "translate-x-0"
                      }`}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-700">Periodic</span>

                  {/* Area-based */}
                  <div
                    className={`relative w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${
                      threshold.areaBased ? "bg-[#00847c]" : "bg-gray-300"
                    }`}
                    onClick={() => toggleFlag(index, "areaBased")}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                        threshold.areaBased ? "translate-x-4" : "translate-x-0"
                      }`}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-700">Area-based</span>

                  {/* Single Outlier */}
                  <div
                    className={`relative w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${
                      threshold.singleOutlier ? "bg-[#00847c]" : "bg-gray-300"
                    }`}
                    onClick={() => toggleFlag(index, "singleOutlier")}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                        threshold.singleOutlier
                          ? "translate-x-4"
                          : "translate-x-0"
                      }`}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-700">Single Outlier</span>
                </div>

                {/* Exceptions Text */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Exceptions / Notes
                  </label>
                  <textarea
                    value={threshold.exceptions}
                    onChange={(e) =>
                      updateThresholdField(index, "exceptions", e.target.value)
                    }
                    className="w-full text-sm px-2 py-1 border rounded"
                    rows={3}
                    placeholder="e.g., Allow deviations during maintenance periods."
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 text-gray-500 text-xs">
        Configure thresholds to analyze gas consumption anomalies based on
        expected vs. actual usage.
      </div>

      <button className="mt-4 px-4 py-2 bg-[#00847c] text-white text-sm rounded">
        Save
      </button>
    </div>
  );
};

export default AdminAnalysis;
