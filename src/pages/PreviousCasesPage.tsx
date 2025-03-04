import React from "react";
import CaseTile from "../components/CaseTile";
import { mockData } from "../data/mockData";

// Helper to generate mock stats
const generateMockStats = () => ({
  efficiency: Math.floor(Math.random() * 10) + 90,
  savings: Math.floor(Math.random() * 300) + 1000,
});

const PreviousCasesPage: React.FC = () => {
  const { labels, datasets } = mockData;

  const deviations = datasets[0].deviation;
  const hours = datasets[0].hours;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Previous Cases</h1>
      <div className="flex flex-col gap-4">
        {labels.map((month, index) => {
          const { efficiency, savings } = generateMockStats();
          const id = `case-${index + 1}`; // Generate unique ID for each case
          return (
            <CaseTile
              key={id}
              id={id}
              month={month}
              deviation={deviations[index]}
              hours={hours[index]}
              efficiency={efficiency}
              savings={savings}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PreviousCasesPage;
