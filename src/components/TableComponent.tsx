import React, { FC } from "react";
import { mockData } from "../data/mockData";

interface TableProps {
  showHours: boolean;
  showGraph: boolean;
  toggleView: () => void;
  toggleGraphView: () => void;
  hoveredColumn: number | null;
  setHoveredColumn: React.Dispatch<React.SetStateAction<number | null>>;
}

const TableComponent: FC<TableProps> = ({
  showHours,
  hoveredColumn,
  setHoveredColumn,
}) => {
  const headers = mockData.datasets.map((dataset) => dataset.label);

  return (
    <div>
      {/* Table */}
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left font-semibold text-primary">
              Month
            </th>
            {headers.map((header, idx) => (
              <th
                key={idx}
                className={`px-4 py-2 text-left font-semibold text-primary ${
                  hoveredColumn === idx ? "bg-[#00837c] text-secondary" : ""
                }`}
                onMouseEnter={() => {
                  console.log("Hovered Column:", idx);
                  setHoveredColumn(idx);
                }}
                onMouseLeave={() => setHoveredColumn(null)}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {mockData.labels.map((label, rowIndex) => (
            <tr key={rowIndex}>
              <td className="px-4 py-2 whitespace-nowrap text-primary">
                {label}
              </td>
              {mockData.datasets.map((dataset, colIndex) => (
                <td
                  key={colIndex}
                  className={`px-4 py-2 whitespace-nowrap text-primary ${
                    hoveredColumn === colIndex
                      ? "bg-[#699e9f] text-secondary font-semibold"
                      : ""
                  }`}
                  onMouseEnter={() => {
                    console.log("Hovered Column:", colIndex);
                    setHoveredColumn(colIndex);
                  }}
                  onMouseLeave={() => setHoveredColumn(null)}
                >
                  {showHours
                    ? dataset.hours[rowIndex]
                    : dataset.deviation[rowIndex] + "%"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
