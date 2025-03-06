import React, { useState } from "react";
import {
  FiPlus,
  FiChevronDown,
  FiChevronRight,
  FiTrash2,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";
import {
  AiOutlineBarChart,
  AiOutlineAreaChart,
  AiOutlinePieChart,
} from "react-icons/ai";

/**
 * Interfaces
 */
interface ReportFormatting {
  fontFamily: string;
  fontSize: number;
  lineSpacing: number;
  letterSpacing: number;
  margin: number;
}

interface AnalysisItem {
  id: number;
  title: string;
  description: string;
  included: boolean; // whether to include in final report
  order: number; // order in the report
  collapsed: boolean; // UI state for collapse/expand
}

interface GraphConfig {
  id: number;
  graphType: "area" | "bar" | "pie";
  title: string;
  descriptionMode: "static" | "llm";
  systemAgent: string; // only for LLM mode
  excelFile: File | null;
  excelRange: string;
  order: number;
  collapsed: boolean;
}

const AdminReport: React.FC = () => {
  /**
   * 1) Report Formatting Section
   */
  const [reportFormatting, setReportFormatting] = useState<ReportFormatting>({
    fontFamily: "Arial",
    fontSize: 12,
    lineSpacing: 1.5,
    letterSpacing: 0,
    margin: 20,
  });

  const handleReportFormattingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setReportFormatting((prev) => ({
      ...prev,
      [name]:
        name === "fontSize" ||
        name === "margin" ||
        name === "lineSpacing" ||
        name === "letterSpacing"
          ? parseFloat(value)
          : value,
    }));
  };

  /**
   * 2) Analysis Results Section
   *    These might come from your Analysis page; here we store them in state.
   */
  const [analysisItems, setAnalysisItems] = useState<AnalysisItem[]>([
    {
      id: 1,
      title: "Projected vs. Actual Gas Consumption",
      description:
        "This section highlights any deficits between the expected gas usage and the actual consumption in the Eastern region.",
      included: true,
      order: 1,
      collapsed: true,
    },
    {
      id: 2,
      title: "Possible Causes of Deficit",
      description:
        "A breakdown of external factors—weather anomalies, industrial outages, or measuring errors—that could cause lower consumption.",
      included: true,
      order: 2,
      collapsed: true,
    },
  ]);

  /**
   * Handlers for Analysis Items
   */
  // Expand/Collapse
  const toggleCollapseAnalysisItem = (id: number) => {
    setAnalysisItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, collapsed: !item.collapsed } : item,
      ),
    );
  };

  // Toggle "included" in final report
  const toggleIncludeAnalysisItem = (id: number) => {
    setAnalysisItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, included: !item.included } : item,
      ),
    );
  };

  // Add a new Analysis item
  const addAnalysisItem = () => {
    const newId = Date.now();
    setAnalysisItems((prev) => [
      ...prev,
      {
        id: newId,
        title: "New Analysis Point",
        description: "Describe the new point regarding gas usage deficits...",
        included: false,
        order: prev.length + 1,
        collapsed: false,
      },
    ]);
  };

  // Remove an Analysis item
  const removeAnalysisItem = (id: number) => {
    setAnalysisItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Move item up or down in order
  const moveAnalysisItem = (id: number, direction: "up" | "down") => {
    setAnalysisItems((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      if (index < 0) return prev;

      const newOrder = [...prev];
      if (direction === "up" && index > 0) {
        [newOrder[index], newOrder[index - 1]] = [
          newOrder[index - 1],
          newOrder[index],
        ];
      } else if (direction === "down" && index < prev.length - 1) {
        [newOrder[index], newOrder[index + 1]] = [
          newOrder[index + 1],
          newOrder[index],
        ];
      }
      return newOrder;
    });
  };

  // Update fields in Analysis item
  const updateAnalysisField = <T extends keyof AnalysisItem>(
    id: number,
    field: T,
    value: AnalysisItem[T],
  ) => {
    setAnalysisItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  /**
   * 3) Graph Configurations
   */
  const [graphs, setGraphs] = useState<GraphConfig[]>([
    {
      id: 101,
      graphType: "bar",
      title: "Gas Deficit by Region",
      descriptionMode: "static",
      systemAgent: "",
      excelFile: null,
      excelRange: "A1:B10",
      order: 1,
      collapsed: true,
    },
    {
      id: 102,
      graphType: "area",
      title: "Gas Consumption Trend (Last 12 Months)",
      descriptionMode: "llm",
      systemAgent:
        "You are an expert in energy data analysis. Summarize any outliers and potential reasons for deficits.",
      excelFile: null,
      excelRange: "C2:D20",
      order: 2,
      collapsed: true,
    },
  ]);

  /**
   * Handlers for Graph Config
   */
  // Expand/collapse a specific graph
  const toggleCollapseGraph = (id: number) => {
    setGraphs((prev) =>
      prev.map((graph) =>
        graph.id === id ? { ...graph, collapsed: !graph.collapsed } : graph,
      ),
    );
  };

  // Add a new Graph
  const addGraph = () => {
    const newId = Date.now();
    setGraphs((prev) => [
      ...prev,
      {
        id: newId,
        graphType: "bar",
        title: "New Gas Chart",
        descriptionMode: "static",
        systemAgent: "",
        excelFile: null,
        excelRange: "",
        order: prev.length + 1,
        collapsed: false, // open the new one by default
      },
    ]);
  };

  // File upload for graph
  const handleFileUpload = (id: number, file: File | null) => {
    setGraphs((prev) =>
      prev.map((graph) =>
        graph.id === id ? { ...graph, excelFile: file } : graph,
      ),
    );
  };

  // Update fields in a graph
  const updateGraphField = <T extends keyof GraphConfig>(
    id: number,
    field: T,
    value: GraphConfig[T],
  ) => {
    setGraphs((prev) =>
      prev.map((graph) =>
        graph.id === id ? { ...graph, [field]: value } : graph,
      ),
    );
  };

  // Toggle LLM mode using your custom toggle style
  const toggleLLM = (id: number) => {
    setGraphs((prev) =>
      prev.map((graph) => {
        if (graph.id !== id) return graph;
        return {
          ...graph,
          descriptionMode: graph.descriptionMode === "llm" ? "static" : "llm",
        };
      }),
    );
  };

  // Save an individual graph’s changes
  const saveGraphChanges = (id: number) => {
    const g = graphs.find((graph) => graph.id === id);
    if (g) {
      // Do something with the updated graph config (e.g., POST to API)
      console.log("Saving Graph Config:", g);
      alert(`Saved changes for graph: ${g.title}`);
    }
  };

  // Remove a Graph
  const removeGraph = (id: number) => {
    setGraphs((prev) => prev.filter((graph) => graph.id !== id));
  };

  // Move Graph up or down in order
  const moveGraph = (id: number, direction: "up" | "down") => {
    setGraphs((prev) => {
      const index = prev.findIndex((g) => g.id === id);
      if (index < 0) return prev;

      const newOrder = [...prev];
      if (direction === "up" && index > 0) {
        [newOrder[index], newOrder[index - 1]] = [
          newOrder[index - 1],
          newOrder[index],
        ];
      } else if (direction === "down" && index < prev.length - 1) {
        [newOrder[index], newOrder[index + 1]] = [
          newOrder[index + 1],
          newOrder[index],
        ];
      }
      return newOrder;
    });
  };

  /**
   * Save the entire report
   */
  const handleSaveReport = () => {
    console.log("Report Formatting:", reportFormatting);
    console.log("Analysis Items:", analysisItems);
    console.log("Graph Configs:", graphs);
    alert("Report configuration saved! Check console for details.");
  };

  /**
   * Render
   */
  return (
    <div className="p-4 bg-gray-50">
      {/** (A) Report Formatting Section */}
      <div className="mb-6 border border-gray-300 rounded bg-white shadow-sm p-3">
        <h2 className="text-lg font-semibold mb-3">Report Formatting</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          <div className="flex flex-col">
            <label className="text-xs text-gray-600" htmlFor="fontFamily">
              Font Family
            </label>
            <select
              id="fontFamily"
              name="fontFamily"
              className="px-2 py-1 border border-gray-300 rounded text-sm"
              value={reportFormatting.fontFamily}
              onChange={handleReportFormattingChange}
            >
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-600" htmlFor="fontSize">
              Font Size
            </label>
            <input
              id="fontSize"
              name="fontSize"
              type="number"
              min={8}
              max={72}
              className="px-2 py-1 border border-gray-300 rounded text-sm"
              value={reportFormatting.fontSize}
              onChange={handleReportFormattingChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-600" htmlFor="lineSpacing">
              Line Spacing
            </label>
            <input
              id="lineSpacing"
              name="lineSpacing"
              type="number"
              step={0.1}
              min={1}
              max={3}
              className="px-2 py-1 border border-gray-300 rounded text-sm"
              value={reportFormatting.lineSpacing}
              onChange={handleReportFormattingChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-600" htmlFor="letterSpacing">
              Letter Spacing
            </label>
            <input
              id="letterSpacing"
              name="letterSpacing"
              type="number"
              step={0.1}
              min={0}
              max={5}
              className="px-2 py-1 border border-gray-300 rounded text-sm"
              value={reportFormatting.letterSpacing}
              onChange={handleReportFormattingChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-600" htmlFor="margin">
              Page Margin (px)
            </label>
            <input
              id="margin"
              name="margin"
              type="number"
              min={0}
              className="px-2 py-1 border border-gray-300 rounded text-sm"
              value={reportFormatting.margin}
              onChange={handleReportFormattingChange}
            />
          </div>
        </div>
      </div>

      {/** (B) Analysis Results */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Analysis Items</h2>
          <button
            onClick={addAnalysisItem}
            className="flex items-center text-sm text-gray-500 hover:text-[#00847c] space-x-1"
          >
            <FiPlus />
            <span>Add Analysis Item</span>
          </button>
        </div>

        <div className="space-y-2">
          {analysisItems.map((item) => (
            <div
              key={item.id}
              className="border border-gray-300 rounded bg-white shadow-sm"
            >
              {/* Collapsed Header */}
              <div
                className="flex items-center justify-between p-2 cursor-pointer"
                onClick={() => toggleCollapseAnalysisItem(item.id)}
              >
                <div className="flex items-center space-x-2">
                  <div
                    className={`relative w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${
                      item.included ? "bg-[#00847c]" : "bg-gray-300"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent toggle collapse
                      toggleIncludeAnalysisItem(item.id);
                    }}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                        item.included ? "translate-x-4" : "translate-x-0"
                      }`}
                    ></div>
                  </div>
                  <span className="font-medium text-sm">
                    {item.title} (Order: {item.order})
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {item.collapsed ? (
                    <FiChevronRight className="text-gray-600" />
                  ) : (
                    <FiChevronDown className="text-gray-600" />
                  )}
                </div>
              </div>

              {/* Expanded Section */}
              {!item.collapsed && (
                <div className="p-3 border-t border-gray-200 space-y-4">
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-600 mb-1">Title</label>
                    <input
                      type="text"
                      className="text-sm px-2 py-1 border border-gray-300 rounded"
                      value={item.title}
                      onChange={(e) =>
                        updateAnalysisField(item.id, "title", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-600 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      className="text-sm px-2 py-1 border border-gray-300 rounded"
                      value={item.description}
                      onChange={(e) =>
                        updateAnalysisField(
                          item.id,
                          "description",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                  <div className="flex flex-col w-32">
                    <label className="text-xs text-gray-600 mb-1">Order</label>
                    <input
                      type="number"
                      min={1}
                      className="text-sm px-2 py-1 border border-gray-300 rounded"
                      value={item.order}
                      onChange={(e) =>
                        updateAnalysisField(
                          item.id,
                          "order",
                          parseInt(e.target.value) || 1,
                        )
                      }
                    />
                  </div>

                  {/* Move or Remove */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => moveAnalysisItem(item.id, "up")}
                      className="text-gray-600 hover:text-[#00847c] flex items-center"
                    >
                      <FiArrowUp />
                    </button>
                    <button
                      onClick={() => moveAnalysisItem(item.id, "down")}
                      className="text-gray-600 hover:text-[#00847c] flex items-center"
                    >
                      <FiArrowDown />
                    </button>
                    <button
                      onClick={() => removeAnalysisItem(item.id)}
                      className="text-red-500 hover:text-red-700 flex items-center"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/** (C) Graph Configurations */}
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Graph Configurations</h2>
        <button
          onClick={addGraph}
          className="flex items-center text-sm text-gray-500 hover:text-[#00847c] space-x-1"
        >
          <FiPlus />
          <span>Add Graph</span>
        </button>
      </div>

      <div className="space-y-2">
        {graphs.map((graph) => (
          <div
            key={graph.id}
            className="border border-gray-300 rounded bg-white shadow-sm"
          >
            {/* Collapsed Header */}
            <div
              className="flex items-center justify-between p-2 cursor-pointer"
              onClick={() => toggleCollapseGraph(graph.id)}
            >
              <div className="flex items-center space-x-2">
                {graph.graphType === "bar" && (
                  <AiOutlineBarChart className="text-gray-600" />
                )}
                {graph.graphType === "area" && (
                  <AiOutlineAreaChart className="text-gray-600" />
                )}
                {graph.graphType === "pie" && (
                  <AiOutlinePieChart className="text-gray-600" />
                )}

                <span className="font-medium text-sm">{graph.title}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-xs text-gray-500">
                  Order: {graph.order}
                </span>
                {graph.collapsed ? (
                  <FiChevronRight className="text-gray-600" />
                ) : (
                  <FiChevronDown className="text-gray-600" />
                )}
              </div>
            </div>

            {/* Expanded Section */}
            {!graph.collapsed && (
              <div className="p-3 border-t border-gray-200 space-y-4">
                {/* Graph Type */}
                <div className="flex flex-col w-40">
                  <label className="text-xs text-gray-600 mb-1">
                    Graph Type
                  </label>
                  <select
                    className="text-sm px-2 py-1 border border-gray-300 rounded"
                    value={graph.graphType}
                    onChange={(e) =>
                      updateGraphField(
                        graph.id,
                        "graphType",
                        e.target.value as GraphConfig["graphType"],
                      )
                    }
                  >
                    <option value="bar">Bar</option>
                    <option value="area">Area</option>
                    <option value="pie">Pie</option>
                  </select>
                </div>

                {/* Excel File */}
                <div className="flex flex-col">
                  <label className="text-xs text-gray-600 mb-1">
                    Excel File
                  </label>
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    className="text-sm"
                    onChange={(e) =>
                      handleFileUpload(graph.id, e.target.files?.[0] ?? null)
                    }
                  />
                  <label
                    className="text-xs text-gray-600 mt-2"
                    htmlFor={`excelRange-${graph.id}`}
                  >
                    Excel Data Range (e.g., A1:B10)
                  </label>
                  <input
                    id={`excelRange-${graph.id}`}
                    type="text"
                    className="text-sm px-2 py-1 border border-gray-300 rounded w-40 mt-1"
                    value={graph.excelRange}
                    onChange={(e) =>
                      updateGraphField(graph.id, "excelRange", e.target.value)
                    }
                  />
                </div>

                {/* Graph Title */}
                <div className="flex flex-col">
                  <label className="text-xs text-gray-600 mb-1">
                    Graph Title
                  </label>
                  <input
                    type="text"
                    className="text-sm px-2 py-1 border border-gray-300 rounded"
                    value={graph.title}
                    onChange={(e) =>
                      updateGraphField(graph.id, "title", e.target.value)
                    }
                  />
                </div>

                {/* Description Mode Toggle (Static vs. LLM) */}
                <div className="flex flex-col">
                  <label className="text-xs text-gray-600 mb-1">
                    Use LLM Description?
                  </label>
                  <div
                    className={`relative w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${
                      graph.descriptionMode === "llm"
                        ? "bg-[#00847c]"
                        : "bg-gray-300"
                    }`}
                    onClick={() => toggleLLM(graph.id)}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                        graph.descriptionMode === "llm"
                          ? "translate-x-4"
                          : "translate-x-0"
                      }`}
                    ></div>
                  </div>
                </div>

                {/* If LLM is chosen, show system agent field */}
                {graph.descriptionMode === "llm" && (
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-600 mb-1">
                      System Agent Prompt
                    </label>
                    <textarea
                      className="text-sm px-2 py-1 border border-gray-300 rounded"
                      rows={3}
                      value={graph.systemAgent}
                      onChange={(e) =>
                        updateGraphField(
                          graph.id,
                          "systemAgent",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                )}

                {/* Order */}
                <div className="flex flex-col w-32">
                  <label className="text-xs text-gray-600 mb-1">
                    Order in Report
                  </label>
                  <input
                    type="number"
                    className="text-sm px-2 py-1 border border-gray-300 rounded"
                    min={1}
                    value={graph.order}
                    onChange={(e) =>
                      updateGraphField(
                        graph.id,
                        "order",
                        parseInt(e.target.value) || 1,
                      )
                    }
                  />
                </div>

                {/* Move or Remove Graph */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => moveGraph(graph.id, "up")}
                    className="text-gray-600 hover:text-[#00847c] flex items-center"
                  >
                    <FiArrowUp />
                  </button>
                  <button
                    onClick={() => moveGraph(graph.id, "down")}
                    className="text-gray-600 hover:text-[#00847c] flex items-center"
                  >
                    <FiArrowDown />
                  </button>
                  <button
                    onClick={() => removeGraph(graph.id)}
                    className="text-red-500 hover:text-red-700 flex items-center"
                  >
                    <FiTrash2 />
                  </button>
                </div>

                {/* Save Button */}
                <button
                  onClick={() => saveGraphChanges(graph.id)}
                  className="mt-2 px-4 py-2 bg-[#00847c] text-white text-sm rounded"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/** (D) Save entire report */}
      <button
        onClick={handleSaveReport}
        className="mt-6 px-4 py-2 bg-[#00847c] text-white text-sm rounded"
      >
        Save Report Configuration
      </button>
    </div>
  );
};

export default AdminReport;
