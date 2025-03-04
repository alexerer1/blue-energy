import React, { FC, useState } from "react";
import { FiClock, FiPercent, FiMap, FiBarChart2 } from "react-icons/fi";

import TableComponent from "../components/TableComponent";
import ChartComponent from "../components/ChartComponent";
import MapComponent from "../components/MapComponent";
import CardsSection from "../components/CardsSection";
import SummarySection from "../components/primitives/SummarySection";
import { summaryContent, cardsData } from "../data/mockData";
import ChatPanel from "../components/chat/ChatPanel"; // Import your new ChatPanel component

const LandingPage: FC = () => {
  const [showHours, setShowHours] = useState(false);
  const [showGraph, setShowGraph] = useState(true);
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const toggleView = () => {
    setShowHours((prev) => !prev);
    setShowSummary(false);
  };

  const toggleGraphView = () => {
    setShowGraph((prev) => !prev);
    setShowSummary(false);
  };

  const toggleSummaryView = () => {
    setShowSummary((prev) => !prev);
  };

  const toggleChat = () => {
    setShowChat((prev) => !prev);
  };

  return (
    <main className="p-4 h-screen relative overflow-hidden ">
      {/* Three-column layout when chat is shown, two-column otherwise. 
          The ChatPanel transitions in width, so the parent is always display:flex. */}
      <div className="h-full flex flex-col md:flex-row gap-4">
        {/* Left Section (Cards + Graph/Map) */}
        <div
          className={`w-full md:${showChat ? "w-1/3" : "w-1/2"} flex flex-col gap-4 h-full transition-all duration-300 ease-in-out`}
        >
          <CardsSection cardsData={cardsData} />

          {/* Bottom Part - Graph/Map */}
          <div className="h-[80%] bg-white shadow-md rounded-lg p-4 border border-gray-200 relative">
            {/* Show Map/Show Graph Button */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: 10,
              }}
            >
              <button
                onClick={toggleGraphView}
                className="flex items-center space-x-1 px-2 py-1 border border-gray-300 rounded-full text-gray-600 hover:text-primary bg-gray-100 hover:bg-gray-200 transition-all duration-300 shadow-sm"
              >
                {showGraph ? (
                  <FiMap size={16} className="text-primary" />
                ) : (
                  <FiBarChart2 size={16} className="text-primary" />
                )}
                <span className="text-xs font-medium text-primary">
                  {showGraph ? "Show Map" : "Show Graph"}
                </span>
              </button>
            </div>

            <div className="w-full h-full">
              {showGraph ? (
                <>
                  <div className="w-full h-[46%] mb-10">
                    <ChartComponent
                      showLegend={true}
                      showHours={false}
                      hoveredColumn={hoveredColumn}
                    />
                  </div>
                  <div className="w-full h-[46%] mt-10">
                    <ChartComponent
                      showHours={true}
                      hoveredColumn={hoveredColumn}
                    />
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col pt-8">
                  <div className="flex-grow overflow-hidden">
                    <MapComponent hoveredColumn={hoveredColumn} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Middle Section (Table & Summary) */}
        <div
          className={`bg-white shadow-md rounded-lg border border-gray-200 flex flex-col transition-all duration-300 ease-in-out
          w-full md:${showChat ? "w-1/3" : "w-1/2"}`}
        >
          <div className="flex-1 overflow-auto p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-primary">
                {showSummary
                  ? "Summary"
                  : `Data Table - ${showHours ? "Hours" : "Deviation (%)"}`}
              </h2>

              <div className="flex gap-2">
                <button
                  onClick={toggleView}
                  className="flex items-center space-x-1 px-2 py-1 border border-gray-300 rounded-full text-gray-600 hover:text-primary bg-gray-100 hover:bg-gray-200 transition-all duration-300 shadow-sm"
                >
                  {showHours ? (
                    <FiClock size={16} className="text-primary" />
                  ) : (
                    <FiPercent size={16} className="text-primary" />
                  )}
                  <span className="text-xs font-medium text-primary">
                    {showHours ? "Show Deviation (%)" : "Show Hours"}
                  </span>
                </button>

                <button
                  onClick={toggleSummaryView}
                  className="flex items-center space-x-1 px-2 py-1 border border-gray-300 rounded-full text-gray-600 hover:text-primary bg-gray-100 hover:bg-gray-200 transition-all duration-300 shadow-sm"
                >
                  <FiBarChart2 size={16} className="text-primary" />
                  <span className="text-xs font-medium text-primary">
                    {showSummary ? "Show Table" : "Show Summary"}
                  </span>
                </button>
              </div>
            </div>

            {showSummary ? (
              <SummarySection content={summaryContent} />
            ) : (
              <TableComponent
                showHours={showHours}
                showGraph={showGraph}
                toggleView={toggleView}
                toggleGraphView={toggleGraphView}
                hoveredColumn={hoveredColumn}
                setHoveredColumn={setHoveredColumn}
              />
            )}
          </div>

          <div className="p-4 flex justify-end">
            <button
              onClick={toggleChat}
              className="bg-[#00847c] text-white px-4 py-2 rounded shadow hover:bg-[#02525e] transition duration-300"
            >
              Chat with report
            </button>
          </div>
        </div>

        {/* Chat Panel Section */}
        <ChatPanel showChat={showChat} toggleChat={toggleChat} />
      </div>
    </main>
  );
};

export default LandingPage;
